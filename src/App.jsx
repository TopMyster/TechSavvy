import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Post from './Post'
import Home from './Home'
import Page from './componenets/Page'
import Nav from './componenets/Nav'
function App() {

  return (
    <>
      <Router>
        <nav className="main-nav">
          <Nav />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/page/:id" element={<Page />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
