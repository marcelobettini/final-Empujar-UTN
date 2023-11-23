import { promises as fs } from "node:fs";
export const deleteImage = async filePath => {
  try {
    await fs.unlink(filePath);
    console.log(`File ${filePath} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting file ${filePath}: ${error.message}`);
  }
};
