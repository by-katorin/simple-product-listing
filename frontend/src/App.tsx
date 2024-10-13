import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContext, AppContextValue } from './Context/AppContext';
import { useContext } from 'react';

import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Index from './Pages/Products/Index';
import Create from './Pages/Products/Create';
import Show from './Pages/Products/Show';
import Update from './Pages/Products/Update';
import './App.css';

export default function App() {
  const { user } = useContext(AppContext) as AppContextValue;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='/register' element={user ? <Home /> : <Register />} />
          <Route path='/login' element={user ? <Home /> : <Login />} />

          {/* Products */}
          <Route path='/products' element={user ? <Index /> : <Login />} />
          <Route path='/products/create' element={user ? <Create /> : <Login />} />
          <Route path='/products/:id' element={<Show />} />
          <Route path='/products/update/:id' element={user ? <Update /> : <Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
