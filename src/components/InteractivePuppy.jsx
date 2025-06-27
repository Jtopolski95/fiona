import { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

const PuppyContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #87CEEB, #98FB98);
  cursor: none;
  image-rendering: pixelated;
`

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`

const panting = keyframes`
  0% { transform: translateX(-50%) translateY(0); }
  100% { transform: translateX(-50%) translateY(2px); }
`

const wagTail = keyframes`
  0% { transform: rotate(25deg); }
  100% { transform: rotate(45deg); }
`

const Puppy = styled.div`
  position: absolute;
  width: 100px;
  height: 90px;
  transition: all 0.3s ease-out;
  transform-origin: center;
  z-index: 10;
  image-rendering: pixelated;
  &.walking {
    animation: ${bounce} 0.4s ease-in-out infinite;
  }
`

const PuppyBody = styled.div`
  position: absolute;
  width: 70px;
  height: 50px;
  background: #ffffff;
  border: 3px solid black;
  border-radius: 60% 60% 40% 40%;
  left: 15px;
  top: 30px;
  image-rendering: pixelated;
  box-shadow: 
    inset -2px -2px 0px rgba(0,0,0,0.1), 
    0 -2px 0 #eee, 
    2px 0 0 #eee, 
    -2px 2px 0 #eee,
    inset -1px -1px 0 #ccc,
    inset 1px 1px 0 #eee;
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 12px;
    width: 46px;
    height: 25px;
    background: #ffffff;
    border: 3px solid black;
    border-radius: 60% 60% 30% 30%;
    border-bottom: none;
    box-shadow: 
      -1px -1px 0 #fff, 
      1px -1px 0 #fff,
      inset -1px -1px 0 #ccc;
  }
`

const PuppyHead = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background: #ffffff;
  border: 3px solid black;
  border-radius: 50%;
  left: 25px;
  top: 0px;
  image-rendering: pixelated;
  z-index: 2;
  box-shadow: 
    inset -2px -2px 0px rgba(0,0,0,0.1), 
    0 -3px 0 #eee, 
    -3px 0 0 #eee, 
    3px 0 0 #eee, 
    0 3px 0 #eee,
    inset -1px -1px 0 #ccc,
    inset 1px 1px 0 #eee,
    -2px 2px 0 #eee;
`

const PuppyEars = styled.div`
  position: absolute;
  top: -5px;
  left: 20px;
  width: 16px;
  height: 24px;
  background: #ffffff;
  border: 3px solid black;
  transform: rotate(-10deg);
  image-rendering: pixelated;
  z-index: 1;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  box-shadow: inset -1px -1px 0 #ccc;
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 4px;
    width: 6px;
    height: 6px;
    background: #ffb6c1;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -20px;
    width: 16px;
    height: 24px;
    background: #ffffff;
    border: 3px solid black;
    transform: rotate(20deg);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    box-shadow: 
      inset -2px 10px 0px #ffb6c1,
      inset -1px -1px 0 #ccc;
  }
`

const PuppyEyes = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 4;
  &::before,
  &::after {
    content: '';
    width: 8px;
    height: 8px;
    background: black;
    border-radius: 50% 50% 40% 40%;
    box-shadow: inset 2px 2px 0px white;
  }
`

const PuppyNose = styled.div`
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 7px;
  background: black;
  border-radius: 50% 50% 0 0;
  image-rendering: pixelated;
  z-index: 4;
`

const PuppyMouth = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 8px;
  border: 2px solid black;
  border-top: none;
  border-radius: 0 0 50% 50%;
  opacity: ${props => props.$isHappy ? 0 : 1};
  transition: opacity 0.3s ease;
  image-rendering: pixelated;
  z-index: 4;
`

const HappyMouth = styled.div`
  position: absolute;
  top: 39px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 14px;
  border: 3px solid black;
  border-radius: 0 0 50% 50%;
  background: black;
  opacity: ${props => props.$isHappy ? 1 : 0};
  transition: opacity 0.3s ease;
  image-rendering: pixelated;
  z-index: 4;
  &::before {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 14px;
    background: #ff69b4;
    border: 2px solid black;
    border-top: none;
    border-radius: 0 0 50% 50%;
    animation: ${props => props.$isHappy ? panting : 'none'} 0.5s ease-in-out infinite alternate;
  }
`

const PuppyTail = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  width: 14px;
  height: 25px;
  background: white;
  border: 3px solid black;
  border-radius: 50% 50% 30% 30%;
  transform: rotate(25deg);
  animation: ${props => props.$isHappy ? wagTail : 'none'} 0.4s ease-in-out infinite alternate;
  image-rendering: pixelated;
  z-index: 1;
  box-shadow: inset -1px -1px 0 #ccc;
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -3px;
    width: 20px;
    height: 12px;
    background: white;
    border: 3px solid black;
    border-radius: 50%;
    box-shadow: 
      -1px -1px 0 0 white, 
      1px -1px 0 0 white,
      inset -1px -1px 0 #ccc;
  }
`

