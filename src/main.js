import { homedir } from 'os';
import {
  getUsername,
  getSysInfo,
  calculateHash,
  handleExit,
  listDir,
  changeDir,
  printCurrentDir,
} from './modules/index.js';
import {
  renameFile,
  createFile,
  copyFile,
  moveFile,
  deleteFile,
  readFile,
} from './modules/filesOperation/index.js'
import { COMMANDS, MESSAGES, PATH_TO_UP } from './constants.js';
import { beforeStart } from "./helpers.js";

const homeDir = homedir();
process.chdir(homeDir);

const executeCommand = async (command, ...params) => {
  try {
    switch (command) {
      case COMMANDS.List:
        await listDir();
        break;
      case COMMANDS.ChangeDir:
        changeDir(params[0]);
        break;
      case COMMANDS.UpFolder:
        changeDir(PATH_TO_UP);
        break;
      case COMMANDS.Read:
        await readFile(params[0]);
        break;
      case COMMANDS.Create:
        await createFile(params[0], params[1]);
        break;
      case COMMANDS.Rename:
        await renameFile(params[0], params[1]);
        break;
      case COMMANDS.Copy:
        await copyFile(params[0], params[1]);
        break;
      case COMMANDS.Move:
        await moveFile(params[0], params[1]);
        break;
      case COMMANDS.Delete:
        await deleteFile(params[0]);
        break;
      case COMMANDS.Info:
        getSysInfo(params[0]);
        break;
      case COMMANDS.Exit:
        handleExit(userName);
        break;
      default:
        console.log(MESSAGES.InvalidInput);
    }
  } catch (error) {
    console.log(MESSAGES.Error);
  }

  printCurrentDir();
};

const userName = getUsername();

beforeStart(userName);

const handleInput = async (input) => {
  const trimmedInput = input.trim();

  if (trimmedInput.length > 0) {
    const [command, ...params] = trimmedInput.split(' ');
    await executeCommand(command, ...params);
  }

  process.stdout.write('>');
};

process.stdin.on('data', async (data) => {
  await handleInput(data.toString());
});

process.stdout.write('>');

process.on('SIGINT', () => {
  handleExit(userName);
});
