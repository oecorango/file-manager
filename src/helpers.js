import { printCurrentDir } from "./modules/index.js";

export const beforeStart = (name) => {
  console.log(`Welcome to the File Manager, ${name}!`);
  printCurrentDir();
  console.log('Enter your command below:');
}