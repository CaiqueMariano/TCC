import React from 'react';
import Navigation from './navegacoes/navigation';
import { UserProvider} from "../front-freelaV2/screens/userContext";
export default function App() {
  return (
    <UserProvider>
      <Navigation />
   </UserProvider>
  );
}
