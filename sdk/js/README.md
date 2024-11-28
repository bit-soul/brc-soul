# BRC-Soul SDK

## QuickStart
```
npm install brcsoul-sdk --save

import * as brcsoul from 'brcsoul-sdk'
```

## Development

## Interface
```
//did
async function getPersonByDid(did: number);
async function getPersonByAddr(addr: string);
async function getDid(did: number, mydid: number);
async function getDids(mydid: number, size: number, page: number);
async function getBatchDids(dids: number[], mydid: number);

//group
async function getGrp(grp: number, mydid: number);
async function getGrps(mydid: number, size: number, page: number);
async function getMyGrps(mydid: number, size: number, page: number);
async function getBatchGrps(grps: number[], mydid: number);
async function getLeaveSBT(grp: number, mydid: number);

//vc collection
async function getVcc(vcc: number, mydid: number);
async function getVccs(mydid: number, size: number, page: number);
async function getMyVccs(mydid: number, size: number, page: number);
async function getBatchVccs(vccs: number[], mydid: number);
async function getBurnSBT(vcc: number, mydid: number);

//sbt soul bound token
async function getSbt(coid: number, vcid: number, flag: number, time: number, owner: number);

//misc functions
async function getMembers(vcc: number, mydid: number, size: number, page: number);
async function getMyCoidSeq(mydid: number);

```