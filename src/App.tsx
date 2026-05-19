import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import FullWorkPage from './pages/FullWorkPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<FullWorkPage />} />
      </Routes>
    </BrowserRouter>
  );
}
