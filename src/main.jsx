import { BrowserRouter, Routes, Route } from 'react-router'
//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Acasa, Abonamente, Rezervari, Servicii, OrarClase, Blog, Galerie, SaliDeFitness, Contact, Navbar } from './components';

import './index.css'
//import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Acasa />} />
      <Route path="/abonamente" element={<Abonamente />} />
      <Route path="/orar-clase" element={<OrarClase />} />
      <Route path="/servicii" element={<Servicii />} />
      <Route path="/rezervari" element={<Rezervari />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/galerie" element={<Galerie />} />
      <Route path="/salidefitness" element={<SaliDeFitness />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>
)
