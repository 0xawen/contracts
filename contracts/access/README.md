# Role Based Access Control

This is an Ethereum project that implements runtime configurable access control.

## Usage

In `RBAC.sol`:
* constant NO_ROLE: Reserved value representing NULL
* constant ROOT_ROLE: Reserved value of the seed role.

* constructor `address _root`: Creates the root role and adds _root as a member.

* function `roleExists(bytes32 _roleId)`: Returns `true` if a role with id `_roleId` exists.
* function `addRole(bytes32 _roleId, bytes32 _adminRoleId)`: Adds a new role with id `_roleId` to the contract. Adding or removing bearers to this new role is restricted to members of the role denoted by `_adminRoleId`. `msg.sender` must be a member as well of the role denoted by `adminRoleId`. There is no function to remove roles.
* function `addMember(address _member, bytes32 _roleId)`: Adds `_member` as a member to the role denoted by `_roleId`. `msg.sender` must be a member of the admin role for the role denoted by `roleId`.
* function `removeMember(address _member, bytes32 _roleId)`: Removes `_member` as a member from the role denoted by `_roleId`. `msg.sender` must be a member of the admin role for the role denoted by `roleId`.
* function `hasRole(address _member, bytes32 _roleId)`: Returns `true` if `_member` is a member of the role denoted by `_roleId`, and `false` otherwise. Reverts if a role denoted by `_roleId` doesn't exist.

In `RBACExtended.sol`:
* bytes32[] public roleList: An iterable array with all the roles ever created.
* function `rolesForMember(address _member)`: Returns an array with all the roles held by the `_member`. The array is padded with NO_ROLE at the end.