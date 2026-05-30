import { BrowserRouter, Routes, Route } from 'react-router'
//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Acasa, Navbar } from './components';

import './index.css'
//import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Acasa />} />
    </Routes>
  </BrowserRouter>
)
