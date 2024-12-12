# BRC-Soul SDK

## QuickStart
```
npm install brcsoul-sdk --save

import * as brcsoul from 'brcsoul-sdk'
```

## Development

## Interface
```
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
function normalizeMess(obj: Object);
function checkSign(data: Object, addr: string);
function updateGlobalBrcSoulApi(api_base_url: string);
function setGlobalProxyAgent(socks_proxy_url: string);

```