const fs = require('mz/fs');
const path = require('path');

const program = require('./lib/commander');
program.parse(process.argv);

const foldIn = program.input;
const foldOut = program.output;

const copyFile = require('./lib/copyFile')(foldIn, foldOut);

fs.access(foldIn)
  .then(() => {
    fs.access(foldOut)
      .then(() => {
        copyFile(foldIn);
      })
      .catch(err => {
        fs.mkdirSync(foldOut);
        copyFile(foldIn)
      })
  })
  .catch(err => {
    console.log("No sach directory");
  })



