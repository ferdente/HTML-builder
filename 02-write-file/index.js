const fs = require('fs');
const readline = require('readline');

const filePath = './02-write-file/output.txt';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const outputStream = fs.createWriteStream(filePath, { flags: 'a' });

console.log('Welcome! Enter text (or type "exit" to quit):');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    rl.close();
  } else {
    outputStream.write(input + '\n');
    console.log('Text written to file.');
  }
});

rl.on('close', () => {
  console.log('Farewell!');
  outputStream.end();
  process.exit(0);
});