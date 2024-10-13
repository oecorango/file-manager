import fs from 'fs';
import path from 'path';

async function createFile(name) {
  try {
    const filePath = path.join(process.cwd(), name);
    await fs.promises.writeFile(filePath, '');

    console.log(`File ${name} created.`);
  } catch (err) {
    console.error(err.message);
  }
}

export default createFile;