import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCuJDTrdnIR9GPVGl85Cey6FdmLSJE58GU",
  authDomain: "cs554-6d42e.firebaseapp.com",
  projectId: "cs554-6d42e",
  storageBucket: "cs554-6d42e.appspot.com",
  messagingSenderId: "123557429358",
  appId: "1:123557429358:web:2168f502f90f19a24f667f",
  measurementId: "G-82V7GJJP66"
});

export default firebaseApp;
