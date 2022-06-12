import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCWOEkSDtAFuLmCp-8x25VFBnysYOzdCxQ",
  authDomain: "vue--invoiceapp.firebaseapp.com",
  projectId: "vue--invoiceapp",
  storageBucket: "vue--invoiceapp.appspot.com",
  messagingSenderId: "34164787302",
  appId: "1:34164787302:web:5d42d169f70f0f1ac885a7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
