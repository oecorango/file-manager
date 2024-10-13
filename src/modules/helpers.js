import { platform, arch, totalmem } from "node:os";

export const printCurrentDir = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

export const getCenterText = (text, width) => {
  const textLength = text.length;
  if (textLength >= width) {
    return text;
  }

  const paddingTotal = width - textLength;
  const paddingStart = Math.floor(paddingTotal / 2);
  const paddingEnd = paddingTotal - paddingStart;

  return ' '.repeat(paddingStart) + text + ' '.repeat(paddingEnd);
};

const args = process.argv.slice(2);

export function getUsername() {
  const usernameArg = args.find((arg) => arg.startsWith('--username='));

  if (usernameArg) {
    return usernameArg.split('=')[1];
  }

  return '';
}

export function resumeStdin() {
  printCurrentDir();

  process.stdin.resume();
  process.stdout.write('>');
}

export function handleExit(userName) {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
}
