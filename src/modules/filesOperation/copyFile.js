import { createReadStream, createWriteStream } from 'fs';

async function copyFile(source, destination) {
  try {
    const readStream = createReadStream(source);
    const writeStream = createWriteStream(destination);

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`File copied from ${source} to ${destination}`);
    });

    readStream.on('error', (err) => console.error(`Read error: ${err.message}`));
    writeStream.on('error', (err) => console.error(`Write error: ${err.message}`));
  } catch (err) {
    console.error(`Error copying file: ${err.message}`);
  }
}

export default copyFile;
