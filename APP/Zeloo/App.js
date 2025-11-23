import React from 'react';
import AppM from './AppM';
import { UserProvider } from './src/screens/userContext';
import { AccessibilityProvider } from './src/screens/AccessibilityContext';
export default function App() {
  return (
    <UserProvider>
      <AccessibilityProvider>
      <AppM />
      </AccessibilityProvider>
   </UserProvider>
  );
}
