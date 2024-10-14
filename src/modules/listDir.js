import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { getCenterText } from "./helpers.js";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const NAME_WIDTH = 30;
const TYPE_WIDTH = 10;
const INDEX_WIDTH = 5;

async function listDir() {
  try {
    const directoryPath = process.cwd();
    const files = await readdir(directoryPath);

    const fileDetails = await Promise.all(files.map(async (file) => {
      const filePath = path.join(directoryPath, file);
      const fileStat = await stat(filePath);

      return {
        name: file,
        isDirectory: fileStat.isDirectory(),
      };
    }));

    const nameWidth = Math.max(...fileDetails.map((file) => file.name.length), NAME_WIDTH);

    console.log(`\nContents of ${directoryPath}:`);
    console.log('---------------------------------------------------------');
    console.log(`${getCenterText('Index', 5)} | ${getCenterText('Name', nameWidth)} | ${getCenterText('Type', TYPE_WIDTH)}`);
    console.log('---------------------------------------------------------');

    fileDetails
      .sort((a, b) => {
        if (a.isDirectory !== b.isDirectory) {
          return a.isDirectory ? -1 : 1;
        }

        return a.name.localeCompare(b.name);
      })
      .forEach((file, index) => {
        console.log(
          `${getCenterText(index.toString(), INDEX_WIDTH)} | ${getCenterText(file.name, nameWidth)} | ${getCenterText(file.isDirectory ? 'directory' : 'file', TYPE_WIDTH)}`
        );
    });

    console.log('---------------------------------------------------------');
  } catch (err) {
    console.error('Error reading directory:', err.message);
  }
}

export default listDir;
