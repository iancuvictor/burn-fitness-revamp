import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import {
  Footer,
  Acasa,
  Abonamente,
  Rezervari,
  Servicii,
  OrarClase,
  Blog,
  Galerie,
  SaliDeFitness,
  Contact,
  Navbar,
  SalaFitnessZorilor,
  SalaFitnessSigma,
  SalaFitnessManastur,
  SalaFitnessFlora,
  SalaFitnessMarasti,
} from "./components";
import "./App.css";

function App() {
  const [menuState, setMenuState] = useState(false);

  return (
    <BrowserRouter>
      <div
        id="appWrapper"
        className="relative flex flex-col justify-between min-h-screen"
      >
        <Navbar menuState={menuState} setMenuState={setMenuState} />
        <Routes>
          <Route path="/" element={<Acasa />} />
          <Route path="/abonamente" element={<Abonamente />} />
          <Route path="/orar-clase" element={<OrarClase />} />
          <Route path="/servicii" element={<Servicii />} />
          <Route path="/rezervari" element={<Rezervari />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/salidefitness" element={<SaliDeFitness />} />
          <Route path="/salidefitness/sala-fitness-zorilor" element={<SalaFitnessZorilor />} />
          <Route path="/salidefitness/sala-fitness-sigma" element={<SalaFitnessSigma />} />
          <Route path="/salidefitness/sala-fitness-manastur" element={<SalaFitnessManastur />}/>
          <Route path="/salidefitness/sala-fitness-flora" element={<SalaFitnessFlora />} />
          <Route path="/salidefitness/sala-fitness-marasti" element={<SalaFitnessMarasti />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/regulamentul-de-functionare-a-centrelor-de-fitness-burn" element={<Regulament />} /> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
