/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase.config.js";

export const uploadImage = (
  file: any,
  setImgUrl: React.Dispatch<React.SetStateAction<string | null>>
  //   setIsUpload: React.Dispatch<React.SetStateAction<boolean>>
) => {
  //   const file = e.target.files?.[0]; // TypeScript safe access for the file
  if (!file) return;

  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    null, // Remove the progress calculation logic here
    (error) => console.log(error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImgUrl(downloadURL); // Set the download URL
        // setIsUpload(false); // Indicate the upload is complete
      });
    }
  );
};
