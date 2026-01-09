import { file } from "./util/fetch";

async function upload(uploadedFile) {
  console.log(uploadedFile);
  return await file("/storage/upload", uploadedFile).catch((error) => error);
}

const storage = {
  upload,
};

export default storage;
