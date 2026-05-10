import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Membership from './pages/Membership'
import Gallery from './pages/Gallery'
import Discover from './pages/Discover'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/program-and-events" element={<Events />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/become-a-member" element={<Membership />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/discover-uzbekistan" element={<Discover />} />
        <Route path="/contact-us" element={<Contact />} />
      </Route>
    </Routes>
  )
}
