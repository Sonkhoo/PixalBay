import React from 'react';
import './App.css';
import ImageGallery from './components/imageGallery.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookmarkedImages from './components/bookmarkedImages.jsx';

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
      <Router>
      <Routes>
        <Route path="/" element={<ImageGallery />} />
        <Route path="/bookmarks" element={<BookmarkedImages />} />
      </Routes>
    </Router>
    </SignedIn>
  </header>
  );
}