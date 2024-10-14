import fs from "fs";

async function deleteFile(filePath) {
  try {
    await fs.promises.unlink(filePath);
    console.log(`File ${filePath} deleted.`);
  } catch (err) {
    console.error(`Error deleting file: ${err.message}`);
  }
}

export default deleteFile;
