import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import Post from "./Post";
import './login.css';

export default function App() {
  return (
    /* Setting all routes that will be needed */
    <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/post' element={<Post/>}/>
        </Routes>
    </Router>
  )
}
