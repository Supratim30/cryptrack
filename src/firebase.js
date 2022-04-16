import firebaseConfig from "./config/firebaseConfig";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {initializeApp} from 'firebase/app'

const firebaseapp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseapp);
const db = getFirestore(firebaseapp);

export {auth, db}