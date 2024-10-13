import os from 'os';

function getSysInfo(command) {
  switch (command) {
    case '--EOL':
      console.log(`System End-Of-Line (EOL): ${JSON.stringify(os.EOL)}`);
      break;

    case '--cpus':
      const cpus = os.cpus();
      console.log(`Overall amount of CPUs: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: Model: ${cpu.model}, Speed: ${(cpu.speed / 1000).toFixed(2)} GHz`);
      });
      break;

    case '--homedir':
      console.log(`Home Directory: ${os.homedir()}`);
      break;

    case '--username':
      const userInfo = os.userInfo();
      console.log(`Current system user name: ${userInfo.username}`);
      break;

    case '--architecture':
      console.log(`CPU Architecture: ${os.arch()}`);
      break;

    default:
      console.log('Invalid command. Available commands are: --EOL, --cpus, --homedir, --username, --architecture');
  }
}

export default getSysInfo;