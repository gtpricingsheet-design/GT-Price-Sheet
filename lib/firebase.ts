// GT Produce - Firebase Configuration
// Matches the Firebase initialization from original HTML

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getDatabase, type Database } from 'firebase/database'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: FirebaseApp | undefined
let db: Database | undefined
let auth: Auth | undefined

export function initFirebase() {
  if (typeof window === 'undefined') return { app: undefined, db: undefined, auth: undefined }
  
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
  
  db = getDatabase(app)
  auth = getAuth(app)
  
  return { app, db, auth }
}

export function getFirebaseApp() {
  return app
}

export function getFirebaseDb() {
  return db
}

export function getFirebaseAuth() {
  return auth
}
