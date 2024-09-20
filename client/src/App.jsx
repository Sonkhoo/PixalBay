import React from 'react';
import './App.css';
import ImageGallery from './components/imageGallery.jsx';

// function App() {
//   return (
    
//   );
// }

// export default App;


import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function App() {
  return (
    <header>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
      <ImageGallery />
    </SignedIn>
  </header>
  );
}