import { unlink } from "fs/promises";

export const removeFile = async (path: string) => {
  try {
    await unlink(path);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {}
};
