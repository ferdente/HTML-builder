const fs = require('fs');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(stylesFolderPath, (err, files) => {
  if (err) {
    console.error('Error reading styles folder:', err);
    return;
  }

  const cssFiles = files.filter(file => path.extname(file).toLowerCase() === '.css');

  let fileContent = '';

  let counter = 0;

  cssFiles.forEach(file => {
    const filePath = path.join(stylesFolderPath, file);
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      fileContent += content;
      counter++;

      if (counter === cssFiles.length) {
        fs.writeFile(bundleFilePath, fileContent, err => {
          if (err) {
            console.error('Error writing bundle.css:', err);
          }
        });
      }
    });
  });
});