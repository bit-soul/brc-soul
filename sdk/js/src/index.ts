global.env = 'release';
global.config = require('./config/release');

import { sortObject, checkSign } from './utils/utils';
import { getPersonByDid, getPersonByAddr, getDid, getDids, getBatchDids } from './service/did';
import { getGrp, getGrps, getMyGrps, getBatchGrps, getLeaveSBT } from './service/grp';
import { getFollower, getFollowing } from './service/net';
import { getSbt } from './service/sbt';
import { getVcc, getVccs, getMyVccs, getBatchVccs, getBurnSBT } from './service/vcc';
import { getMembers, getMyCoidSeq } from './service/misc';
