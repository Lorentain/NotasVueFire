import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDMwbDpXK4sY6RF4kIU8v1UMafftiAhqzo",
  authDomain: "lorenzo-e9db4.firebaseapp.com",
  projectId: "lorenzo-e9db4",
  storageBucket: "lorenzo-e9db4.appspot.com",
  messagingSenderId: "649297837638",
  appId: "1:649297837638:web:ecec2534de6695886d1447",
  measurementId: "G-9NGL3P7JVQ"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')