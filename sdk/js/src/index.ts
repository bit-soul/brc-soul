//choose config file when first time require
const sdkglb = require('./global');
if (!sdkglb.env || !sdkglb.config) {
  sdkglb.agent = null;
  switch (typeof process === 'undefined' ? 'browser' : process.env.BRCSOUL_SDK_ENV) {
    case 'browser':
      sdkglb.env = 'browser';
      sdkglb.config = require('./config/browser');
      break;
    case 'release':
      sdkglb.env = 'release';
      sdkglb.config = require('./config/release');
      break;
    case 'unittest':
      sdkglb.env = 'unittest';
      sdkglb.config = require('./config/unittest');
      break;
    default:
      sdkglb.env = 'release';
      sdkglb.config = require('./config/release');
      break;
  }
}

export { SbtState } from './interface';

export { normalizeMess, checkSign, updateGlobalBrcSoulApi, setGlobalProxyAgent } from './utils/utils';

export { getPersonByDid, getPersonByAddr, getDid, getDids, getBatchDids } from './service/did';
export { getGrp, getGrps, getMyGrps, getBatchGrps, getGrpMembers, getLeaveSBT } from './service/grp';
export { getFollower, getFollowing } from './service/net';
export { getSbt } from './service/sbt';
export { getVcc, getVccs, getMyVccs, getBatchVccs, getVccMembers, getBurnSBT } from './service/vcc';
export { getMyCoidSeq } from './service/misc';
