const fs = require('fs');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const directoryPath = path.join(__dirname, 'project-dist');
const bundleFilePath = path.join(directoryPath, 'style.css');

const folderPath = path.join(__dirname, 'assets');
const copyPathAssets = path.join(directoryPath, 'assets');

function makePD(x) {
    fs.mkdir(x, { recursive: true }, (err) => {
        if (err) {
          console.error(err);
        }
      });
}

function copyStyle() {
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
                  console.error('Error writing style.css:', err);
                }
              });
            }
          });
        });
      });
}

function copyAssets(pathTrue, pathClone) {
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
}

function parent() {
  makePD(copyPathAssets)

    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
      
        const directories = files.filter(file => file.isDirectory());
      
        directories.forEach(directory => {
            
          const pathTrue = path.join(folderPath, directory.name);
          const pathClone = path.join(copyPathAssets, directory.name);
          
          copyAssets(pathTrue, pathClone)
        });
      });
}

const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');

function newHTML() {
  const read = fs.createReadStream(templatePath, 'utf-8');
  let html = '';

  read.on('data', (data) => {
    html += data;
  });

  read.on('end', () => {
    fs.readdir(componentsPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }

      files.forEach((file) => {
        if (file.isFile() && path.extname(file.name) === '.html') {
          const readFile = fs.createReadStream(
            path.join(file.path, file.name),
            'utf-8',
          );
          let componentData = '';

          readFile.on('data', (data) => {
            componentData += data;
          });

          readFile.on('end', () => {
            html = html.replaceAll(`{{${path.parse(file.name).name}}}`, componentData);

            fs.createWriteStream(
              path.join(directoryPath, 'index.html'),
            ).write(html);
          });
        }
      });
    });
  });
}


function buld() {
    makePD(directoryPath)
    copyStyle()
    parent()
    newHTML()
}

buld()