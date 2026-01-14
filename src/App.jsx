import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import Post from './Post'
import Home from './Home'
import { Link } from 'react-router-dom'
import Page from './componenets/Page'
import { Button } from "@/components/ui/button"
function App() {

  return (
    <>
      <Router>
        <nav className="main-nav">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/post">Post</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/page/:id" element={<Page />} />
        </Routes>
      </Router>
      <Button>Click me</Button>

    </>
  )
}

export default App
