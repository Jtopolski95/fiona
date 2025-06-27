import { useState } from 'react'
import styled from 'styled-components'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 800px;
  max-height: 90vh;
  width: 100%;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    max-width: 95vw;
    border-radius: 12px;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`

const ImageCarousel = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
  
  @media (max-width: 768px) {
    height: 250px;
    border-radius: 12px 12px 0 0;
  }
`

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${props => props.$active ? 'block' : 'none'};
`

const CarouselNav = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 5;
`

const CarouselDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: white;
  }
`

const CarouselArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  
  &.prev {
    left: 15px;
  }
  
  &.next {
    right: 15px;
  }
`

const ModalBody = styled.div`
  padding: 30px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`

const PropertyHeader = styled.div`
  margin-bottom: 25px;
`

const PropertyAddress = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const PropertyLocation = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 15px 0;
`

const PropertyPrice = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #6A4C93;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const PropertyDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
`

const DetailItem = styled.div`
  text-align: center;
  
  .value {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin-bottom: 4px;
  }
  
  .label {
    font-size: 14px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

const PropertyDescription = styled.div`
  margin-bottom: 25px;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0 0 12px 0;
  }
  
  p {
    font-size: 15px;
    line-height: 1.6;
    color: #555;
    margin: 0;
  }
`

const AgentInfo = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0 0 12px 0;
  }
  
  .agent-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }
  
  .agent-item {
    font-size: 14px;
    color: #666;
    
    strong {
      color: #333;
    }
  }
`

const ShareSection = styled.div`
  border-top: 2px solid #eee;
  padding-top: 20px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0 0 15px 0;
  }
`

const ShareButton = styled.button`
  background: #6A4C93;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
  
  &:hover {
    background: #5a3d7a;
  }
  
  @media (max-width: 768px) {
    padding: 14px 24px;
    font-size: 16px;
  }
`

const PropertyModal = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!property) return null

  const images = property.photos || []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleShare = () => {
    const shareText = `Check out this property: ${property.address}, ${property.city}, ${property.state}

💰 Price: $${property.price?.toLocaleString()}
🛏️ ${property.bedrooms} bedrooms
🛁 ${property.bathrooms} bathrooms
📐 ${property.squareFootage?.toLocaleString()} sq ft

${property.description}

Found on Fiona Real Estate App!`

    // Try to use the Web Share API first (mobile)
    if (navigator.share) {
      navigator.share({
        title: `Property: ${property.address}`,
        text: shareText,
      }).catch(console.error)
    } else {
      // Fallback to SMS link
      const smsBody = encodeURIComponent(shareText)
      const smsUrl = `sms:?body=${smsBody}`
      window.open(smsUrl, '_blank')
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        {images.length > 0 && (
          <ImageCarousel>
            {images.map((image, index) => (
              <CarouselImage
                key={index}
                src={image}
                alt={`Property ${index + 1}`}
                $active={index === currentImageIndex}
              />
            ))}
            
            {images.length > 1 && (
              <>
                <CarouselArrow className="prev" onClick={prevImage}>
                  ←
                </CarouselArrow>
                <CarouselArrow className="next" onClick={nextImage}>
                  →
                </CarouselArrow>
                
                <CarouselNav>
                  {images.map((_, index) => (
                    <CarouselDot
                      key={index}
                      $active={index === currentImageIndex}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </CarouselNav>
              </>
            )}
          </ImageCarousel>
        )}
        
        <ModalBody>
          <PropertyHeader>
            <PropertyAddress>{property.address}</PropertyAddress>
            <PropertyLocation>{property.city}, {property.state} {property.zipCode}</PropertyLocation>
            <PropertyPrice>${property.price?.toLocaleString()}</PropertyPrice>
          </PropertyHeader>
          
          <PropertyDetails>
            <DetailItem>
              <div className="value">{property.bedrooms}</div>
              <div className="label">Bedrooms</div>
            </DetailItem>
            <DetailItem>
              <div className="value">{property.bathrooms}</div>
              <div className="label">Bathrooms</div>
            </DetailItem>
            <DetailItem>
              <div className="value">{property.squareFootage?.toLocaleString()}</div>
              <div className="label">Sq Ft</div>
            </DetailItem>
            <DetailItem>
              <div className="value">{property.propertyType}</div>
              <div className="label">Type</div>
            </DetailItem>
          </PropertyDetails>
          
          {property.description && (
            <PropertyDescription>
              <h3>Description</h3>
              <p>{property.description}</p>
            </PropertyDescription>
          )}
          
          {property.agent && (
            <AgentInfo>
              <h3>Contact Agent</h3>
              <div className="agent-details">
                <div className="agent-item">
                  <strong>Name:</strong> {property.agent.name}
                </div>
                <div className="agent-item">
                  <strong>Phone:</strong> {property.agent.phone}
                </div>
                <div className="agent-item">
                  <strong>Email:</strong> {property.agent.email}
                </div>
              </div>
            </AgentInfo>
          )}
          
          <ShareSection>
            <h3>Share This Property</h3>
            <ShareButton onClick={handleShare}>
              📱 Share via Text Message
            </ShareButton>
          </ShareSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  )
}

export default PropertyModal 