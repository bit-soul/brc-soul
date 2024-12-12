//choose config file when first time require
if (!global.env || !global.config) {
  global.agent = null;
  switch (process.env.APP_ENV) {
    case 'release':
      global.env = 'release';
      global.config = require('./config/release');
      break;
    case 'unittest':
      global.env = 'unittest';
      global.config = require('./config/unittest');
      break;
    default:
      global.env = 'release';
      global.config = require('./config/release');
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
