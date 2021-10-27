import React from 'react';
import './styles.css'
import Routes from './routes'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'


import AuthProvider from './contexts/auth'

function App() {
  return (
        <AuthProvider>
          <BrowserRouter>
            <Routes />
            <ToastContainer autoClose={3000} />
          </BrowserRouter>
        </AuthProvider>
  );
}

export default App