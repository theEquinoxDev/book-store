import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login';
import Books from './pages/Books';
import Hero from "./components/Hero";
import AddBook from './components/AddBook';

function App() {


  
  return (
    <Router>
      <Navbar/>
      <Routes>
       <Route path='/' element= {<Hero/>} />
       <Route path='/user/register' element = {<Register/>} />
       <Route path='/user/login' element = {<Login/>} />
       <Route path='/books' element = {<Books/>} />
       <Route path = '/books/add' element = {<AddBook/>} />
      </Routes>
    </Router>
  )
}

export default App
