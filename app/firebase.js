// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native"; // to check platform web/device

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4RYjHjZLfKlJxCRfjpPlwJ1pgLbnwNXQ",
  authDomain: "crop9-570ce.firebaseapp.com",
  projectId: "crop9-570ce",
  storageBucket: "crop9-570ce.firebasestorage.app",
  messagingSenderId: "747399863927",
  appId: "1:747399863927:web:94f859ed50a28d679e7072"
};


// Initialize Firebase App only if not already initialized id initilized then get the instence of that
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); 

// Initialize Auth with AsyncStorage persistence for native platforms
export const auth = Platform.OS === "web"
  ? getAuth(app) // For web, use getAuth
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
