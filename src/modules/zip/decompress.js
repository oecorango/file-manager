import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';

async function decompressFile(source, destination) {
  return new Promise((resolve, reject) => {
    const input = createReadStream(source);
    const output = createWriteStream(destination);
    const brotliDecompress = createBrotliDecompress();

    pipeline(input, brotliDecompress, output, (err) => {
      if (err) {
        console.error('Decompression failed:', err.message);
        reject(err);
      } else {
        console.log(`File decompressed from ${source} to ${destination}`);
        resolve();
      }
    });
  });
}

export default decompressFile;
