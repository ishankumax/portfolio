import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './components/Home'
import Specs from './components/Specs'
import About from './components/About'
import Insights from './components/Insights'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/specs" element={<Specs />} />
        <Route path="/about" element={<About />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </Router>
  )
}

export default App
