import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5R4HXkUEA3J_GkC8QFLOi3McAYRhNKJQ",
  authDomain: "electro-bazaar.firebaseapp.com",
  projectId: "electro-bazaar",
  storageBucket: "electro-bazaar.appspot.com",
  messagingSenderId: "1092127094629",
  appId: "1:1092127094629:web:61835db6d852fbb7b4538c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
