import { normalizeMess } from '../utils/utils';

const sdkglb = require('../global');

export function opDid(attr: Object) {
  const op_time = Math.round(Date.now() / 1000);
  const option = {
    p: 'brc-soul',
    op: 'did',
    opid: op_time,
    attr: attr,
  };
  return option;
}

export function opNet(fol: number[], unf: number[]) {
  const op_time = Math.round(Date.now() / 1000);
  const option = {
    p: 'brc-soul',
    op: 'net',
    opid: op_time,
  };
  if (!(fol.length > 0 || unf.length > 0)) {
    return null;
  }
  if (fol.length > 0) option['fol'] = fol;
  if (unf.length > 0) option['unf'] = unf;
  return option;
}

export function opVcc(coid: number, attr: Object) {
  const op_time = Math.round(Date.now() / 1000);
  const option = {
    p: 'brc-soul',
    op: 'vcc',
    opid: op_time,
    coid: coid,
    attr: attr,
  };
  return option;
}

export function opIssue(
  coid: number,
  vcid: number,
  flag: number | null,
  time: number,
  ctrl: Object | null,
  attr: Object | null,
) {
  const vc = {};
  vc['coid'] = coid;
  vc['vcid'] = vcid;
  vc['time'] = time;
  if (flag) vc['flag'] = flag;
  if (ctrl) vc['ctrl'] = ctrl;
  if (attr) vc['attr'] = attr;
  return vc;
}

export function opCancel(vcs: Object) {
  const option = {
    p: 'brc-soul',
    op: 'cancel',
    vcs: vcs,
  };
  return option;
}

export function opMint(vc: any) {
  const op_time = Math.round(Date.now() / 1000);
  const option = {
    p: 'brc-soul',
    op: 'mint',
    opid: op_time,
    vc: vc,
  };

  if (!vc.coid || !vc.vcid || !vc.time || !vc.sign) {
    return null;
  }

  return option;
}

export function opBurn(vcs: Object) {
  const op_time = Math.round(Date.now() / 1000);
  const option = {
    p: 'brc-soul',
    op: 'burn',
    opid: op_time,
    vcs: vcs,
  };
  return option;
}
