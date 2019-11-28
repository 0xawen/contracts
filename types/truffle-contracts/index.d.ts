/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

/// <reference types="truffle-typings" />
import { BigNumber } from "bignumber.js";

export interface DoubleLinkedListContract
  extends Truffle.Contract<DoubleLinkedListInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<DoubleLinkedListInstance>;
}

export interface GasContract extends Truffle.Contract<GasInstance> {
  "new"(
    _root: string | BigNumber,
    meta?: Truffle.TransactionDetails
  ): Promise<GasInstance>;
}

export interface LinkedListContract
  extends Truffle.Contract<LinkedListInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<LinkedListInstance>;
}

export interface LinkedListAsArrayContract
  extends Truffle.Contract<LinkedListAsArrayInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<LinkedListAsArrayInstance>;
}

export interface MigrationsContract
  extends Truffle.Contract<MigrationsInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<MigrationsInstance>;
}

export interface RBACContract extends Truffle.Contract<RBACInstance> {
  "new"(
    _root: string | BigNumber,
    meta?: Truffle.TransactionDetails
  ): Promise<RBACInstance>;
}

export interface RBACExtendedContract
  extends Truffle.Contract<RBACExtendedInstance> {
  "new"(
    _root: string | BigNumber,
    meta?: Truffle.TransactionDetails
  ): Promise<RBACExtendedInstance>;
}

export interface StringConversionContract
  extends Truffle.Contract<StringConversionInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<StringConversionInstance>;
}

export interface DoubleLinkedListInstance extends Truffle.ContractInstance {
  tail(txDetails?: Truffle.TransactionDetails): Promise<BigNumber>;

  head(txDetails?: Truffle.TransactionDetails): Promise<BigNumber>;

  idCounter(txDetails?: Truffle.TransactionDetails): Promise<BigNumber>;

  objects(
    arg0: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BigNumber, BigNumber, BigNumber, string]>;

  get(
    _id: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BigNumber, BigNumber, BigNumber, string]>;

  findIdForData(
    _data: string | BigNumber,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BigNumber>;

  addHead: {
    (
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  addTail: {
    (
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  remove: {
    (
      _id: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _id: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _id: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _id: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  insertAfter: {
    (
      _prevId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _prevId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _prevId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _prevId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  insertBefore: {
    (
      _nextId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _nextId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _nextId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _nextId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };
}

export interface GasInstance extends Truffle.ContractInstance {
  mappingStorage(
    arg0: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BigNumber>;

  arrayStorage(
    arg0: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BigNumber>;

  writeData: {
    (
      _times: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _times: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _times: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _times: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  readData: {
    (
      _times: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _times: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _times: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _times: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };
}

export interface LinkedListInstance extends Truffle.ContractInstance {
  head(txDetails?: Truffle.TransactionDetails): Promise<BigNumber>;

  idCounter(txDetails?: Truffle.TransactionDetails): Promise<BigNumber>;

  objects(
    arg0: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BigNumber, BigNumber, string]>;

  get(
    _id: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[BigNumber, BigNumber, string]>;

  findPrevId(
    _id: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BigNumber>;

  findTailId(txDetails?: Truffle.TransactionDetails): Promise<BigNumber>;

  findIdForData(
    _data: string | BigNumber,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BigNumber>;

  addHead: {
    (
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  addTail: {
    (
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  remove: {
    (
      _id: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _id: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _id: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _id: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  insertAfter: {
    (
      _prevId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _prevId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _prevId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _prevId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  insertBefore: {
    (
      _nextId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _nextId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;
    sendTransaction(
      _nextId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _nextId: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };
}

export interface LinkedListAsArrayInstance extends Truffle.ContractInstance {
  tail(txDetails?: Truffle.TransactionDetails): Promise<BigNumber>;

  head(txDetails?: Truffle.TransactionDetails): Promise<BigNumber>;

  objects(
    arg0: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  next(
    _id: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[boolean, BigNumber]>;

  prev(
    _id: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[boolean, BigNumber]>;

  get(
    _id: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  find(
    _data: string | BigNumber,
    txDetails?: Truffle.TransactionDetails
  ): Promise<[boolean, BigNumber]>;

  addHead: {
    (
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  remove: {
    (
      _id: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _id: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _id: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _id: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  gasLimit: {
    (
      _size: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _size: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _size: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _size: number | BigNumber | string,
      _data: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };
}

export interface MigrationsInstance extends Truffle.ContractInstance {
  last_completed_migration(
    txDetails?: Truffle.TransactionDetails
  ): Promise<BigNumber>;

  owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

  setCompleted: {
    (
      completed: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      completed: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      completed: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      completed: number | BigNumber | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  upgrade: {
    (
      new_address: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      new_address: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      new_address: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      new_address: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };
}

export interface RBACInstance extends Truffle.ContractInstance {
  NO_ROLE(txDetails?: Truffle.TransactionDetails): Promise<string>;

  ROOT_ROLE(txDetails?: Truffle.TransactionDetails): Promise<string>;

  roleExists(
    _roleId: string | BigNumber,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  hasRole(
    _member: string | BigNumber,
    _roleId: string | BigNumber,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  addRole: {
    (
      _roleId: string | BigNumber,
      _adminRoleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _roleId: string | BigNumber,
      _adminRoleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _roleId: string | BigNumber,
      _adminRoleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _roleId: string | BigNumber,
      _adminRoleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  addMember: {
    (
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  removeMember: {
    (
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };
}

export interface RBACExtendedInstance extends Truffle.ContractInstance {
  addMember: {
    (
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  NO_ROLE(txDetails?: Truffle.TransactionDetails): Promise<string>;

  ROOT_ROLE(txDetails?: Truffle.TransactionDetails): Promise<string>;

  hasRole(
    _member: string | BigNumber,
    _roleId: string | BigNumber,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  roleExists(
    _roleId: string | BigNumber,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  removeMember: {
    (
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _member: string | BigNumber,
      _roleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  roleList(
    arg0: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  addRole: {
    (
      _roleId: string | BigNumber,
      _adminRoleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse>;
    call(
      _roleId: string | BigNumber,
      _adminRoleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _roleId: string | BigNumber,
      _adminRoleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _roleId: string | BigNumber,
      _adminRoleId: string | BigNumber,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  rolesForMember(
    _member: string | BigNumber,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string[]>;
}

export interface StringConversionInstance extends Truffle.ContractInstance {
  byteAt(
    _data: string | BigNumber,
    _at: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  resizeBytes(
    _bytes: string,
    _length: number | BigNumber | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  bytes32ToString(
    _data: string | BigNumber,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  stringToBytes32(
    _data: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;
}
