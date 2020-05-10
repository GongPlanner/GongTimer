import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebase.json";

firebase.initializeApp(firebaseConfig);

export default firebase;
