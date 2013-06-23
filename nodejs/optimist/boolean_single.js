#!/usr/bin/env node
var argv = require('optimist')
    .boolean('v')
    .argv;

console.log(argv);