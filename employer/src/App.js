import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './components/Add';
import Details from './components/Details';
import './App.css';
import Update from './components/Update';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/update/:username' element={<Update />} />
          <Route path='/add' element={<Add />} />
          <Route path='/' element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
