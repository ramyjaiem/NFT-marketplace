
import firebaseClient from "../lib/firebaseClient";
import { v1 as uuidv1 } from 'uuid';


const getFileExtension = (file: File) => {
    if(file?.name) {
      const extension = file.name.split(".")[1];
      return extension;
    }
  }

export const uploadSingle = async (file: File, path: string, track: ((upload: firebaseClient.storage.UploadTask) => void) =  undefined) => {
if (file && file?.type) {
  const metadata = {
    contentType: file.type,
  };
  const fileName = uuidv1() + "." + getFileExtension(file);
  const refPath = path+fileName;
  const storageRef = firebaseClient.storage().ref();
  const upload =  storageRef.child(refPath).put(file, metadata);
  if(track) {
  track(upload);
  }
  await Promise.resolve(upload);
  const downloadUrl = await storageRef.child(refPath).getDownloadURL();
  return downloadUrl;
}
else {
    throw new Error("invalid file value");
}
};