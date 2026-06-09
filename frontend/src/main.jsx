import { createRoot } from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthProvider';
import axios from 'axios';
import './index.css'
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <App/>
  </AuthProvider>
)
