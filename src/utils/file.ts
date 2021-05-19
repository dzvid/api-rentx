import fs from 'fs';

/**
 * Deletes a file if it exists.
 * @param filename File to delete
 * @returns void
 */
export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  await fs.promises.unlink(filename);
};
