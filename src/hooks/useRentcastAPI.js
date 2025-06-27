import { useState } from 'react'
import axios from 'axios'

// Mock data for development/fallback
const mockPropertyData = [
  {
    id: '1',
    address: '123 Maple Street',
    city: 'Albany',
    state: 'NY',
    zipCode: '12205',
    price: 425000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFootage: 1850,
    propertyType: 'Single Family',
    description: 'Beautiful colonial home in a quiet neighborhood. Recently updated kitchen with granite countertops and stainless steel appliances. Large backyard perfect for entertaining. Close to schools and shopping.',
    photos: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    agent: {
      name: 'Sarah Johnson',
      phone: '(518) 555-0123',
      email: 'sarah.johnson@realty.com'
    },
    listingDate: '2024-06-20',
    isFavorite: false
  },
  {
    id: '2',
    address: '456 Oak Avenue',
    city: 'Buffalo',
    state: 'NY',
    zipCode: '14202',
    price: 380000,
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 2200,
    propertyType: 'Single Family',
    description: 'Spacious family home with open floor plan. Features include hardwood floors throughout, updated bathrooms, and a finished basement. Two-car garage and large driveway.',
    photos: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    agent: {
      name: 'Michael Chen',
      phone: '(716) 555-0456',
      email: 'michael.chen@homesplus.com'
    },
    listingDate: '2024-06-25',
    isFavorite: false
  },
  {
    id: '3',
    address: '789 Pine Road',
    city: 'Rochester',
    state: 'NY',
    zipCode: '14620',
    price: 315000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1650,
    propertyType: 'Single Family',
    description: 'Charming ranch home with recent renovations. New roof, siding, and windows. Beautiful landscaping and mature trees. Perfect starter home or downsizing option.',
    photos: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    agent: {
      name: 'Emily Rodriguez',
      phone: '(585) 555-0789',
      email: 'emily.rodriguez@cityrealty.com'
    },
    listingDate: '2024-06-22',
    isFavorite: false
  },
  {
    id: '4',
    address: '321 Elm Street',
    city: 'Syracuse',
    state: 'NY',
    zipCode: '13202',
    price: 295000,
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1200,
    propertyType: 'Condo',
    description: 'Modern condo with stunning city views. Updated kitchen with quartz countertops, stainless appliances. Building amenities include fitness center and rooftop deck.',
    photos: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    agent: {
      name: 'David Thompson',
      phone: '(315) 555-0234',
      email: 'david.thompson@urbanproperties.com'
    },
    listingDate: '2024-06-18',
    isFavorite: false
  },
  {
    id: '5',
    address: '654 Birch Lane',
    city: 'Ithaca',
    state: 'NY',
    zipCode: '14850',
    price: 485000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFootage: 2400,
    propertyType: 'Single Family',
    description: 'Luxury home in prestigious neighborhood. Chef\'s kitchen with island, formal dining room, master suite with walk-in closet. Three-car garage and professionally landscaped yard.',
    photos: [
      'https://images.unsplash.com/photo-1566908829907-af9d2c2d3daa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    agent: {
      name: 'Jessica Park',
      phone: '(607) 555-0567',
      email: 'jessica.park@luxuryrealty.com'
    },
    listingDate: '2024-06-26',
    isFavorite: false
  },
  {
    id: '6',
    address: '987 Cedar Court',
    city: 'Utica',
    state: 'NY',
    zipCode: '13501',
    price: 225000,
    bedrooms: 3,
    bathrooms: 1.5,
    squareFootage: 1400,
    propertyType: 'Single Family',
    description: 'Affordable family home with great potential. Large lot with mature trees, original hardwood floors, and spacious rooms. Perfect for first-time buyers or investors.',
    photos: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    agent: {
      name: 'Robert Wilson',
      phone: '(315) 555-0890',
      email: 'robert.wilson@affordablehomes.com'
    },
    listingDate: '2024-06-19',
    isFavorite: false
  }
]

// NY State cities for search suggestions
export const NY_CITIES = [
  'Albany', 'Buffalo', 'Rochester', 'Syracuse', 'Yonkers', 'New Rochelle',
  'Mount Vernon', 'Schenectady', 'Utica', 'White Plains', 'Troy', 'Niagara Falls',
  'Binghamton', 'Freeport', 'Valley Stream', 'Long Beach', 'Rome', 'Ithaca',
  'Watertown', 'Elmira', 'Jamestown', 'Poughkeepsie', 'Middletown', 'Kingston',
  'Newburgh', 'Beacon', 'Saratoga Springs', 'Glens Falls', 'Plattsburgh',
  'Amsterdam', 'Oneonta', 'Cortland', 'Oswego', 'Fulton', 'Gloversville',
  'Batavia', 'Geneva', 'Auburn', 'Oneida', 'Canandaigua', 'Hornell'
]

