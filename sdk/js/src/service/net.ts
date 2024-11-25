import { fetchData } from '../utils/utils';

export async function getFollower(did: number, size: number, page: number) {
  const result = {};

  if (!did) {
    result['code'] = -1;
    result['mess'] = 'did not valid';
    return result;
  }

  const url = global.config.brc_soul_api + `/api/follower?did=${did}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getFollowing(did: number, size: number, page: number) {
  const result = {};

  if (!did) {
    result['code'] = -1;
    result['mess'] = 'did not valid';
    return result;
  }

  const url = global.config.brc_soul_api + `/api/following?did=${did}`;
  const json: any = await fetchData(url);
  return json;
}
