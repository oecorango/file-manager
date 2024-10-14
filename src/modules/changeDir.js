import fs from 'fs';
import path from 'path';
import os from 'os';

function changeDir(changePath) {
  try {
    const currentDir = process.cwd();
    const targetPath = path.isAbsolute(changePath)
      ? changePath
      : path.resolve(currentDir, changePath);

    const rootDir = path.parse(currentDir).root;
    const homeDir = os.homedir();

    if (process.platform === 'win32' && !targetPath.startsWith(rootDir)) {
      console.error('You cannot go above the root of the drive');

      return;
    }

    if (!targetPath.startsWith(homeDir)) {
      console.error('You cannot go above your home directory');

      return;
    }

    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
      process.chdir(targetPath);
    } else {
      console.error('Directory does not exist.');
    }
  } catch (error) {
    console.error('Error changing directory:', error.message);
  }
}

export default changeDir;
