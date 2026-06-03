'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

export type FirebaseInstances = { app: FirebaseApp; firestore: Firestore; auth: Auth };

export function initializeFirebase(): FirebaseInstances | null {
  try {
    // Basic validation to prevent crash on missing config
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "" || firebaseConfig.apiKey === "undefined") {
      console.warn("Firebase configuration is missing or invalid. Please check your environment variables.");
      return null;
    }

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const firestore = getFirestore(app);
    const auth = getAuth(app);

    return { app, firestore, auth };
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    return null;
  }
}

export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
