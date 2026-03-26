"use client"

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getDatabase, ref, onValue, set, type Database } from 'firebase/database'
import { getAuth, signInAnonymously, signInWithEmailAndPassword, signOut, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

let app: FirebaseApp | null = null
let database: Database | null = null
let auth: Auth | null = null

export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === 'undefined') return null
  
  if (!app && getApps().length === 0) {
    // Only initialize if we have the required config
    if (firebaseConfig.apiKey && firebaseConfig.databaseURL) {
      app = initializeApp(firebaseConfig)
    }
  } else if (getApps().length > 0) {
    app = getApps()[0]
  }
  
  return app
}

export function getFirebaseDatabase(): Database | null {
  if (typeof window === 'undefined') return null
  
  const firebaseApp = getFirebaseApp()
  if (!firebaseApp) return null
  
  if (!database) {
    database = getDatabase(firebaseApp)
  }
  
  return database
}

export function getFirebaseAuth(): Auth | null {
  if (typeof window === 'undefined') return null
  
  const firebaseApp = getFirebaseApp()
  if (!firebaseApp) return null
  
  if (!auth) {
    auth = getAuth(firebaseApp)
  }
  
  return auth
}

export { ref, onValue, set, signInAnonymously, signInWithEmailAndPassword, signOut }
