const fs = require('fs');
const path = require('path');

const pathTrue = path.join(__dirname, 'files');
const pathClone = path.join(__dirname, 'files-copy');


fs.rm(pathClone, { recursive: true, force: true }, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  
  fs.mkdir(pathClone, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    
    fs.readdir(pathTrue, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      
      files.forEach((file) => {
        const pathFile = path.join(pathTrue, file.name);
        const pathCloneFile = path.join(pathClone, file.name);
        
        fs.copyFile(pathFile, pathCloneFile, (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
      });
    });
  });
});