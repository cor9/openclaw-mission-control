import React from 'react';

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  // Simplistic client wrapper will go to separate file if needed.
  return <>{children}</>;
}
