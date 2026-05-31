import { BrowserRouter, Routes, Route } from 'react-router'
import { useState } from 'react'
import { Footer, Acasa, Abonamente, Rezervari, Servicii, OrarClase, Blog, Galerie, SaliDeFitness, Contact, Navbar } from './components';
import './App.css'

function App() {
  const [menuState, setMenuState] = useState(false);

  return (
    <BrowserRouter>
    <div id='appWrapper' className='flex flex-col justify-between min-h-screen'>

  <Navbar menuState={menuState} setMenuState={setMenuState}/>
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
      {/* <Route path="/regulamentul-de-functionare-a-centrelor-de-fitness-burn" element={<Regulament />} /> */}
    </Routes>
  <Footer/>
    </div>
  </BrowserRouter>
  )
}

export default App
