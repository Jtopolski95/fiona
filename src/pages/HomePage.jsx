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
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`

const PageHeader = styled.div`
  margin-bottom: 30px;
`

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 26px;
  }
`

const PageSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`

const ApiStatusBanner = styled.div`
  background: ${props => props.$isUsingMock ? '#fff3cd' : '#d1edff'};
  border: 2px solid ${props => props.$isUsingMock ? '#ffc107' : '#0ea5e9'};
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 14px;
  color: ${props => props.$isUsingMock ? '#856404' : '#0369a1'};
  
  strong {
    font-weight: 600;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666;
  
  &.infinite-loading {
    height: 60px;
    margin: 20px 0;
  }
`

const ErrorContainer = styled.div`
  background-color: #ffe6e6;
  border: 2px solid #ff6b6b;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  color: #d00;
  text-align: center;
`

const PropertiesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 800px;
  margin: 0 auto;
`

const RankingInfo = styled.div`
  background: linear-gradient(135deg, var(--royal-purple), #8A5FBF);
  color: var(--white);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px rgba(106, 76, 147, 0.3);
  
  h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
    line-height: 1.4;
  }
`

const RankingHeader = styled.div`
  background-color: var(--white);
  border: 2px solid var(--black);
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: var(--black);
  }
  
  .count {
    background-color: var(--royal-purple);
    color: var(--white);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
  }
`

const NoResultsContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  
  h3 {
    margin-bottom: 10px;
    color: #333;
  }
  
  p {
    margin-bottom: 20px;
  }
`

const RefreshButton = styled.button`
  background: var(--royal-purple);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #5a3d7a;
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