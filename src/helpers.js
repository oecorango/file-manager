import { printCurrentDir } from './modules/index.js';
import { MESSAGES } from './constants.js';

export const beforeStart = (name) => {
  console.log(`${MESSAGES.WelcomeMessage}, ${name}!`);

  printCurrentDir();

  console.log(MESSAGES.EnterMessage);
}
