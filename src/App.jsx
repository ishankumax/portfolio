import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './components/Home'
import Specs from './components/Specs'
import About from './components/About'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/specs" element={<Specs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
