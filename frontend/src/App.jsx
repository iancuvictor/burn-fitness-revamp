import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  Footer,
  Acasa,
  Abonamente,
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
  UserPages,
  AdminUsers,
  AdminDashboard,
  AdminOrar,
  AdminAbonamente,
  FreeTrial
} from "./components";
import "./App.css";
import AdminLayout from "./components/AdminDashboard/adminLayout";

function AdminRoute({children}){
    const { isAdmin, loading } = useContext(AuthContext)
    if(loading) return null;
    return isAdmin ? children : <Navigate to="/" />
}

function App() {
  const [menuState, setMenuState] = useState(false);

  return (
    <BrowserRouter>
      <div
        id="appWrapper"
        className="relative flex flex-col justify-between bg-gray-100 h-full" 
      >
        <Navbar menuState={menuState} setMenuState={setMenuState} />

        <Routes>
          <Route path="/" element={<Acasa />} />
          <Route path="/abonamente" element={<Abonamente />} />
          <Route path="/orar-clase" element={<OrarClase />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/salidefitness" element={<SaliDeFitness />} />
          <Route path="/salidefitness/sala-fitness-zorilor" element={<SalaFitnessZorilor />} />
          <Route path="/salidefitness/sala-fitness-sigma" element={<SalaFitnessSigma />} />
          <Route path="/salidefitness/sala-fitness-manastur" element={<SalaFitnessManastur />}/>
          <Route path="/salidefitness/sala-fitness-flora" element={<SalaFitnessFlora />} />
          <Route path="/salidefitness/sala-fitness-marasti" element={<SalaFitnessMarasti />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<UserPages />} />
          <Route path="/freeTrial" element={<FreeTrial />} />
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="clienti" element={<AdminRoute><AdminUsers /></AdminRoute>} />
              <Route path="orar" element={<AdminRoute><AdminOrar /></AdminRoute>} />
              <Route path="abonamente" element={<AdminRoute><AdminAbonamente /></AdminRoute>} />
          </Route>
          {/* <Route path="/regulamentul-de-functionare-a-centrelor-de-fitness-burn" element={<Regulament />} /> */}
        </Routes>
        </div>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
