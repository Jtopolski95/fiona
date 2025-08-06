import { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import PropertyCard from '../components/PropertyCard'
import PropertySearch from '../components/PropertySearch'
import PropertyModal from '../components/PropertyModal'
import { useRentcastAPI } from '../hooks/useRentcastAPI'

const PageContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: var(--pastel-blue);
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`

const PageHeader = styled.div`
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    margin-bottom: 28px;
  }
`

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 16px;
  }
`

const PageSubtitle = styled.p`
  font-size: 18px;
  color: var(--text-light);
  margin-bottom: 24px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 28px;
  }
`

const ApiStatusBanner = styled.div`
  background: ${props => props.$isUsingMock ? 'linear-gradient(135deg, #fff3cd, #ffeaa7)' : 'linear-gradient(135deg, var(--light-blue), var(--pastel-blue))'};
  border: 2px solid ${props => props.$isUsingMock ? '#fdcb6e' : 'var(--primary-blue)'};
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 24px;
  font-size: 16px;
  color: ${props => props.$isUsingMock ? '#6c5ce7' : 'var(--accent-blue)'};
  box-shadow: 0 4px 12px rgba(135, 206, 235, 0.2);
  
  @media (max-width: 768px) {
    padding: 18px 24px;
    font-size: 18px;
    border-radius: 20px;
  }
  
  strong {
    font-weight: 600;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 20px;
  color: var(--text-light);
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 22px;
    height: 240px;
  }
  
  &.infinite-loading {
    height: 80px;
    margin: 24px 0;
  }
`

const ErrorContainer = styled.div`
  background: linear-gradient(135deg, #ffe6e6, #ffcccb);
  border: 2px solid #ff6b6b;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  color: #d00;
  text-align: center;
  font-size: 16px;
  
  @media (max-width: 768px) {
    padding: 28px;
    font-size: 18px;
    border-radius: 20px;
  }
`

const PropertiesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`

const RankingInfo = styled.div`
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
  color: var(--white);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 28px;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.3);
  
  @media (max-width: 768px) {
    padding: 28px;
    margin-bottom: 32px;
    border-radius: 24px;
  }
  
  h3 {
    margin: 0 0 10px 0;
    font-size: 20px;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 24px;
      margin-bottom: 16px;
    }
  }
  
  p {
    margin: 0;
    font-size: 16px;
    opacity: 0.9;
    line-height: 1.4;
    
    @media (max-width: 768px) {
      font-size: 18px;
      line-height: 1.5;
    }
  }
`

const RankingHeader = styled.div`
  background-color: var(--white);
  border: 2px solid var(--light-blue);
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(135, 206, 235, 0.2);
  
  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 20px;
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  
  h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    color: var(--text-dark);
    
    @media (max-width: 768px) {
      font-size: 26px;
    }
  }
  
  .count {
    background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
    color: var(--white);
    padding: 8px 16px;
    border-radius: 24px;
    font-size: 16px;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(135, 206, 235, 0.3);
    
    @media (max-width: 768px) {
      padding: 10px 20px;
      font-size: 18px;
    }
  }
`

const NoResultsContainer = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: var(--text-light);
  
  @media (max-width: 768px) {
    padding: 56px 28px;
  }
  
  h3 {
    margin-bottom: 16px;
    color: var(--text-dark);
    font-size: 24px;
    
    @media (max-width: 768px) {
      font-size: 28px;
      margin-bottom: 20px;
    }
  }
  
  p {
    margin-bottom: 24px;
    font-size: 18px;
    
    @media (max-width: 768px) {
      font-size: 20px;
      margin-bottom: 28px;
    }
  }
`

const RefreshButton = styled.button`
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(135, 206, 235, 0.3);
  transition: all 0.2s;
  
  @media (max-width: 768px) {
    padding: 18px 36px;
    font-size: 18px;
    border-radius: 16px;
  }
  
  &:hover {
    background: linear-gradient(135deg, var(--accent-blue), var(--primary-blue));
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(135, 206, 235, 0.4);
  }
`

