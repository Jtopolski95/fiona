import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const DrawerContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, var(--accent-blue), var(--primary-blue));
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.3s cubic-bezier(0.000, 0.000, 0.230, 1);
  z-index: 1001;
  overflow-y: auto;
  box-shadow: 2px 0 20px rgba(70, 130, 180, 0.3);
  
  /* iOS safe area support */
  padding-top: env(safe-area-inset-top);
`

const DrawerHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 70px; /* Account for navbar */
  
  @media (max-width: 768px) {
    margin-top: calc(70px + env(safe-area-inset-top));
  }
`

const DrawerTitle = styled.h2`
  color: var(--white);
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`

const DrawerNav = styled.nav`
  padding: 20px 0;
`

const DrawerLink = styled(Link)`
  display: block;
  padding: 18px 24px;
  color: var(--white);
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.000, 0.000, 0.230, 1);
  border-left: 4px solid transparent;
  background-color: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  border-left-color: ${props => props.$isActive ? 'var(--white)' : 'transparent'};
  
  /* Better touch targets on mobile */
  @media (max-width: 768px) {
    padding: 20px 24px;
    font-size: 20px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-left-color: var(--white);
  }

  &:active {
    transform: translateX(2px);
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: var(--white);
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: var(--royal-purple);
  }

  @media (min-width: 769px) {
    display: none;
  }
`

const Drawer = ({ isOpen, onClose }) => {
  const location = useLocation()

  const navItems = [
    { path: '/homes', label: 'Homes' },
    { path: '/fiona', label: 'Fiona' }
  ]

  return (
            <DrawerContainer $isOpen={isOpen}>
      <CloseButton onClick={onClose}>×</CloseButton>
      <DrawerHeader>
        <DrawerTitle>Navigation</DrawerTitle>
      </DrawerHeader>
      <DrawerNav>
        {navItems.map(item => (
          <DrawerLink
            key={item.path}
            to={item.path}
            $isActive={location.pathname === item.path}
            onClick={onClose}
          >
            {item.label}
          </DrawerLink>
        ))}
      </DrawerNav>
    </DrawerContainer>
  )
}

export default Drawer 