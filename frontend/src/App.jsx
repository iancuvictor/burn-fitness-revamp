import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {Toaster} from 'sonner';
import ScrollToTop from "./scroller";
import {
  Footer,
  Acasa,
  Abonamente,
  Clase,
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
  ProfilePage,
  AdminLayout,
  AdminUsers,
  AdminDashboard,
  AdminOrar,
  AdminAbonamente,
  FreeTrial,
  WrapperAbonamente,
  AccountSettings,
  MetodePlata,
  QrCode,
  AdminPaginiPublice,
  Activate
} from "./components";
import "./App.css";

function AdminRoute({children}){
    const { isAdmin, loading } = useContext(AuthContext)
    if(loading) return null;
    return isAdmin ? children : <Navigate to="/" />
}

function App() {
  const [menuState, setMenuState] = useState(false);
  const { loading } = useContext(AuthContext)

  if(loading){
    return null
  } else {

    return (
      <BrowserRouter>
      <ScrollToTop/>
      <div
        id="appWrapper"
        className="relative flex flex-col justify-between bg-gray-100 w-full" 
        >
        <Navbar menuState={menuState} setMenuState={setMenuState} />

        <Routes>
          <Route path="/" element={<Acasa />} />
          <Route path="/abonamente" element={<Abonamente />} />
          <Route path="/clase" element={<Clase />} />
          <Route path="/clase/orar" element={<OrarClase />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/salidefitness" element={<SaliDeFitness />} />
          <Route path="/salidefitness/sala-fitness-zorilor" element={<SalaFitnessZorilor />} />
          <Route path="/salidefitness/sala-fitness-sigma" element={<SalaFitnessSigma />} />
          <Route path="/salidefitness/sala-fitness-manastur" element={<SalaFitnessManastur />}/>
          <Route path="/salidefitness/sala-fitness-flora" element={<SalaFitnessFlora />} />
          <Route path="/salidefitness/sala-fitness-marasti" element={<SalaFitnessMarasti />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/activate" element={<Activate />} />
          <Route path="/profile" element={<UserPages />}>
            <Route element={<ProfilePage />}>
              <Route path="" element={<WrapperAbonamente />} />
              <Route path="setariCont" element={<AccountSettings />} />
              {/* <Route path="metodePlata" element={<MetodePlata />} /> */}
              <Route path="qrCode" element={<QrCode />} />
            </Route>
          </Route>
          <Route path="/freeTrial" element={<FreeTrial />} />
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="clienti" element={<AdminRoute><AdminUsers /></AdminRoute>} />
              <Route path="orar" element={<AdminRoute><AdminOrar /></AdminRoute>} />
              <Route path="abonamente" element={<AdminRoute><AdminAbonamente /></AdminRoute>} />
              <Route path="paginiPublice" element={<AdminRoute><AdminPaginiPublice /></AdminRoute>} />
          </Route>
          {/* <Route path="/regulamentul-de-functionare-a-centrelor-de-fitness-burn" element={<Regulament />} /> */}
        </Routes>
        </div>
        <Footer />
        <Toaster position="top-center" richColors/>
    </BrowserRouter>
  );
}
}

export default App;
