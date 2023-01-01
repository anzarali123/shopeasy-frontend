import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCP0PCpkcEwcXPGjhRQwdLwyFPCzMQjgJI",
  authDomain: "shopeasy-e8095.firebaseapp.com",
  projectId: "shopeasy-e8095",
  storageBucket: "shopeasy-e8095.appspot.com",
  messagingSenderId: "661287536867",
  appId: "1:661287536867:web:e8c4ab834ff7f8ab595dd6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
