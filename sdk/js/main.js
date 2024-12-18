const dotenvx = require('@dotenvx/dotenvx');
switch(typeof process === 'undefined' ? 'browser' : process.env.BRCSOUL_SDK_ENV) {
case 'browser':
  dotenvx.config({path:'./env/browser.env'});
  break;
case 'release':
  dotenvx.config({path:'./env/release.env'});
  break;
case 'unittest':
  dotenvx.config({path:'./env/unittest.env'});
  break;
default:
  dotenvx.config({path:'./env/unittest.env'});
  break;
}

const brcsoul = require("./dist/index.js");
