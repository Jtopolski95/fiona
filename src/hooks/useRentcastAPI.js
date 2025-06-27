import { useState } from 'react'

// NY Cities for autocomplete
export const NY_CITIES = [
  'Albany', 'Binghamton', 'Buffalo', 'Elmira', 'Glens Falls', 'Ithaca', 'Jamestown',
  'Kingston', 'New York', 'Newburgh', 'Niagara Falls', 'Oneonta', 'Plattsburgh',
  'Poughkeepsie', 'Rochester', 'Rome', 'Saratoga Springs', 'Schenectady', 'Syracuse',
  'Troy', 'Utica', 'Watertown', 'White Plains', 'Yonkers', 'Bronx', 'Brooklyn',
  'Manhattan', 'Queens', 'Staten Island', 'Long Island', 'Hempstead', 'Levittown',
  'Freeport', 'Valley Stream', 'Hicksville', 'Massapequa', 'Huntington', 'Smithtown',
  'Babylon', 'Islip', 'Oyster Bay', 'North Hempstead', 'Brookhaven', 'Southampton'
]

// Mock data for development/testing
const MOCK_PROPERTIES = [
  {
    id: 1,
    address: '123 Mountain View Dr',
    city: 'Albany',
    state: 'NY',
    zipCode: '12203',
    price: 425000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFootage: 2100,
    propertyType: 'Single Family',
    description: 'Beautiful colonial home with mountain views, updated kitchen, and spacious backyard. Perfect for families looking for suburban comfort with easy access to downtown Albany.',
    photos: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    agent: {
      name: 'Sarah Johnson',
      phone: '(518) 555-0123',
      email: 'sarah.johnson@albanyhomes.com'
    }
  },
  {
    id: 2,
    address: '456 Lakeside Ave',
    city: 'Syracuse',
    state: 'NY',
    zipCode: '13210',
    price: 315000,
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 2400,
    propertyType: 'Single Family',
    description: 'Stunning lakefront property with private dock, open floor plan, and panoramic water views. Recently renovated with modern amenities while maintaining classic charm.',
    photos: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    agent: {
      name: 'Michael Chen',
      phone: '(315) 555-0456',
      email: 'michael.chen@lakehomes.com'
    }
  },
  {
    id: 3,
    address: '789 Historic District Ln',
    city: 'Saratoga Springs',
    state: 'NY',
    zipCode: '12866',
    price: 650000,
    bedrooms: 5,
    bathrooms: 4,
    squareFootage: 3200,
    propertyType: 'Victorian',
    description: 'Magnificent Victorian mansion in the heart of historic Saratoga Springs. Original hardwood floors, ornate moldings, and modern updates throughout. Walking distance to downtown and the famous racetrack.',
    photos: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    agent: {
      name: 'Emily Rodriguez',
      phone: '(518) 555-0789',
      email: 'emily.rodriguez@historichomes.com'
    }
  },
  {
    id: 4,
    address: '321 Riverside Pkwy',
    city: 'Rochester',
    state: 'NY',
    zipCode: '14607',
    price: 285000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1800,
    propertyType: 'Condo',
    description: 'Modern riverside condominium with floor-to-ceiling windows, granite countertops, and stunning river views. Building amenities include fitness center, rooftop deck, and concierge service.',
    photos: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154084-fb2fb2ed8d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    agent: {
      name: 'David Park',
      phone: '(585) 555-0321',
      email: 'david.park@rochestercondos.com'
    }
  },
  {
    id: 5,
    address: '654 Country Club Dr',
    city: 'Buffalo',
    state: 'NY',
    zipCode: '14221',
    price: 475000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFootage: 2800,
    propertyType: 'Single Family',
    description: 'Elegant home on prestigious Country Club Drive. Features include chef\'s kitchen, master suite with spa bath, three-car garage, and beautifully landscaped grounds.',
    photos: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    agent: {
      name: 'Lisa Thompson',
      phone: '(716) 555-0654',
      email: 'lisa.thompson@buffalohomes.com'
    }
  },
  {
    id: 6,
    address: '987 University Heights',
    city: 'Ithaca',
    state: 'NY',
    zipCode: '14850',
    price: 395000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFootage: 2000,
    propertyType: 'Townhouse',
    description: 'Contemporary townhouse near Cornell University with open concept living, private patio, and mountain views. Perfect for academics or young professionals seeking modern living.',
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    agent: {
      name: 'Robert Kim',
      phone: '(607) 555-0987',
      email: 'robert.kim@ithacahomes.com'
    }
  }
]

export const useRentcastAPI = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProperties = async (params = {}) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API delay for realistic testing
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Return mock data (simulating API response)
      let filteredProperties = [...MOCK_PROPERTIES]
      
      // Apply filters to mock data
      if (params.city) {
        filteredProperties = filteredProperties.filter(property => 
          property.city.toLowerCase().includes(params.city.toLowerCase())
        )
      }
      
      if (params.minPrice) {
        filteredProperties = filteredProperties.filter(property => 
          property.price >= params.minPrice
        )
      }
      
      if (params.maxPrice) {
        filteredProperties = filteredProperties.filter(property => 
          property.price <= params.maxPrice
        )
      }
      
      if (params.minBedrooms) {
        filteredProperties = filteredProperties.filter(property => 
          property.bedrooms >= params.minBedrooms
        )
      }
      
      if (params.propertyType && params.propertyType !== 'All') {
        filteredProperties = filteredProperties.filter(property => 
          property.propertyType === params.propertyType
        )
      }

      // Simulate pagination
      const limit = params.limit || 10
      const offset = params.offset || 0
      const paginatedProperties = filteredProperties.slice(offset, offset + limit)
      
      return paginatedProperties

    } catch (err) {
      console.error('Error fetching properties:', err)
      setError('Failed to fetch properties. Using sample data.')
      // Return mock data as fallback
      return MOCK_PROPERTIES
    } finally {
      setLoading(false)
    }
  }

  const fetchPropertyDetails = async (propertyId) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const property = MOCK_PROPERTIES.find(p => p.id === propertyId)
      if (!property) {
        throw new Error('Property not found')
      }
      
      return property

    } catch (err) {
      console.error('Property Details Error:', err)
      setError(err.message || 'Failed to fetch property details')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const searchByLocation = async (query) => {
    // For NY state location search
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
    isUsingMockData: true // Always true now for testing
  }
} 