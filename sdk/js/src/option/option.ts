import { normalizeMess } from '../utils/utils';

const sdkglb = require('../global');

export function opDid(attr) {
  const op_time = Math.round(Date.now() / 1000);
  const option = {
    p: 'brc-soul',
    op: 'did',
    opid: op_time,
    attr: attr,
  };
  return option;
}

export function opNet(fol, unf) {
  const op_time = Math.round(Date.now() / 1000);
  const option = {
    p: 'brc-soul',
    op: 'did',
    opid: op_time,
    fol: fol,
    unf: unf,
  };
  return option;
}

export function opVcc(attr, is_group) {
  const op_time = Math.round(Date.now() / 1000);
  const option = {
    p: 'brc-soul',
    op: 'did',
    opid: op_time,
    attr: attr,
  };
  return option;
}

export function opIssue(coid, flag, ctrl, attr) {
  const op_time = Math.round(Date.now() / 1000);
  const vc = {
    coid: coid,
    vcid: op_time,
    flag: flag,
    time: op_time,
    ctrl: ctrl,
    attr: attr,
  };
  return vc;
}

export function opCancel(vcs) {
  const option = {
    p: 'brc-soul',
    op: 'did',
    vcs: vcs,
  };
  return option;
}

export function opMint(vc) {
  const op_time = Math.round(Date.now() / 1000);
  const option = {
    p: 'brc-soul',
    op: 'did',
    opid: op_time,
    vc: vc,
  };
  return option;
}

export function opBurn(vcs) {
  const op_time = Math.round(Date.now() / 1000);
  const option = {
    p: 'brc-soul',
    op: 'did',
    opid: op_time,
    vcs: vcs,
  };
  return option;
}
