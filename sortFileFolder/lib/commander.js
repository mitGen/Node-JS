const fs = require('fs');
const path = require('path');
const program = require('commander');

module.exports = program
  .option('-i, --input [type]', 'Input folder copy')
  .option('-o, --output [type]', 'Output folder copy')
  .option('-d, --delete', 'Delete folder input')
