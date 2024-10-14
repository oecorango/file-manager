import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';

async function compressFile(source, destination) {
  return new Promise((resolve, reject) => {
    const input = createReadStream(source);
    const output = createWriteStream(destination);
    const brotliCompress = createBrotliCompress();

    pipeline(input, brotliCompress, output, (err) => {
      if (err) {
        console.error('Compression failed:', err.message);
        reject(err);
      } else {
        console.log(`File compressed from ${source} to ${destination}`);
        resolve();
      }
    });
  });
}

export default compressFile;
