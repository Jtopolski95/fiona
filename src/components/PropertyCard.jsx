import { useState, forwardRef } from 'react'
import styled from 'styled-components'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const CardContainer = styled.div`
  background-color: var(--white);
  border: 2px solid var(--light-blue);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.000, 0.000, 0.230, 1);
  cursor: ${props => props.$isDragging ? 'grabbing' : 'pointer'};
  transform: ${props => props.transform};
  transition: ${props => props.transition};
  opacity: ${props => props.$isDragging ? 0.5 : 1};
  display: flex;
  align-items: stretch;
  min-height: 160px;
  box-shadow: 0 4px 12px rgba(135, 206, 235, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.3);
    border-color: var(--primary-blue);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
    border-radius: 20px;
    margin-bottom: 8px;
  }
`

const DragHandle = styled.div`
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  flex-shrink: 0;
  cursor: grab;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  &:active {
    cursor: grabbing;
  }
  
  .rank-number {
    font-size: 36px;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    min-width: auto;
    min-height: 70px;
    
    .rank-number {
      font-size: 28px;
    }
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 200px;
  flex-shrink: 0;
  border-radius: 0 0 0 0;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 180px;
  }
`

const PropertyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--light-blue), var(--primary-blue));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 16px;
  font-weight: 500;
`

const ClickIndicator = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(70, 130, 180, 0.9);
  color: white;
  border-radius: 24px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 5;
  backdrop-filter: blur(4px);
  
  ${CardContainer}:hover & {
    opacity: 1;
  }
`

const CardContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`

const PropertyHeader = styled.div`
  margin-bottom: 16px;
`

const Price = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: var(--accent-blue);
  margin: 0 0 4px 0;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`

const Address = styled.p`
  font-size: 16px;
  color: var(--text-dark);
  margin: 0;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const PropertyDetails = styled.div`
  display: flex;
  gap: 24px;
  margin: 16px 0;
  
  @media (max-width: 768px) {
    gap: 20px;
    justify-content: space-between;
  }
`

const DetailItem = styled.div`
  .label {
    font-size: 12px;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
    font-weight: 500;
  }
  
  .value {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-dark);
    
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
`

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
`

const AgentInfo = styled.div`
  flex: 1;
`

const AgentName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0 0 2px 0;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const AgentContact = styled.p`
  font-size: 14px;
  color: var(--text-light);
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const MortgageEstimate = styled.div`
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
  color: var(--white);
  padding: 10px 16px;
  border-radius: 12px;
  text-align: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(135, 206, 235, 0.3);
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    width: 100%;
  }
  
  .label {
    font-size: 12px;
    opacity: 0.9;
    margin-bottom: 2px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  
  .amount {
    font-size: 16px;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
`

const PropertyCard = forwardRef(({ property, rank, onClick }, ref) => {
  const [imageError, setImageError] = useState(false)
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: property.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const formatPrice = (price) => {
    if (!price) return 'Price not available'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatSquareFootage = (sqft) => {
    if (!sqft) return 'N/A'
    return new Intl.NumberFormat('en-US').format(sqft) + ' sq ft'
  }

  const calculateMortgageEstimate = (price) => {
    if (!price) return 'N/A'
    // Use the pre-calculated 20% down payment from your data
    if (property.monthlyPayment20) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(property.monthlyPayment20)
    }
    
    // Fallback calculation if not available
    const downPayment = price * 0.20
    const loanAmount = price - downPayment
    const monthlyRate = 0.065 / 12
    const numPayments = 30 * 12
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(monthlyPayment)
  }

  const handleCardClick = (e) => {
    // Don't trigger if clicking on the drag handle
    if (e.target.closest('[data-drag-handle]')) {
      return
    }
    if (onClick) {
      onClick(property)
    }
  }

  return (
    <CardContainer
      ref={node => {
        setNodeRef(node)
        if (ref) ref.current = node
      }}
      style={style}
      $isDragging={isDragging}
      onClick={handleCardClick}
    >
      <DragHandle 
        data-drag-handle="true"
        {...attributes}
        {...listeners}
      >
        <div className="rank-number">#{rank}</div>
      </DragHandle>
      
      <ImageContainer>
        <ClickIndicator>
          View Details
        </ClickIndicator>
        
        {property.photos && property.photos.length > 0 && !imageError ? (
          <PropertyImage
            src={property.photos[0]}
            alt={`Property at ${property.address}`}
            onError={() => setImageError(true)}
          />
        ) : (
          <ImagePlaceholder>
            🏠 No Image Available
          </ImagePlaceholder>
        )}
      </ImageContainer>

      <CardContent>
        <PropertyHeader>
          <Price>{formatPrice(property.price)}</Price>
          <Address>
            {property.address || 'Address not available'}, {property.city || 'Unknown City'}, {property.state || 'NY'}
          </Address>
        </PropertyHeader>

        <PropertyDetails>
          <DetailItem>
            <div className="label">Bedrooms</div>
            <div className="value">{property.bedrooms || 'N/A'}</div>
          </DetailItem>
          <DetailItem>
            <div className="label">Bathrooms</div>
            <div className="value">{property.bathrooms || 'N/A'}</div>
          </DetailItem>
          <DetailItem>
            <div className="label">Square Feet</div>
            <div className="value">{formatSquareFootage(property.squareFootage)}</div>
          </DetailItem>
        </PropertyDetails>

        <BottomSection>
          <AgentInfo>
            <AgentName>{property.agent?.name || 'Agent Information Not Available'}</AgentName>
            {property.agent?.phone && (
              <AgentContact>📞 {property.agent.phone}</AgentContact>
            )}
          </AgentInfo>

          <MortgageEstimate>
            <div className="label">EST. MONTHLY</div>
            <div className="amount">{calculateMortgageEstimate(property.price)}/mo</div>
          </MortgageEstimate>
        </BottomSection>
      </CardContent>
    </CardContainer>
  )
})

PropertyCard.displayName = 'PropertyCard'

export default PropertyCard 