import fs from 'fs';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';

async function moveFile(sourcePath, destinationPath) {
  try {
    if (!fs.existsSync(sourcePath)) {
      console.error(`Source file ${sourcePath} does not exist.`);
      return;
    }

    let destination = destinationPath;
    if (fs.existsSync(destinationPath) && fs.statSync(destinationPath).isDirectory()) {
      destination = path.join(destinationPath, path.basename(sourcePath));
    }

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destination);

    readStream.pipe(writeStream);

    writeStream.on('finish', async () => {
      console.log(`File moved from ${sourcePath} to ${destination}`);

      try {
        await fs.promises.unlink(sourcePath);
      } catch (err) {
        console.error(`Error deleting source file: ${err.message}`);
      }
    });

    readStream.on('error', (err) => console.error(`Read error: ${err.message}`));
    writeStream.on('error', (err) => console.error(`Write error: ${err.message}`));
  } catch (err) {
    console.error(`Error moving file: ${err.message}`);
  }
}

export default moveFile;
