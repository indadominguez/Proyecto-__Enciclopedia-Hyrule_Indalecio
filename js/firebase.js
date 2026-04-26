import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ==========================
// CONFIGURACIÓN FIREBASE
// ==========================
const firebaseConfig = {
  apiKey: "AIzaSyB47QOlxxkIB27JFqmsf6xzUCYkTzvh6uI",
  authDomain: "proyecto-lenguaje-21b5b.firebaseapp.com",
  projectId: "proyecto-lenguaje-21b5b",
  storageBucket: "proyecto-lenguaje-21b5b.firebasestorage.app",
  messagingSenderId: "236510113707",
  appId: "1:236510113707:web:90f972ce624b07612c2cee"
};

// ==========================
// INICIALIZAR FIREBASE
// ==========================
const app = initializeApp(firebaseConfig);

// ==========================
// CONECTAR FIRESTORE (BD)
// ==========================
export const db = getFirestore(app);