const RENTCAST_API_KEY = process.env.REACT_APP_RENTCAST_API_KEY
const RENTCAST_BASE_URL = process.env.REACT_APP_RENTCAST_BASE_URL || 'https://api.rentcast.io/v1'
const USE_MOCK_DATA = !RENTCAST_API_KEY || process.env.NODE_ENV === 'development'

export const useRentcastAPI = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Transform Rentcast API response to our format
  const transformRentcastData = (rentcastProperty) => {
    return {
      id: rentcastProperty.id || Math.random().toString(36).substr(2, 9),
      address: rentcastProperty.address || rentcastProperty.formattedAddress,
      city: rentcastProperty.city,
      state: rentcastProperty.state,
      zipCode: rentcastProperty.zipCode,
      price: rentcastProperty.price || rentcastProperty.rentEstimate,
      bedrooms: rentcastProperty.bedrooms,
      bathrooms: rentcastProperty.bathrooms,
      squareFootage: rentcastProperty.squareFootage,
      propertyType: rentcastProperty.propertyType,
      description: rentcastProperty.description || `${rentcastProperty.propertyType} in ${rentcastProperty.city}, NY`,
      photos: rentcastProperty.photos || [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      agent: rentcastProperty.agent || {
        name: 'Contact Agent',
        phone: 'N/A',
        email: 'N/A'
      },
      listingDate: rentcastProperty.listDate || new Date().toISOString().split('T')[0],
      isFavorite: false
    }
  }

  const fetchProperties = async (searchParams = {}) => {
    setLoading(true)
    setError(null)

    try {
      // Always restrict to NY state
      const params = {
        state: 'NY',
        limit: searchParams.limit || 20,
        ...searchParams
      }

      if (USE_MOCK_DATA) {
        console.log('Using mock data - set REACT_APP_RENTCAST_API_KEY for real data')
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Filter mock data based on search params
        let filteredData = [...mockPropertyData]
        
        if (params.city) {
          filteredData = filteredData.filter(property => 
            property.city.toLowerCase().includes(params.city.toLowerCase())
          )
        }

        if (params.maxPrice) {
          filteredData = filteredData.filter(property => property.price <= params.maxPrice)
        }

        if (params.minPrice) {
          filteredData = filteredData.filter(property => property.price >= params.minPrice)
        }

        if (params.minBedrooms) {
          filteredData = filteredData.filter(property => property.bedrooms >= params.minBedrooms)
        }

        if (params.maxBedrooms) {
          filteredData = filteredData.filter(property => property.bedrooms <= params.maxBedrooms)
        }

        if (params.propertyType && params.propertyType !== 'All') {
          filteredData = filteredData.filter(property => property.propertyType === params.propertyType)
        }

        setLoading(false)
        return filteredData

      } else {
        // Real API call to Rentcast
        const response = await axios.get(`${RENTCAST_BASE_URL}/listings/sale`, {
          headers: {
            'X-API-Key': RENTCAST_API_KEY,
            'accept': 'application/json'
          },
          params: {
            state: 'NY',
            limit: params.limit || 20,
            offset: params.offset || 0,
            city: params.city,
            minPrice: params.minPrice,
            maxPrice: params.maxPrice,
            bedrooms: params.minBedrooms,
            propertyType: params.propertyType !== 'All' ? params.propertyType : undefined,
            ...params
          }
        })

        const transformedData = response.data.listings?.map(transformRentcastData) || []
        setLoading(false)
        return transformedData
      }

    } catch (err) {
      console.error('API Error:', err)
      setLoading(false)
      
      // If API fails, fallback to mock data
      if (!USE_MOCK_DATA) {
        console.log('API failed, falling back to mock data')
        setError('Using sample data - API temporarily unavailable')
        return mockPropertyData
      }
      
      setError(err.response?.data?.message || err.message || 'Failed to fetch properties')
      throw err
    }
  }

  const fetchPropertyDetails = async (propertyId) => {
    setLoading(true)
    setError(null)

    try {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const property = mockPropertyData.find(p => p.id === propertyId)
        if (!property) {
          throw new Error('Property not found')
        }
        
        setLoading(false)
        return property

      } else {
        // Real API call to get property details
        const response = await axios.get(`${RENTCAST_BASE_URL}/properties/${propertyId}`, {
          headers: {
            'X-API-Key': RENTCAST_API_KEY,
            'accept': 'application/json'
          }
        })

        const transformedData = transformRentcastData(response.data)
        setLoading(false)
        return transformedData
      }

    } catch (err) {
      console.error('Property Details Error:', err)
      setLoading(false)
      setError(err.response?.data?.message || err.message || 'Failed to fetch property details')
      throw err
    }
  }

  const searchByLocation = async (query) => {
    // For NY state location search
    const nyQuery = `${query}, NY`
    
    return fetchProperties({
      city: query,
      state: 'NY',
      limit: 50
    })
  }

  return {
    loading,
    error,
    fetchProperties,
    fetchPropertyDetails,
    searchByLocation,
    isUsingMockData: USE_MOCK_DATA
  }
} 