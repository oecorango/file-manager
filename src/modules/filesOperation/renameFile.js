import fs from 'fs';
import path from 'path';

async function renameFile(filePath, newFileName) {
  try {
    const directory = path.dirname(filePath);
    const newFilePath = path.join(directory, newFileName);

    await fs.promises.rename(filePath, newFilePath);
    console.log(`File renamed to ${newFileName}`);
  } catch (err) {
    console.error(`Error renaming file: ${err.message}`);
  }
}

export default renameFile;
