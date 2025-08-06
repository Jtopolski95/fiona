import { useState } from 'react'
import styled from 'styled-components'
import { NY_CITIES } from '../hooks/useRentcastAPI'

const SearchContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 20px;
  border: 2px solid var(--light-blue);
  margin-bottom: 24px;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.2);
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 24px;
    margin-bottom: 20px;
  }
`

const SearchTitle = styled.h3`
  color: var(--accent-blue);
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 24px;
  }
`

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }
`

const SearchField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-dark);
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const Input = styled.input`
  padding: 14px 16px;
  border: 2px solid var(--light-blue);
  border-radius: 12px;
  font-size: 16px;
  transition: border-color 0.2s;
  background-color: var(--white);
  color: var(--text-dark);
  
  /* Better touch targets on mobile */
  @media (max-width: 768px) {
    padding: 16px 20px;
    font-size: 18px;
    border-radius: 16px;
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(135, 206, 235, 0.2);
  }
`

const Select = styled.select`
  padding: 14px 16px;
  border: 2px solid var(--light-blue);
  border-radius: 12px;
  font-size: 16px;
  background: white;
  transition: border-color 0.2s;
  color: var(--text-dark);
  
  /* Better touch targets on mobile */
  @media (max-width: 768px) {
    padding: 16px 20px;
    font-size: 18px;
    border-radius: 16px;
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(135, 206, 235, 0.2);
  }
`

const SearchButton = styled.button`
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 4px 12px rgba(135, 206, 235, 0.3);
  
  /* Better touch targets on mobile */
  @media (max-width: 768px) {
    padding: 18px 36px;
    font-size: 20px;
    border-radius: 16px;
    width: 100%;
  }
  
  &:hover {
    background: linear-gradient(135deg, var(--accent-blue), var(--primary-blue));
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(135, 206, 235, 0.4);
  }
  
  &:disabled {
    background: var(--light-gray);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const ClearButton = styled.button`
  background: transparent;
  color: var(--accent-blue);
  border: 2px solid var(--primary-blue);
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  
  /* Better touch targets on mobile */
  @media (max-width: 768px) {
    padding: 16px 32px;
    font-size: 18px;
    border-radius: 16px;
    width: 100%;
    margin-bottom: 12px;
  }
  
  &:hover {
    background: var(--primary-blue);
    color: white;
    transform: translateY(-1px);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    margin-top: 24px;
  }
`

const SuggestionsList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid var(--light-blue);
  border-top: none;
  border-radius: 0 0 12px 12px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(135, 206, 235, 0.2);
`

const SuggestionItem = styled.div`
  padding: 14px 16px;
  cursor: pointer;
  border-bottom: 1px solid var(--light-blue);
  font-size: 16px;
  color: var(--text-dark);
  
  @media (max-width: 768px) {
    padding: 16px 20px;
    font-size: 18px;
  }
  
  &:hover {
    background: var(--pastel-blue);
    color: var(--accent-blue);
  }
  
  &:last-child {
    border-bottom: none;
  }
`

const SearchFieldWithSuggestions = styled.div`
  position: relative;
`

const PropertySearch = ({ onSearch, loading = false }) => {
  const [searchParams, setSearchParams] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    propertyType: 'All'
  })
  
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredCities, setFilteredCities] = useState([])

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }))

    // Handle city suggestions
    if (field === 'city') {
      if (value.length > 0) {
        const filtered = NY_CITIES.filter(city =>
          city.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 10)
        setFilteredCities(filtered)
        setShowSuggestions(true)
      } else {
        setShowSuggestions(false)
      }
    }
  }

  const handleCitySelect = (city) => {
    setSearchParams(prev => ({
      ...prev,
      city
    }))
    setShowSuggestions(false)
  }

  const handleSearch = () => {
    // Convert string values to numbers where needed
    const params = {
      ...searchParams,
      minPrice: searchParams.minPrice ? parseInt(searchParams.minPrice) : undefined,
      maxPrice: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : undefined,
      minBedrooms: searchParams.minBedrooms ? parseInt(searchParams.minBedrooms) : undefined,
      maxBedrooms: searchParams.maxBedrooms ? parseInt(searchParams.maxBedrooms) : undefined,
    }

    // Remove empty values
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === undefined || params[key] === 'All') {
        delete params[key]
      }
    })

    onSearch(params)
  }

  const handleClear = () => {
    setSearchParams({
      city: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      propertyType: 'All'
    })
    setShowSuggestions(false)
    onSearch({}) // Search with no filters
  }

  return (
    <SearchContainer>
      <SearchTitle>🏠 Search New York Properties</SearchTitle>
      
      <SearchGrid>
        <SearchField>
          <Label>City</Label>
          <SearchFieldWithSuggestions>
            <Input
              type="text"
              placeholder="Enter NY city name..."
              value={searchParams.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onFocus={() => {
                if (searchParams.city && filteredCities.length > 0) {
                  setShowSuggestions(true)
                }
              }}
            />
            {showSuggestions && filteredCities.length > 0 && (
              <SuggestionsList>
                {filteredCities.map(city => (
                  <SuggestionItem
                    key={city}
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </SuggestionItem>
                ))}
              </SuggestionsList>
            )}
          </SearchFieldWithSuggestions>
        </SearchField>

        <SearchField>
          <Label>Property Type</Label>
          <Select
            value={searchParams.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Single Family">Single Family</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Multi Family">Multi Family</option>
          </Select>
        </SearchField>

        <SearchField>
          <Label>Min Price</Label>
          <Input
            type="number"
            placeholder="$0"
            value={searchParams.minPrice}
            onChange={(e) => handleInputChange('minPrice', e.target.value)}
          />
        </SearchField>

        <SearchField>
          <Label>Max Price</Label>
          <Input
            type="number"
            placeholder="No limit"
            value={searchParams.maxPrice}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
          />
        </SearchField>

        <SearchField>
          <Label>Min Bedrooms</Label>
          <Select
            value={searchParams.minBedrooms}
            onChange={(e) => handleInputChange('minBedrooms', e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </Select>
        </SearchField>

        <SearchField>
          <Label>Max Bedrooms</Label>
          <Select
            value={searchParams.maxBedrooms}
            onChange={(e) => handleInputChange('maxBedrooms', e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </Select>
        </SearchField>
      </SearchGrid>

      <ButtonGroup>
        <ClearButton onClick={handleClear}>
          Clear Filters
        </ClearButton>
        <SearchButton onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search Properties'}
        </SearchButton>
      </ButtonGroup>
    </SearchContainer>
  )
}

export default PropertySearch 