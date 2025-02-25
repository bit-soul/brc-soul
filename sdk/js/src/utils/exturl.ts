const sdkglb = require('../global');

/*********************************************************
 * ipfs
 *********************************************************/
export function isIPFSCID(input) {
  const cidV0Pattern = /^Qm[A-Za-z0-9]{44}$/;
  const cidV1Pattern = /^b[a-z2-7]{50,100}$/;
  if (!input) return false;
  input = input.toString().trim();
  if (cidV0Pattern.test(input) || cidV1Pattern.test(input)) {
    return true;
  }
  return false;
}
export function formatIPFS(input) {
  if (!input) return null;
  input = input.toString().trim();
  if (input.toLowerCase().startsWith('ipfs://')) {
    return input;
  }
  if (isIPFSCID(input)) {
    return 'ipfs://' + input;
  }
  return null;
}
export function getIPFSUrl(input) {
  if (!input) return null;
  input = input.toString().trim();
  if (input.toLowerCase().startsWith('ipfs://')) {
    input = input.substring(7);
  }
  if (isIPFSCID(input)) {
    return sdkglb.config.ipfs_gateway + input;
  }
  return null;
}

/*********************************************************
 * ordi
 *********************************************************/
export function isOrdiIns(input) {
  const ordiIdPattern = /^[A-Za-z0-9]{64}.\d+$/;
  const ordiNumPattern = /^[0-9]{1,16}$/;
  if (!input) return false;
  input = input.toString().trim();
  if (ordiIdPattern.test(input) || ordiNumPattern.test(input)) {
    return true;
  }
  return false;
}
export function formatOrdi(input) {
  if (!input) return null;
  input = input.toString().trim();
  if (input.toLowerCase().startsWith('ordi://')) {
    return input;
  }
  if (isOrdiIns(input)) {
    return 'ordi://' + input;
  }
  return null;
}
export function getOrdiUrl(input) {
  if (!input) return null;
  input = input.toString().trim();
  if (input.toLowerCase().startsWith('ordi://')) {
    input = input.substring(7);
  }
  if (isOrdiIns(input)) {
    return sdkglb.config.ordi_gateway_prefix + input + sdkglb.config.ordi_gateway_subfix;
  }
  return null;
}

/*********************************************************
 * export function
 *********************************************************/
export function formatExtralUrl(input) {
  let format_url = null;
  input = input.toString().trim();
  format_url = formatIPFS(input);
  if (format_url) {
    return format_url;
  }
  format_url = formatOrdi(input);
  if (format_url) {
    return format_url;
  }
  return input;
}
export function httpExtralUrl(input) {
  let http_url = null;
  input = input.toString().trim();
  http_url = getIPFSUrl(input);
  if (http_url) {
    return http_url;
  }
  http_url = getOrdiUrl(input);
  if (http_url) {
    return http_url;
  }
  return input;
}
