import fs from 'fs';
import { createReadStream } from 'fs';
import { resumeStdin } from "../helpers.js";

async function readFile(filePath) {
  try {
    await fs.promises.access(filePath);

    const readStream = createReadStream(filePath, { encoding: 'utf-8' });
    process.stdin.pause();

    readStream.on('data', (data) => {
      process.stdout.write(data);
    });

    readStream.on('end', () => {
      process.stdout.write('\n');
      resumeStdin();
    });

    readStream.on('error', (err) => {
      console.error('Error reading file:', err.message);
      resumeStdin();
    });

  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('Error: File does not exist.');
    } else {
      console.error('Error:', err.message);
    }

    resumeStdin();
  }
}

export default readFile;
