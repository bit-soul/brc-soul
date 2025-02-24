const sdkglb = require('../global');

export function isIPFSCID(input) {
  const cidPattern = /^[a-z0-9]{46}$/;
  if (!input) return false;
  input = input.toString().trim();
  if (cidPattern.test(input)) {
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

export function isOrdiIns(input) {
  if (!input) return false;
  input = input.toString().trim();
  if (input.length < 10 || input.length === 66) {
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

export function isHttpUrl(input) {
  if (!input) return false;
  input = input.toString().trim();
  if (input.toLowerCase().startsWith('https://')) {
    return true;
  }
  if (input.toLowerCase().startsWith('http://')) {
    return true;
  }
  return false;
}
export function formatIconUrl(input) {
  let format_url = input;
  if (isHttpUrl(format_url)) {
    return format_url;
  }
  format_url = formatIPFS(input);
  if (format_url) {
    return format_url;
  }
  format_url = formatOrdi(input);
  if (format_url) {
    return format_url;
  }
  return null;
}
export function getHttpUrl(input) {
  let http_url = input;
  if (isHttpUrl(http_url)) {
    return http_url;
  }
  http_url = getIPFSUrl(input);
  if (http_url) {
    return http_url;
  }
  http_url = getOrdiUrl(input);
  if (http_url) {
    return http_url;
  }
  return null;
}
