const fs = require('fs');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(stylesFolderPath, (err, files) => {
    if (err) {
      console.error('Error reading styles folder:', err);
      return;
    }
  
    const cssFiles = files.filter(file => {
      const filePath = path.join(stylesFolderPath, file);
      const isFile = fs.statSync(filePath).isFile();
      const hasCorrectExtension = path.extname(file).toLowerCase() === '.css';
      return isFile && hasCorrectExtension;
    });
  
    const styles = cssFiles.map(file => {
      const filePath = path.join(stylesFolderPath, file);
      return fs.readFileSync(filePath, 'utf8');
    });
  
    fs.writeFile(bundleFilePath, styles.join('\n'), err => {
      if (err) {
        console.error('Error writing bundle.css:', err);
        return;
      }
    });
  });