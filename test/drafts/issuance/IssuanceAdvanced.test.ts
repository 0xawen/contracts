import { BigNumber } from 'bignumber.js';
import { should } from 'chai';
// tslint:disable-next-line:no-var-requires
const { advanceTimeAndBlock, takeSnapshot, revertToSnapshot } = require('ganache-time-traveler');
import { IssuanceAdvancedInstance, TestERC20MintableInstance } from '../../../types/truffle-contracts';

const IssuanceAdvanced = artifacts.require(
    './drafts/issuance/IssuanceAdvanced.sol',
    ) as Truffle.Contract<IssuanceAdvancedInstance>;
const TestERC20Mintable = artifacts.require(
        './test/issuance/TestERC20Mintable.sol',
    ) as Truffle.Contract<TestERC20MintableInstance>;

should();

// tslint:disable-next-line no-var-requires
const { itShouldThrow } = require('./../../utils');

contract('IssuanceAdvanced', (accounts) => {
    let snapshotId: any;

    const investor1 = accounts[1];
    const investor2 = accounts[2];
    const wallet = accounts[3];

    let issuance: IssuanceAdvancedInstance;
    let currencyToken: TestERC20MintableInstance;
    let issuanceToken: TestERC20MintableInstance;

    beforeEach(async () => {
        const snapShot = await takeSnapshot();
        snapshotId = snapShot.result;
        currencyToken = await TestERC20Mintable.new();
        issuanceToken = await TestERC20Mintable.new();
        issuance = await IssuanceAdvanced.new(
            issuanceToken.address,
            currencyToken.address,
        );
        await issuanceToken.addMinter(issuance.address);
        await issuance.setIssuePrice(5);
        await issuance.setOpeningDate(Math.floor((new Date()).getTime() / 1000) - 3600);
        await issuance.setClosingDate(Math.floor((new Date()).getTime() / 1000) + 3600);
        await issuance.setSoftCap(new BigNumber(50e18));
        await issuance.setMinInvestment(new BigNumber(10e18));
    });

    afterEach(async  () => {
        await revertToSnapshot(snapshotId);
    });

    /**
     * @test {IssuanceAdvanced#openIssuance}
     */
    it('openIssuance can succefully open the Issuance', async () => {
        await issuance.openIssuance();
        bytes32ToString(await issuance.currentState()).should.be.equal('OPEN');
    });

    /**
     * @test {IssuanceAdvanced#openIssuance}
     */
    itShouldThrow('cannot open issuance outside allotted timeframe', async () => {
        await advanceTimeAndBlock(4000);
        await issuance.openIssuance();
    }, 'Not the right time.');

    /**
     * @test {IssuanceAdvanced#invest}
     */
    it('invest should succesfully invest', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await issuance.openIssuance();
        const event = (await issuance.invest(new BigNumber(50e18), { from: investor1 })).logs[0];
        event.event.should.be.equal('InvestmentAdded');
        event.args.investor.should.be.equal(investor1);
        web3.utils.fromWei(event.args.amount, 'ether').should.be.equal('50');
    });

    /**
     * @test {IssuanceAdvanced#invest}
     */
    itShouldThrow('cannot invest if state is not "OPEN"', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await issuance.invest(new BigNumber(50e18), { from: investor1 });
    }, 'Not open for investments.');

    /**
     * @test {IssuanceAdvanced#invest}
     */
    itShouldThrow('cannot invest outisde allotted timespan', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await issuance.openIssuance();
        await advanceTimeAndBlock(4000);
        await issuance.invest(new BigNumber(50e18), { from: investor1 });
    }, 'Not the right time.');

    /**
     * @test {IssuanceAdvanced#invest}
     */
    itShouldThrow('cannot invest with fractional investments', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await issuance.openIssuance();
        await issuance.invest(new BigNumber('1000000000000000001'), { from: investor1 });
    }, 'Fractional investments not allowed.');

    /**
     * @test {IssuanceAdvanced#invest}
     */
    itShouldThrow('cannot invest with investment below minimum threshold', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await issuance.openIssuance();
        await issuance.invest(new BigNumber(5e18), { from: investor1 });
    }, 'Investment below minimum threshold.');

    /**
     * @test {IssuanceAdvanced#startDistribution}
     */
    it('startDistribution can succesfully close the Issuance', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.mint(investor2, new BigNumber(50e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await currencyToken.approve(issuance.address, new BigNumber(10e18), { from: investor2 });
        await issuance.openIssuance();
        await issuance.invest(new BigNumber(50e18), { from: investor1 });
        await issuance.invest(new BigNumber(10e18), { from: investor2 });
        await advanceTimeAndBlock(4000);
        await issuance.startDistribution();
        bytes32ToString(await issuance.currentState()).should.be.equal('LIVE');
    });

    /**
     * @test {IssuanceAdvanced#startDistribution}
     */
    itShouldThrow('cannot start distribution before closing time', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.mint(investor2, new BigNumber(50e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await currencyToken.approve(issuance.address, new BigNumber(10e18), { from: investor2 });
        await issuance.openIssuance();
        await issuance.invest(new BigNumber(50e18), { from: investor1 });
        await issuance.invest(new BigNumber(10e18), { from: investor2 });
        await issuance.startDistribution();
    }, 'Not the right time yet.');

    /**
     * @test {IssuanceAdvanced#startDistribution}
     */
    itShouldThrow('cannot start distribution when soft cap not reached', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.mint(investor2, new BigNumber(50e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await currencyToken.approve(issuance.address, new BigNumber(10e18), { from: investor2 });
        await issuance.openIssuance();
        await issuance.invest(new BigNumber(10e18), { from: investor1 });
        await issuance.invest(new BigNumber(10e18), { from: investor2 });
        await advanceTimeAndBlock(4000);
        await issuance.startDistribution();
    }, 'Not enough funds collected.');

    /**
     * @test {IssuanceAdvanced#withdraw}
     */
    it('withdraw sends tokens to investors', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.mint(investor2, new BigNumber(50e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await currencyToken.approve(issuance.address, new BigNumber(10e18), { from: investor2 });
        await issuance.openIssuance();
        await issuance.invest(new BigNumber(50e18), { from: investor1 });
        await issuance.invest(new BigNumber(10e18), { from: investor2 });
        await advanceTimeAndBlock(4000);
        await issuance.startDistribution();
        bytes32ToString(await issuance.currentState()).should.be.equal('LIVE');
        await issuance.withdraw({ from: investor1 });
        await issuance.withdraw({ from: investor2 });
        web3.utils.fromWei(await issuanceToken.balanceOf(investor1), 'ether').should.be.equal('10');
        web3.utils.fromWei(await issuanceToken.balanceOf(investor2), 'ether').should.be.equal('2');
    });

    /**
     * @test {IssuanceAdvanced#withdraw}
     */
    itShouldThrow('cannot withdraw when state is not "LIVE"', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.mint(investor2, new BigNumber(50e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await currencyToken.approve(issuance.address, new BigNumber(10e18), { from: investor2 });
        await issuance.openIssuance();
        await issuance.invest(new BigNumber(50e18), { from: investor1 });
        await issuance.invest(new BigNumber(10e18), { from: investor2 });
        await advanceTimeAndBlock(4000);
        await issuance.withdraw({ from: investor1 });
    }, 'Cannot withdraw now.');

    /**
     * @test {IssuanceAdvanced#withdraw}
     */
    itShouldThrow('cannot withdraw when not invested', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.mint(investor2, new BigNumber(50e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await currencyToken.approve(issuance.address, new BigNumber(10e18), { from: investor2 });
        await issuance.openIssuance();
        await issuance.invest(new BigNumber(50e18), { from: investor1 });
        await advanceTimeAndBlock(4000);
        await issuance.startDistribution();
        await issuance.withdraw({ from: investor2 });
    }, 'No investments found.');

    /**
     * @test {IssuanceAdvanced#cancelInvestment}
     */
    it('cancelInvestment should cancel an investor investments', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.approve(issuance.address, new BigNumber(60e18), { from: investor1 });
        await issuance.openIssuance();
        await issuance.invest(new BigNumber(50e18), { from: investor1 });
        await issuance.invest(new BigNumber(10e18), { from: investor1 });
        const event = (await issuance.cancelInvestment({ from: investor1 })).logs[0];
        event.event.should.be.equal('InvestmentCancelled');
        event.args.investor.should.be.equal(investor1);
        web3.utils.fromWei(event.args.amount, 'ether').should.be.equal('60');
    });

    /**
     * @test {IssuanceAdvanced#cancelInvestment}
     */
    itShouldThrow('cannot cancel investment when state is not "OPEN" or "FAILED"', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.approve(issuance.address, new BigNumber(60e18), { from: investor1 });
        await issuance.openIssuance();
        await issuance.invest(new BigNumber(50e18), { from: investor1 });
        await issuance.invest(new BigNumber(10e18), { from: investor1 });
        await advanceTimeAndBlock(4000);
        await issuance.startDistribution();
        await issuance.cancelInvestment({ from: investor1 });
    }, 'Cannot cancel now.');

    /**
     * @test {IssuanceAdvanced#cancelInvestment}
     */
    itShouldThrow('cannot cancel investment when not invested', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.approve(issuance.address, new BigNumber(60e18), { from: investor1 });
        await issuance.openIssuance();
        await issuance.cancelInvestment({ from: investor1 });
    }, 'No investments found.');

    /**
     * @test {IssuanceAdvanced#cancelAllInvestments}
     */
    it('cancelAllInvestments should begin the process to cancel all investor investments', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.mint(investor2, new BigNumber(50e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await currencyToken.approve(issuance.address, new BigNumber(10e18), { from: investor2 });
        await issuance.openIssuance();
        await issuance.invest(new BigNumber(50e18), { from: investor1 });
        await issuance.invest(new BigNumber(10e18), { from: investor2 });
        await issuance.cancelAllInvestments();
        bytes32ToString(await issuance.currentState()).should.be.equal('FAILED');
        await issuance.cancelInvestment({ from: investor1 });
        await issuance.cancelInvestment({ from: investor2 });
        web3.utils.fromWei(await currencyToken.balanceOf(investor1), 'ether').should.be.equal('100');
        web3.utils.fromWei(await currencyToken.balanceOf(investor2), 'ether').should.be.equal('50');
    });

    /**
     * @test {IssuanceAdvanced#transferFunds}
     */
    it('transferFunds should transfer all collected tokens to the wallet of the owner', async () => {
        await currencyToken.mint(investor1, new BigNumber(100e18));
        await currencyToken.mint(investor2, new BigNumber(50e18));
        await currencyToken.approve(issuance.address, new BigNumber(50e18), { from: investor1 });
        await currencyToken.approve(issuance.address, new BigNumber(10e18), { from: investor2 });
        await issuance.openIssuance();
        await issuance.invest(new BigNumber(50e18), { from: investor1 });
        await issuance.invest(new BigNumber(10e18), { from: investor2 });
        await advanceTimeAndBlock(4000);
        await issuance.startDistribution();
        await issuance.withdraw({ from: investor1 });
        await issuance.withdraw({ from: investor2 });
        await issuance.transferFunds(wallet);
        web3.utils.fromWei(await currencyToken.balanceOf(wallet), 'ether').should.be.equal('60');
    });

    /**
     * @test {IssuanceAdvanced#transferFunds}
     */
    itShouldThrow('cannot transfer funds when issuance state is not "LIVE"', async () => {
        await issuance.openIssuance();
        await issuance.transferFunds(wallet);
    }, 'Cannot transfer funds now.');


    it('setIssuePrice sets the issue price', async () => {
        await issuance.setIssuePrice(5);
        (await issuance.issuePrice()).toString().should.be.equal('5');
    });

    it('setOpeningDate sets the opening date', async () => {
        const openingDate = Math.floor((new Date()).getTime() / 1000);
        await issuance.setOpeningDate(openingDate);
        (await issuance.openingDate()).toString().should.be.equal(openingDate.toString());
    });

    it('setClosingDate sets the closing date', async () => {
        const closingDate = Math.floor((new Date()).getTime() / 1000);
        await issuance.setClosingDate(closingDate);
        (await issuance.closingDate()).toString().should.be.equal(closingDate.toString());
    });

    it('setSoftCap sets the soft cap', async () => {
        await issuance.setSoftCap(new BigNumber(100e18));
        web3.utils.fromWei(await issuance.softCap(), 'ether').should.be.equal('100');
    });

    it('setMinInvestment sets the minimum investment', async () => {
        await issuance.setMinInvestment(new BigNumber(1e18));
        web3.utils.fromWei(await issuance.minInvestment(), 'ether').should.be.equal('1');
    });

});

function bytes32ToString(text: string) {
    return web3.utils.toAscii(text).replace(/\0/g, '');
}
