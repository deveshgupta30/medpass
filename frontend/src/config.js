import firebase from "firebase/app";
import "firebase/storage";

const conn = firebase.initializeApp({
  apiKey: "AIzaSyCa4JYU__Mj6gnzds5WAkI3VFLlQOVUx0M",
  authDomain: "medpass-557d7.firebaseapp.com",
  projectId: "medpass-557d7",
  storageBucket: "medpass-557d7.appspot.com",
  messagingSenderId: "48042800021",
  appId: "1:48042800021:web:981b14b0223a7e10153c9c",
  measurementId: "G-XK38P6NM9E",
});

export const storage = firebase.storage();

export default conn;
