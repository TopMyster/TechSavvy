import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import Post from './Post'
import Home from './Home'
import { Link } from 'react-router-dom'
function App() {

  return (
    <>
      <Router>
        <nav className="main-nav">
          <Link to="/" className="nav-logo">Pokedex</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/post">Post</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </Router>


    </>
  )
}

export default App
