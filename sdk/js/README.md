# BRC-Soul SDK

## QuickStart
```
npm install brcsoul-sdk --save

import * as brcsoul from 'brcsoul-sdk'
```

## Development

## Enum Value
```
enum SbtState {
  NOTMINT  = 1,
  MINTED   = 2,
  BURNED   = 3,
  CANCELED = 4,
}

enum BurnType {
  BURN_TYPE_COID = 1,
  BURN_TYPE_VCID = 2,
  BURN_TYPE_FLAG = 3,
  BURN_TYPE_TIME = 4,
  BURN_TYPE_FLAG_AND_TIME = 5,
}

enum CancelType {
  CANCEL_TYPE_VCID = 2,
  CANCEL_TYPE_FLAG = 3,
  CANCEL_TYPE_TIME = 4,
  CANCEL_TYPE_FLAG_AND_TIME = 5,
}

```

## Interface
```
//options
function opDid(attr: object|null);
function opNet(fol: number[], unf: number[]);
function opVcc(coid: number, attr: object|null);
function opIssue(coid: number, vcid: number, flag: number|null, time: number, ctrl: object|null, attr: object|null);
function opCancel(vcs: (number | number[])[][]);
function opMint(vc: object);
function opBurn(vcs: (number | number[])[][]);

//did (decentralized identifier)
async function getPersonByDid(did: number);
async function getPersonByAddr(addr: string);
async function getDid(did: number, mydid: number = 0);
async function getDids(mydid: number = 0, size: number = 10, page: number = 0);
async function getBatchDids(dids: number[], mydid: number = 0);

//net
async function getFollower(did: number, size: number = 10, page: number = 0);
async function getFollowing(did: number, size: number = 10, page: number = 0);

//grp (group)
async function getGrp(grp: number, mydid: number = 0);
async function getGrps(mydid: number = 0, size: number = 10, page: number = 0);
async function getMyGrps(mydid: number, size: number = 10, page: number = 0);
async function getBatchGrps(grps: number[], mydid: number = 0);
async function getGrpMembers(grp: number, mydid: number = 0, size: number = 10, page: number = 0);
async function getLeaveSBT(grp: number, mydid: number);

//vcc (verifiable credentials collection)
async function getVcc(vcc: number, mydid: number = 0);
async function getVccs(mydid: number = 0, size: number = 10, page: number = 0);
async function getMyVccs(mydid: number, size: number = 10, page: number = 0);
async function getBatchVccs(vccs: number[], mydid: number = 0);
async function getVccMembers(vcc: number, mydid: number = 0, size: number = 10, page: number = 0);
async function getBurnSBT(vcc: number, mydid: number);

//sbt (soul bound token)
async function getSbt(coid: number, vcid: number, flag: number, time: number, owner: number);

//misc functions
async function getMyCoidSeq(mydid: number);

//utils
function signMessage(privateKey, address, message);
function verifySign(address: string, message: string, signature: string);
function normalizeMess(obj: object);
function signOPDate(data: object, addr: string, privateKey: string);
function checkOPSign(data: object, addr: string);
function updateGlobalBrcSoulApi(api_base_url: string);
function setGlobalProxyAgent(socks_proxy_url: string);
function concateCoid(mydid: number, coid_seq: number, is_group: boolean);

```
