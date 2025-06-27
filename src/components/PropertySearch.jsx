import { useState } from 'react'
import styled from 'styled-components'
import { NY_CITIES } from '../hooks/useRentcastAPI'

const SearchContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #6A4C93;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const SearchTitle = styled.h3`
  color: #6A4C93;
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
`

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
`

const SearchField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`

const Input = styled.input`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #6A4C93;
  }
`

const Select = styled.select`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #6A4C93;
  }
`

const SearchButton = styled.button`
  background: #6A4C93;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #5a3d7a;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`

const ClearButton = styled.button`
  background: transparent;
  color: #6A4C93;
  border: 2px solid #6A4C93;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #6A4C93;
    color: white;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 15px;
`

const SuggestionsList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #ddd;
  border-top: none;
  border-radius: 0 0 6px 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`

const SuggestionItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  
  &:hover {
    background: #f5f5f5;
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