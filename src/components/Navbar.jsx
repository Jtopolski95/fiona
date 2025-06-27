import { useState } from 'react'
import styled from 'styled-components'

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: var(--white);
  border-bottom: 2px solid var(--black);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
`

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--black);
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`

const TerrierButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  width: 52px;
  height: 52px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.000, 0.000, 0.230, 1);

  &:hover {
    transform: scale(1.1);
  }
`

const TerrierFace = styled.div`
  width: 36px;
  height: 36px;
  position: relative;
  image-rendering: pixelated;
  transform: scale(1.1);
`

// Base face (white fur) - more Westie-like proportions
const FaceBase = styled.div`
  width: 36px;
  height: 32px;
  background: #ffffff;
  border: 2px solid var(--black);
  border-radius: 50% 50% 40% 40%;
  position: absolute;
  box-shadow: inset -1px -1px 0px rgba(0,0,0,0.1);
  
  /* Left ear - more triangular and upright like a Westie */
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 4px;
    width: 8px;
    height: 12px;
    background: #ffffff;
    border: 2px solid var(--black);
    border-radius: 50% 50% 20% 50%;
    border-bottom: none;
    transform: rotate(-20deg);
    
    /* Inner ear pink */
    box-shadow: inset 1px 1px 0px #ffb6c1;
  }
  
  /* Right ear */
  &::after {
    content: '';
    position: absolute;
    top: -8px;
    right: 4px;
    width: 8px;
    height: 12px;
    background: #ffffff;
    border: 2px solid var(--black);
    border-radius: 50% 50% 50% 20%;
    border-bottom: none;
    transform: rotate(20deg);
    
    /* Inner ear pink */
    box-shadow: inset -1px 1px 0px #ffb6c1;
  }
`

// Westie snout area
const Snout = styled.div`
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 10px;
  background: #ffffff;
  border: 2px solid var(--black);
  border-radius: 40% 40% 50% 50%;
  border-top: none;
`

// Eyes - more expressive
const Eyes = styled.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  
  &::before,
  &::after {
    content: '';
    width: 4px;
    height: 4px;
    background: var(--black);
    border-radius: 50%;
    /* Add tiny white highlight for more life */
    box-shadow: inset 0.5px 0.5px 0px white;
  }
`

// Nose - black button nose
const Nose = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 3px;
  background: var(--black);
  border-radius: 50% 50% 0 0;
`

// Mouth (normal state) - subtle smile
const Mouth = styled.div`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 3px;
  border: 1px solid var(--black);
  border-top: none;
  border-radius: 0 0 50% 50%;
  opacity: ${props => props.$isOpen ? 0 : 1};
  transition: opacity 0.3s ease;
`

// Panting mouth (open state) - more realistic
const PantingMouth = styled.div`
  position: absolute;
  top: 23px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 8px;
  background: #000;
  border: 2px solid var(--black);
  border-radius: 50% 50% 50% 50%;
  opacity: ${props => props.$isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
  
  /* Inner mouth area */
  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background: #8B0000;
    border-radius: 50%;
  }
  
  ${props => props.$isOpen && `
    animation: pant 0.6s ease-in-out infinite;
  `}
  
  @keyframes pant {
    0%, 100% { transform: translateX(-50%) scale(1); }
    50% { transform: translateX(-50%) scale(1.05); }
  }
`

// Tongue - more realistic pink tongue
const Tongue = styled.div`
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 8px;
  background: #ff69b4;
  border: 1px solid var(--black);
  border-top: none;
  border-radius: 0 0 50% 50%;
  opacity: ${props => props.$isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
  
  /* Tongue texture */
  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 4px;
    background: #ff1493;
    border-radius: 50%;
  }
  
  ${props => props.$isOpen && `
    animation: tongueWag 0.4s ease-in-out infinite alternate;
  `}
  
  @keyframes tongueWag {
    0% { transform: translateX(-50%) translateY(0); }
    100% { transform: translateX(-50%) translateY(1px); }
  }
`

const Navbar = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuClick = () => {
    setIsOpen(!isOpen)
    onMenuClick()
  }

  return (
    <NavbarContainer>
      <Title>Fiona Real Estate</Title>
      <TerrierButton onClick={handleMenuClick}>
        <TerrierFace>
          <FaceBase />
          <Snout />
          <Eyes />
          <Nose />
          <Mouth $isOpen={isOpen} />
          <PantingMouth $isOpen={isOpen} />
          <Tongue $isOpen={isOpen} />
        </TerrierFace>
      </TerrierButton>
    </NavbarContainer>
  )
}

export default Navbar 