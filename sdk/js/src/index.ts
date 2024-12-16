//choose config file when first time require
if (!global.brcsoul_sdk_env || !global.brcsoul_sdk_config) {
  global.brcsoul_sdk_agent = null;
  switch (process.env.APP_ENV) {
    case 'release':
      global.brcsoul_sdk_env = 'release';
      global.brcsoul_sdk_config = require('./config/release');
      break;
    case 'unittest':
      global.brcsoul_sdk_env = 'unittest';
      global.brcsoul_sdk_config = require('./config/unittest');
      break;
    default:
      global.brcsoul_sdk_env = 'release';
      global.brcsoul_sdk_config = require('./config/release');
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
