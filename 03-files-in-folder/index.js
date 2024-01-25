const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true })
  .then((folderContents) => {
    folderContents.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);

        fs.stat(filePath)
          .then((fileStats) => {
            const fileSize = fileStats.size;
            const fileExtension = path.extname(file.name).slice(1);

            console.log(`${file.name} - ${fileExtension} - ${fileSize} bytes`);
          })
          .catch((error) => {
            console.error(`Error: ${error.message}`);
          });
      }
    });
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });