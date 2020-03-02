import * as chai from 'chai';
// tslint:disable-next-line:no-var-requires
const { BN, ether, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
import { ERC20MintableDetailedInstance, VotingInstance, IssuanceEthInstance } from '../../types/truffle-contracts';

const IssuanceEth = artifacts.require('IssuanceEth') as Truffle.Contract<IssuanceEthInstance>;
const Voting = artifacts.require('Voting') as Truffle.Contract<VotingInstance>;
const ERC20MintableDetailed = artifacts.require(
        'ERC20MintableDetailed'
    ) as Truffle.Contract<ERC20MintableDetailedInstance>;

// tslint:disable-next-line:no-var-requires
chai.use(require('chai-bn')(require('bn.js')));
chai.should();

contract('Voting', (accounts) => {

    const owner = accounts[0];
    const voter1 = accounts[1];
    const voter2 = accounts[2];
    const issuePrice = ether('0.5');
    const threshold = 5000;
    const balance1 = ether('10');
    const balance2 = ether('10');
    const votes1 = ether('8');
    const votes2 = ether('4');

    let voting: VotingInstance;
    let issuanceEth: IssuanceEthInstance;
    let votingToken: ERC20MintableDetailedInstance;
    let votedToken: ERC20MintableDetailedInstance;

    beforeEach(async () => {
        votingToken = await ERC20MintableDetailed.new('VotingToken', 'VOT', 18);
        votedToken = await ERC20MintableDetailed.new('VotedToken', 'VTD', 18);
        issuanceEth = await IssuanceEth.new(votingToken.address);
        await votingToken.addMinter(issuanceEth.address);

        await issuanceEth.setIssuePrice(issuePrice);
        await issuanceEth.startIssuance();
    });

    describe('After deployment', () => {

        beforeEach(async () => {
            voting = await Voting.new(
                votingToken.address,
                threshold
            );
            await votingToken.mint(voter1, balance1);
            await votingToken.mint(voter2, balance2);
            await votingToken.approve(voting.address, votes1, { from: voter1 });
            await votingToken.approve(voting.address, votes2, { from: voter2 });
            await votedToken.addMinter(voting.address);
        });

        /**
         * @test {Voting#cast}
         */
        it('cannot cast vote if state is not "OPEN"', async () => {
            await expectRevert(
                voting.cast(votes1, { from: voter1 }),
                'Not open for voting.',
            );
        });

        it('cannot register proposals when not in "SETUP" state', async () => {
            await voting.open();
            await expectRevert(
                voting.registerProposal(
                    votedToken.address,
                    web3.eth.abi.encodeFunctionCall({
                        type: 'function',
                        name: 'mint',
                        payable: false,
                        inputs: [{
                            name: 'account',
                            type: 'address',
                        }, {
                            name: 'amount',
                            type: 'uint256',
                        }],
                    }, [owner, '1']),
                ),
                'Can propose only when in SETUP',
            );
        });

        it('can register proposals', async () => {
            expectEvent(
                await voting.registerProposal(
                    votedToken.address,
                    web3.eth.abi.encodeFunctionCall({
                        type: 'function',
                        name: 'mint',
                        payable: false,
                        inputs: [{
                            name: 'account',
                            type: 'address',
                        }, {
                            name: 'amount',
                            type: 'uint256',
                        }],
                    }, [owner, '1']),
                ),
                'ProposalRegistered',
            );
        });

        /**
         * @test {Voting#cast}
         */
        it('votes cannot be casted if not in "OPEN" state', async () => {
            await expectRevert(
                voting.cast(votes1, { from: voter1 }),
                'Not open for voting.',
            );
        });

        /**
         * @test {Voting#enact}
         */
        it('fails to enact invalid proposals', async () => {
            await voting.registerProposal(
                votedToken.address,
                web3.eth.abi.encodeFunctionCall({
                    type: 'function',
                    name: 'fail',
                    payable: false,
                    inputs: [],
                }, [])
            ),
            await voting.open();
            await voting.cast(votes1, { from: voter1 });
            await voting.cast(votes2, { from: voter2 });
            await voting.validate();
            await expectRevert(
                voting.enact(),
                'Failed to enact proposal.',
            );
        });

        /**
         * @test {Voting#open}
         */
        it('can open the voting process', async () => {
            await voting.open();
            bytes32ToString(await voting.currentState()).should.be.equal('OPEN');
        });

        describe('after opening the vote', () => {

            beforeEach(async () => {
                await voting.registerProposal(
                    votedToken.address,
                    web3.eth.abi.encodeFunctionCall({
                        type: 'function',
                        name: 'mint',
                        payable: false,
                        inputs: [{
                            name: 'account',
                            type: 'address',
                        }, {
                            name: 'amount',
                            type: 'uint256',
                        }],
                    }, [owner, '1']),
                );
                await voting.open();
            });

            /**
             * @test {Voting#cancel}
             */
            it('voters cannot cancel vote if not casted', async () => {
                await expectRevert(
                    voting.cancel({ from: voter1 }),
                    'No votes casted.',
                );
            });

            /**
             * @test {Voting#cast}
             */
            it('votes can be casted', async () => {
                expectEvent(
                    await voting.cast(votes1, { from: voter1 }),
                    'VoteCasted',
                    {
                        voter: voter1,
                        votes: votes1
                    },
                );
            });

            /**
             * @test {Voting#validate}
             */
            it('cannot validate the vote', async () => {
                await voting.cast(votes1, { from: voter1 }),
                await expectRevert(
                    voting.validate(),
                    'Not enough votes to meet the threshold.'
                );
            });

            describe('once voted', () => {

                beforeEach(async () => {
                    await voting.cast(votes1, { from: voter1 });
                    await voting.cast(votes2, { from: voter2 });
                });

                /**
                 * @test {Voting#enact}
                 */
                it('cannot enact proposal yet', async () => {
                    await expectRevert(
                        voting.enact(),
                        'Cannot enact proposal until vote passes.',
                    );
                });

                /**
                 * @test {Voting#cancel}
                 */
                it('voters can cancel their vote', async () => {
                    expectEvent(
                        await voting.cancel({ from: voter1 }),
                        'VoteCanceled',
                        {
                            voter: voter1,
                            votes: votes1,
                        },
                    );
                });

                /**
                 * @test {Voting#validate}
                 */
                it('can validate the vote', async () => {
                    await voting.validate();
                    bytes32ToString(await voting.currentState()).should.be.equal('PASSED');
                });

                describe('once validated', () => {

                    beforeEach(async () => {
                        await voting.validate();
                    });

                    /**
                     * @test {Voting#cancel}
                     */
                    it('votes can be canceled', async () => {
                        expectEvent(
                            await voting.cancel({ from: voter1 }),
                            'VoteCanceled',
                            {
                                voter: voter1,
                                votes: votes1,
                            },
                        );
                    });

                    /**
                     * @test {Voting#enact}
                     */
                    it('proposals can be enacted', async () => {
                        expectEvent(
                            await voting.enact(),
                            'ProposalEnacted',
                        );
                        BN(await votedToken.balanceOf(owner)).should.be.bignumber.equal('1');
                    });
                });
            });
        });
    });
});

function bytes32ToString(text: string) {
    return web3.utils.toAscii(text).replace(/\0/g, '');
}
