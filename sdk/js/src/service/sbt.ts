import { fetchData } from '../utils/utils';

const sdkglb = require('../global');

export async function getSbt(coid: number, vcid: number, flag: number, time: number, owner: number) {
  const url =
    sdkglb.config.brc_soul_api +
    `/api/sbt?coid=${coid}` +
    `&vcid=${vcid}` +
    `&flag=${flag ? flag : 0}` +
    `&time=${time}` +
    `&owner=${owner}`;
  const json: any = await fetchData(url);
  return json;
}
