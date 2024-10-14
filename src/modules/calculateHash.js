import { createHash } from 'crypto';
import { createReadStream } from 'fs';

async function calculateHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    const input = createReadStream(filePath);

    input.on('data', (chunk) => {
      hash.update(chunk);
    });

    input.on('end', () => {
      const fileHash = hash.digest('hex');
      console.log(`Hash of file ${filePath}: ${fileHash}`);
      resolve(fileHash);
    });

    input.on('error', (error) => {
      console.error('Error calculating hash:', error.message);
      reject(error);
    });
  });
}

export default calculateHash;
