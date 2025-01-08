import { validateVcsItem } from '../utils/utils';

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
    throw 'fol and unf must not be empty at the same time';
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

export function opCancel(vcs) {
  const option = {
    p: 'brc-soul',
    op: 'cancel',
    vcs: vcs,
  };

  for (const vcs_item of vcs) {
    const mess = validateVcsItem(vcs_item);
    if (mess) {
      throw mess;
    }
  }

  return option;
}

export function opMint(vc: Object) {
  const op_time = Math.round(Date.now() / 1000);
  const option = {
    p: 'brc-soul',
    op: 'mint',
    opid: op_time,
    vc: vc,
  };

  if (!vc['coid']) throw 'vc must has coid field';
  if (!vc['vcid']) throw 'vc must has vcid field';
  if (!vc['time']) throw 'vc must has time field';
  if (!vc['sign']) throw 'vc must has sign field';

  return option;
}

export function opBurn(vcs) {
  const op_time = Math.round(Date.now() / 1000);
  const option = {
    p: 'brc-soul',
    op: 'burn',
    opid: op_time,
    vcs: vcs,
  };
  for (const vcs_item of vcs) {
    const mess = validateVcsItem(vcs_item);
    if (mess) {
      throw mess;
    }
  }
  return option;
}
