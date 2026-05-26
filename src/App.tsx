import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import FullWorkPage from './pages/FullWorkPage';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<FullWorkPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
