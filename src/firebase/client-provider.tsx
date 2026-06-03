'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { initializeFirebase, type FirebaseInstances } from './index';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [instances, setInstances] = useState<FirebaseInstances | null>(null);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const result = initializeFirebase();
    if (result) {
      setInstances(result);
    }
    setAttempted(true);
  }, []);

  // If Firebase fails to initialize, we still render children but with null contexts
  // This prevents the whole app from white-screening if config is missing
  if (!attempted) return null;

  return (
    <FirebaseProvider
      app={instances?.app as any}
      firestore={instances?.firestore as any}
      auth={instances?.auth as any}
    >
      {children}
    </FirebaseProvider>
  );
}
