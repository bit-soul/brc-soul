global.env = 'release';
global.config = require('./config/release');

export { sortObject, checkSign } from './utils/utils';
export { getPersonByDid, getPersonByAddr, getDid, getDids, getBatchDids } from './service/did';
export { getGrp, getGrps, getMyGrps, getBatchGrps, getLeaveSBT } from './service/grp';
export { getFollower, getFollowing } from './service/net';
export { getSbt } from './service/sbt';
export { getVcc, getVccs, getMyVccs, getBatchVccs, getBurnSBT } from './service/vcc';
export { getMembers, getMyCoidSeq } from './service/misc';
