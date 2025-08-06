import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './components/Navbar'
import Drawer from './components/Drawer'
import HomePage from './pages/HomePage'
import FionaPage from './pages/FionaPage'
import './App.css'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: var(--pastel-blue);
  display: flex;
  flex-direction: column;
  
  /* iOS safe area support */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
`

const MainContent = styled.main`
  flex: 1;
  padding-top: 60px; /* Account for fixed navbar */
  transition: margin-left 0.3s ease;
  margin-left: ${props => props.$drawerOpen ? '280px' : '0'};
  background-color: var(--pastel-blue);
  min-height: calc(100vh - 60px);
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 70px; /* Slightly more space on mobile */
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.$show ? 'block' : 'none'};
  
  @media (min-width: 769px) {
    display: none;
  }
`

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  return (
    <Router>
      <AppContainer>
        <Navbar onMenuClick={toggleDrawer} />
        <Drawer isOpen={drawerOpen} onClose={closeDrawer} />
        <Overlay $show={drawerOpen && window.innerWidth <= 768} onClick={closeDrawer} />
        <MainContent $drawerOpen={drawerOpen}>
          <Routes>
            <Route path="/" element={<Navigate to="/homes" replace />} />
            <Route path="/homes" element={<HomePage />} />
            <Route path="/fiona" element={<FionaPage />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  )
}

export default App
