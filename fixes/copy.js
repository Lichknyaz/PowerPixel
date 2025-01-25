import fs from 'fs/promises'; // Use promises for async operations (Recommended)
import path from "path";

async function copyFile(source, destination) {
  try {
    await fs.mkdir(path.dirname(destination));
    await fs.copyFile(source, destination);
    console.log(`File ${source} successfully copied to ${destination}`);
  } catch (err) {
    console.error(`Error copying file: ${err}`);
  }
}

// Example usage:
const sourceFile = './src/img/sprite.svg';
const destinationFile = './dist/img/sprite.svg';

copyFile(sourceFile, destinationFile);
