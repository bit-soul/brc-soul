require('@dotenvx/dotenvx').config({path:'./env/unittest.env'});
setInterval(() => { }, 3000); //keep cmd window when test finished
require('jest/bin/jest'); //run jest test, parameter read from project attributes