import os from 'os';
import { OS_COMMANDS } from "./constants.js";

function getSysInfo(command) {
  switch (command) {
    case OS_COMMANDS.EndOfLine:
      console.log(`System End-Of-Line (EOL): ${JSON.stringify(os.EOL)}`);
      break;

    case OS_COMMANDS.Cpus:
      const cpus = os.cpus();
      console.log(`Overall amount of CPUs: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: Model: ${cpu.model}, Speed: ${(cpu.speed / 1000).toFixed(2)} GHz`);
      });
      break;

    case OS_COMMANDS.HomeDir:
      console.log(`Home Directory: ${os.homedir()}`);
      break;

    case OS_COMMANDS.UserName:
      const userInfo = os.userInfo();
      console.log(`Current system user name: ${userInfo.username}`);
      break;

    case OS_COMMANDS.Arh:
      console.log(`CPU Architecture: ${os.arch()}`);
      break;

    default:
      console.log('Invalid command. Available commands are: --EOL, --cpus, --homedir, --username, --architecture');
  }
}

export default getSysInfo;
