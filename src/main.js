import { homedir } from 'os';
import {
  getUsername,
  handleExit,
  listDir,
} from './modules/index.js';
import { COMMANDS, MESSAGES } from './constants.js';
import { printCurrentDir } from "./helpers.js";

const homeDir = homedir();
process.chdir(homeDir);

const executeCommand = async (command, ...params) => {
  try {
    switch (command) {
      case COMMANDS.List:
        await listDir();
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

const beforeStart = () => {
  console.log(`Welcome to the File Manager, ${userName}!`);
  printCurrentDir();
  console.log('Enter your command below:');
}

beforeStart();

const handleInput = async (input) => {
  const trimmedInput = input.trim();

  if (trimmedInput.length > 0) {
    const [command, ...params] = trimmedInput.split(' ');
    await executeCommand(command, ...params);
  }

  process.stdout.write('> ');
};

process.stdin.on('data', async (data) => {
  await handleInput(data.toString());
});

process.stdout.write('> ');

process.on('SIGINT', () => {
  handleExit(userName);
});
