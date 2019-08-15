const fs = require('mz/fs');
const path = require('path');

module.exports = function (inputFolder, outputFolder){
  function copyFile(pathFile){
    let nameFold = path.basename(pathFile)
      .charAt(0);
    fs.copyFile(pathFile, path.join(outputFolder, nameFold, path.basename(pathFile)))
      .then(() => {
        console.log('End copy file')
      }).catch(err => {
        fs.mkdir(path.join(outputFolder, nameFold))
          .then(() => {
            fs.copyFileSync(pathFile, path.join(outputFolder, nameFold, path.basename(pathFile)));
          }).catch(err => {
            console.log(err)
          })
      })
  }

  return function readDir(base){
    fs.readdir(base)
      .then(data => {
        data.forEach(item => {
          let pathFile = path.join(base, item)
          let stats = fs.statSync(pathFile);
          if(stats.isDirectory()){
            readDir(pathFile);
          }else{
            copyFile(pathFile);
          }
        })
      }).catch(err => {
        console.log(err)
      })
  }
}