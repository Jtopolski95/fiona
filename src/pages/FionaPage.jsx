import { useState } from 'react'
import styled from 'styled-components'
import InteractivePuppy from '../components/InteractivePuppy'

const PageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const BackgroundSelector = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 12px;
  border: 2px solid #6A4C93;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    padding: 12px;
  }
`

const SelectorTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #6A4C93;
  font-weight: 600;
  text-align: center;
`

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  input[type="radio"] {
    margin-right: 8px;
    accent-color: #6A4C93;
  }
  
  &:hover {
    color: #6A4C93;
  }
`

const FionaPage = () => {
  const [selectedBackground, setSelectedBackground] = useState('catskills')

  const backgroundOptions = [
    {
      id: 'catskills',
      label: '🏔️ Catskills Hills',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    },
    {
      id: 'paris',
      label: '🏛️ Paris Louvre',
      image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    },
    {
      id: 'brooklyn',
      label: '🌳 Brooklyn Prospect Park',
      image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    }
  ]

  const handleBackgroundChange = (backgroundId) => {
    setSelectedBackground(backgroundId)
  }

  return (
    <PageContainer>
      <BackgroundSelector>
        <SelectorTitle>Choose Fiona's Adventure</SelectorTitle>
        {backgroundOptions.map(option => (
          <RadioOption key={option.id}>
            <input
              type="radio"
              name="background"
              value={option.id}
              checked={selectedBackground === option.id}
              onChange={() => handleBackgroundChange(option.id)}
            />
            {option.label}
          </RadioOption>
        ))}
      </BackgroundSelector>
      
      <InteractivePuppy 
        backgroundImage={backgroundOptions.find(bg => bg.id === selectedBackground)?.image}
        backgroundName={selectedBackground}
      />
    </PageContainer>
  )
}

export default FionaPage 