const HomePage = () => {
  const [properties, setProperties] = useState([])
  const [rankedProperties, setRankedProperties] = useState([])
  const [searchParams, setSearchParams] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const observerRef = useRef()
  const { loading, error, fetchProperties, isUsingMockData } = useRentcastAPI()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Infinite scroll observer
  const lastPropertyElementRef = useCallback(node => {
    if (loading || loadingMore) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreProperties()
      }
    })
    if (node) observerRef.current.observe(node)
  }, [loading, loadingMore, hasMore])

  useEffect(() => {
    // Load default properties on component mount
    loadProperties(true)
  }, [])

  const loadProperties = async (isNewSearch = false, params = {}) => {
    try {
      const pageToLoad = isNewSearch ? 1 : currentPage
      const data = await fetchProperties({
        state: 'NY',
        limit: 10, // Smaller batches for infinite scroll
        offset: (pageToLoad - 1) * 10,
        ...params
      })
      
      if (isNewSearch) {
        setProperties(data)
        setRankedProperties(data.map((property, index) => ({ ...property, rank: index + 1 })))
        setCurrentPage(2)
        setHasMore(data.length === 10)
      } else {
        // Append new properties for infinite scroll
        const newProperties = [...properties, ...data]
        setProperties(newProperties)
        setRankedProperties(newProperties.map((property, index) => ({ ...property, rank: index + 1 })))
        setCurrentPage(prev => prev + 1)
        setHasMore(data.length === 10)
      }
    } catch (err) {
      console.error('Failed to load properties:', err)
      setHasMore(false)
    }
  }

  const loadMoreProperties = async () => {
    if (loadingMore || !hasMore) return
    
    setLoadingMore(true)
    try {
      await loadProperties(false, searchParams)
    } finally {
      setLoadingMore(false)
    }
  }

  const handleSearch = async (params) => {
    setSearchParams(params)
    setCurrentPage(1)
    setHasMore(true)
    await loadProperties(true, params)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setRankedProperties((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        
        const newItems = arrayMove(items, oldIndex, newIndex)
        // Update ranks
        return newItems.map((item, index) => ({ ...item, rank: index + 1 }))
      })
    }
  }

  const getSearchSummary = () => {
    const parts = []
    if (searchParams.city) parts.push(`in ${searchParams.city}`)
    if (searchParams.propertyType && searchParams.propertyType !== 'All') parts.push(searchParams.propertyType)
    if (searchParams.minPrice || searchParams.maxPrice) {
      const priceRange = []
      if (searchParams.minPrice) priceRange.push(`$${searchParams.minPrice.toLocaleString()}+`)
      if (searchParams.maxPrice) priceRange.push(`under $${searchParams.maxPrice.toLocaleString()}`)
      parts.push(priceRange.join(' - '))
    }
    if (searchParams.minBedrooms) parts.push(`${searchParams.minBedrooms}+ bedrooms`)
    
    return parts.length > 0 ? parts.join(', ') : 'all NY properties'
  }

  const handlePropertyClick = (property) => {
    setSelectedProperty(property)
  }

  const handleCloseModal = () => {
    setSelectedProperty(null)
  }

  if (loading && properties.length === 0) {
    return (
      <PageContainer>
        <LoadingContainer>
          <div>🏠 Loading New York properties...</div>
        </LoadingContainer>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>🏠 Fiona Real Estate</PageTitle>
        <PageSubtitle>
          Find and rank your favorite properties in New York State. Drag and drop to create your perfect ranking!
        </PageSubtitle>
      </PageHeader>

      {isUsingMockData && (
        <ApiStatusBanner $isUsingMock={true}>
          <strong>Demo Mode:</strong> Currently showing sample data. Add your Rentcast API key to see real listings.
        </ApiStatusBanner>
      )}

      {error && !isUsingMockData && (
        <ApiStatusBanner $isUsingMock={true}>
          <strong>API Notice:</strong> {error}
        </ApiStatusBanner>
      )}

      <PropertySearch onSearch={handleSearch} loading={loading} />

      <RankingInfo>
        <h3>🎯 How to Use Your Property Rankings</h3>
        <p>
          Drag and drop properties to rank them from most to least favorite. 
          Your rankings help you keep track of which homes you're most interested in visiting or pursuing.
          Scroll down to see more properties!
        </p>
      </RankingInfo>

      {rankedProperties.length > 0 ? (
        <>
          <RankingHeader>
            <h2>Your Property Rankings - {getSearchSummary()}</h2>
            <span className="count">{rankedProperties.length} properties</span>
          </RankingHeader>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={rankedProperties} strategy={verticalListSortingStrategy}>
              <PropertiesGrid>
                {rankedProperties.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    rank={property.rank}
                    onClick={handlePropertyClick}
                    ref={index === rankedProperties.length - 1 ? lastPropertyElementRef : null}
                  />
                ))}
              </PropertiesGrid>
            </SortableContext>
          </DndContext>

          {loadingMore && (
            <LoadingContainer className="infinite-loading">
              <div>🏠 Loading more properties...</div>
            </LoadingContainer>
          )}

          {!hasMore && rankedProperties.length > 0 && (
            <LoadingContainer className="infinite-loading">
              <div>🎉 You've seen all available properties!</div>
            </LoadingContainer>
          )}
        </>
      ) : (
        <NoResultsContainer>
          <h3>No Properties Found</h3>
          <p>Try adjusting your search criteria or clear filters to see more results.</p>
          <RefreshButton onClick={() => handleSearch({})}>
            Show All Properties
          </RefreshButton>
        </NoResultsContainer>
      )}

      {error && (
        <ErrorContainer>
          <strong>Error:</strong> {error}
        </ErrorContainer>
      )}

      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={handleCloseModal} 
        />
      )}
    </PageContainer>
  )
}

export default HomePage 