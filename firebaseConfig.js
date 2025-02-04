// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence,initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore,collection} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB3MRmFUzRFqEl6avwcpg5r1yPU9lLsjf8",
  authDomain: "oyetaxi1.firebaseapp.com",
  projectId: "oyetaxi1",
  storageBucket: "oyetaxi1.appspot.com",
  messagingSenderId: "367826624588",
  appId: "1:367826624588:web:0b3bff32440f324b0094e9",
  measurementId: "G-Q8YZLRPGGX"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
  persistence:getReactNativePersistence(AsyncStorage)
});

export const db=getFirestore(app);

export const userRef=collection(db,'users')