const FrontLegs = styled.div`
  position: absolute;
  bottom: -5px;
  left: 22px;
  display: flex;
  gap: 8px;
  z-index: 0;
  
  &::before,
  &::after {
    content: '';
    width: 12px;
    height: 25px;
    background: white;
    border: 3px solid black;
    border-radius: 30% 30% 50% 50%;
    image-rendering: pixelated;
    box-shadow: inset -1px -1px 0 #ccc;
  }
`

const BackLegs = styled.div`
  position: absolute;
  bottom: -5px;
  right: 22px;
  display: flex;
  gap: 8px;
  z-index: 0;
  
  &::before,
  &::after {
    content: '';
    width: 12px;
    height: 25px;
    background: white;
    border: 3px solid black;
    border-radius: 30% 30% 50% 50%;
    image-rendering: pixelated;
    box-shadow: inset -1px -1px 0 #ccc;
  }
`

const TennisBall = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background: #ffff00;
  border: 2px solid #000;
  border-radius: 50%;
  pointer-events: none;
  z-index: 100;
  image-rendering: pixelated;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 2px;
    background: white;
    border-radius: 1px;
  }
  
  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`

const Instructions = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #6A4C93;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #333;
  z-index: 1000;
  max-width: 250px;
  image-rendering: pixelated;
  
  h3 {
    margin: 0 0 10px 0;
    color: #6A4C93;
    font-size: 16px;
  }
  
  p {
    margin: 5px 0;
    line-height: 1.4;
  }
`

const InteractivePuppy = () => {
  const [puppyPosition, setPuppyPosition] = useState({ x: 200, y: 200 })
  const [isHappy, setIsHappy] = useState(false)
  const [isWalking, setIsWalking] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const walkingTimeoutRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    setMousePosition({ x: mouseX, y: mouseY })

    // Calculate distance from mouse to puppy
    const puppyX = puppyPosition.x + 50 // center of puppy
    const puppyY = puppyPosition.y + 45
    const distance = Math.sqrt(
      Math.pow(mouseX - puppyX, 2) + Math.pow(mouseY - puppyY, 2)
    )

    // Get happy when mouse is close
    setIsHappy(distance < 100)

    // Gradually move towards mouse
    const speed = 0.02
    const newX = puppyPosition.x + (mouseX - puppyX - 50) * speed
    const newY = puppyPosition.y + (mouseY - puppyY - 45) * speed
    
    setPuppyPosition({
      x: Math.max(0, Math.min(window.innerWidth - 100, newX)),
      y: Math.max(0, Math.min(window.innerHeight - 90, newY))
    })
  }

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top
    
    // Move puppy to clicked position
    setPuppyPosition({
      x: Math.max(0, Math.min(window.innerWidth - 100, clickX - 50)),
      y: Math.max(0, Math.min(window.innerHeight - 90, clickY - 45))
    })
    
    // Start walking animation
    setIsWalking(true)
    setIsHappy(true)
    
    // Stop walking after animation
    if (walkingTimeoutRef.current) {
      clearTimeout(walkingTimeoutRef.current)
    }
    walkingTimeoutRef.current = setTimeout(() => {
      setIsWalking(false)
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (walkingTimeoutRef.current) {
        clearTimeout(walkingTimeoutRef.current)
      }
    }
  }, [])

  return (
    <PuppyContainer onMouseMove={handleMouseMove} onClick={handleClick}>
      <Instructions>
        <h3>🐕 Fiona's Playground</h3>
        <p><strong>Move your mouse</strong> near Fiona to make her happy!</p>
        <p><strong>Click anywhere</strong> to make her walk there!</p>
        <p>Watch her tail wag and tongue pant! 🎾</p>
      </Instructions>
      
      <Puppy 
        className={isWalking ? 'walking' : ''}
        style={{
          left: `${puppyPosition.x}px`,
          top: `${puppyPosition.y}px`
        }}
      >
        <PuppyBody />
        <PuppyHead />
        <PuppyEars />
        <PuppyEyes />
        <PuppyNose />
        <PuppyMouth $isHappy={isHappy} />
        <HappyMouth $isHappy={isHappy} />
        <PuppyTail $isHappy={isHappy} />
        <FrontLegs />
        <BackLegs />
      </Puppy>
      
      <TennisBall 
        style={{
          left: `${mousePosition.x - 8}px`,
          top: `${mousePosition.y - 8}px`
        }}
      />
    </PuppyContainer>
  )
}

export default InteractivePuppy
