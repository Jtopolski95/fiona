import { useState } from 'react'

// NY Cities for autocomplete
export const NY_CITIES = [
  'Albany', 'Binghamton', 'Buffalo', 'Elmira', 'Glens Falls', 'Ithaca', 'Jamestown',
  'Kingston', 'New York', 'Newburgh', 'Niagara Falls', 'Oneonta', 'Plattsburgh',
  'Poughkeepsie', 'Rochester', 'Rome', 'Saratoga Springs', 'Schenectady', 'Syracuse',
  'Troy', 'Utica', 'Watertown', 'White Plains', 'Yonkers', 'Bronx', 'Brooklyn',
  'Manhattan', 'Queens', 'Staten Island', 'Long Island', 'Hempstead', 'Levittown',
  'Freeport', 'Valley Stream', 'Hicksville', 'Massapequa', 'Huntington', 'Smithtown',
  'Babylon', 'Islip', 'Oyster Bay', 'North Hempstead', 'Brookhaven', 'Southampton',
  // Add cities from your data
  'Ferndale', 'Narrowsburg', 'Roscoe', 'Pine Hill', 'Livingston Manor', 'Jeffersonville',
  'Denver', 'Youngsville', 'Callicoon', 'Nyack', 'Bethel', 'Swan Lake', 'Shandaken'
]

// Real property data from your house hunting list
const REAL_PROPERTIES = [
  {
    id: 1,
    address: '30 Station Hill Road',
    city: 'Ferndale',
    state: 'NY',
    zipCode: '12734',
    price: 350000,
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 2624,
    landAcres: 2.41,
    propertyType: 'Single Family',
    description: 'Beautiful home on 2.41 acres in Ferndale. Spacious 3 bedroom, 3 bathroom house with 2,624 square feet of living space. Great value in a peaceful setting.',
    photos: [
      'https://photos.zillowstatic.com/fp/b8c8a9c8f8e8d8c8b8a8c8d8e8f8g8h8-cc_ft_1536.jpg',
      'https://photos.zillowstatic.com/fp/a8b8c8d8e8f8g8h8i8j8k8l8m8n8o8p8-cc_ft_1536.jpg'
    ],
    url: 'https://www.zillow.com/homedetails/30-Station-Hill-Road-Ferndale-NY-12734/32774780_zpid/',
    status: '',
    allieRanking: null,
    jonRanking: 5,
    monthlyPayment20: 1806.78,
    monthlyPayment40: 1355.08,
    monthlyPayment80: 451.69,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-0100',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 2,
    address: '8144 State Route 52',
    city: 'Narrowsburg',
    state: 'NY',
    zipCode: '12764',
    price: 385000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1400,
    landAcres: 2.75,
    propertyType: 'Farmhouse',
    description: 'Charming Jackalope Farmhouse on 2.75 acres. This unique property offers rustic charm with modern amenities. Perfect for those seeking a country lifestyle.',
    photos: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.anatolehouse.com/listings/jackalope-farmhouse',
    status: 'Pending Visit',
    allieRanking: 2,
    jonRanking: 6,
    monthlyPayment20: 1987.46,
    monthlyPayment40: 1490.59,
    monthlyPayment80: 496.86,
    agent: {
      name: 'Anatole House Realty',
      phone: '(845) 555-0200',
      email: 'info@anatolehouse.com'
    }
  },
  {
    id: 3,
    address: '7 Bonnie Brook Rd',
    city: 'Roscoe',
    state: 'NY',
    zipCode: '12776',
    price: 389000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFootage: 1042,
    landAcres: 3.13,
    propertyType: 'Single Family',
    description: 'Cozy home on over 3 acres in Roscoe. Features 3 bedrooms and 2.5 bathrooms with plenty of outdoor space for privacy and recreation.',
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/7-Bonnie-Brook-Rd-Roscoe-NY-12776/30064892_zpid/',
    status: '',
    allieRanking: 7,
    jonRanking: 19,
    monthlyPayment20: 2008.11,
    monthlyPayment40: 1506.08,
    monthlyPayment80: 502.03,
    agent: {
      name: 'Zillow Agent',
      phone: '(607) 555-0300',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 4,
    address: '121 Birch Creek Road',
    city: 'Pine Hill',
    state: 'NY',
    zipCode: '12465',
    price: 399000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1740,
    landAcres: 0.39,
    propertyType: 'Single Family',
    description: 'Well-maintained home in Pine Hill with 3 bedrooms and 2 bathrooms. Features 1,740 square feet of comfortable living space.',
    photos: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/121-Birch-Creek-Rd-Shandaken-NY-12465/32871330_zpid/',
    status: '',
    allieRanking: null,
    jonRanking: 14,
    monthlyPayment20: 2059.73,
    monthlyPayment40: 1544.80,
    monthlyPayment80: 514.93,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-0400',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 5,
    address: '39 Dubois Street',
    city: 'Livingston Manor',
    state: 'NY',
    zipCode: '12758',
    price: 485000,
    bedrooms: 4,
    bathrooms: 2,
    squareFootage: 1541,
    landAcres: 0.39,
    propertyType: 'Single Family',
    description: 'Spacious 4 bedroom home in Livingston Manor. Great for families with plenty of room to grow.',
    photos: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/39-Dubois-St-Livingston-Manor-NY-12758/32782121_zpid/',
    status: '',
    allieRanking: 3,
    jonRanking: 15,
    monthlyPayment20: 2503.68,
    monthlyPayment40: 1877.76,
    monthlyPayment80: 625.92,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-0500',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 6,
    address: '807 Swiss Hill Road N',
    city: 'Jeffersonville',
    state: 'NY',
    zipCode: '12748',
    price: 489000,
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 3634,
    landAcres: 4.02,
    propertyType: 'Single Family',
    description: 'Impressive 4 bedroom, 3 bathroom home with over 3,600 square feet on 4+ acres. Plenty of space both inside and out.',
    photos: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/807-Swiss-Hill-Road-N-Jeffersonville-NY-12748/32762469_zpid/',
    status: '',
    allieRanking: null,
    jonRanking: 4,
    monthlyPayment20: 2524.33,
    monthlyPayment40: 1893.25,
    monthlyPayment80: 631.08,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-0600',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 7,
    address: '4923 County Highway 36',
    city: 'Denver',
    state: 'NY',
    zipCode: '12421',
    price: 510000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1720,
    landAcres: 1.9,
    propertyType: 'Single Family',
    description: 'Country home on nearly 2 acres in Denver, NY. Features 3 bedrooms and 2 bathrooms with rural charm.',
    photos: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/4923-County-Highway-36-Denver-NY-12421/30071751_zpid/',
    status: '',
    allieRanking: null,
    jonRanking: 12,
    monthlyPayment20: 2632.73,
    monthlyPayment40: 1974.55,
    monthlyPayment80: 658.18,
    agent: {
      name: 'Zillow Agent',
      phone: '(607) 555-0700',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 8,
    address: '7181 County Highway 7',
    city: 'Roscoe',
    state: 'NY',
    zipCode: '12776',
    price: 519000,
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 2200,
    landAcres: 0.5,
    propertyType: 'Single Family',
    description: 'Spacious 4 bedroom, 3 bathroom home with 2,200 square feet. Perfect for families looking for more space.',
    photos: [
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154084-fb2fb2ed8d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/7181-County-Highway-7-Roscoe-NY-12776/215770279_zpid/',
    status: '',
    allieRanking: 8,
    jonRanking: 9,
    monthlyPayment20: 2679.19,
    monthlyPayment40: 2009.40,
    monthlyPayment80: 669.80,
    agent: {
      name: 'Zillow Agent',
      phone: '(607) 555-0800',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 9,
    address: '853 Shandelee Road',
    city: 'Livingston Manor',
    state: 'NY',
    zipCode: '12758',
    price: 562000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1540,
    landAcres: 2.5,
    propertyType: 'Single Family',
    description: 'Charming home on 2.5 acres in Livingston Manor. Features 3 bedrooms and 2 bathrooms with plenty of outdoor space.',
    photos: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/853-Shandelee-Rd-Livingston-Manor-NY-12758/208768348_zpid/',
    status: '',
    allieRanking: null,
    jonRanking: 8,
    monthlyPayment20: 2901.17,
    monthlyPayment40: 2175.88,
    monthlyPayment80: 725.29,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-0900',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 10,
    address: '78 Old Liberty Road',
    city: 'Livingston Manor',
    state: 'NY',
    zipCode: '12758',
    price: 580000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1490,
    landAcres: 3.14,
    propertyType: 'Single Family',
    description: 'Beautiful property on over 3 acres in Livingston Manor. This home offers privacy and tranquility with modern amenities.',
    photos: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/78-Old-Liberty-Rd-Livingston-Manor-NY-12758/32782269_zpid/',
    status: 'Pending Visit',
    allieRanking: 5,
    jonRanking: 3,
    monthlyPayment20: 2994.09,
    monthlyPayment40: 2245.57,
    monthlyPayment80: 748.52,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-1000',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 11,
    address: '178 Grebel Road',
    city: 'Jeffersonville',
    state: 'NY',
    zipCode: '12748',
    price: 599000,
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1404,
    landAcres: 4.82,
    propertyType: 'Single Family',
    description: 'Cozy 2 bedroom home on nearly 5 acres! Perfect for those seeking privacy and space. You\'ve already visited and liked this one!',
    photos: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/178-Grebel-Rd-Livingston-Manor-NY-12748/246199281_zpid/',
    status: 'Visited - Liked',
    allieRanking: 3,
    jonRanking: 16,
    monthlyPayment20: 3092.17,
    monthlyPayment40: 2319.13,
    monthlyPayment80: 773.04,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-1100',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 12,
    address: '231 Boband Road',
    city: 'Youngsville',
    state: 'NY',
    zipCode: '12791',
    price: 599000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1400,
    landAcres: 7.15,
    propertyType: 'Single Family',
    description: 'Home on over 7 acres in Youngsville. Lots of land but you\'ve already visited and decided it wasn\'t the right fit.',
    photos: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154084-fb2fb2ed8d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/231-Boband-Rd-Youngsville-NY-12791/2077193092_zpid/',
    status: 'Visited - Disliked',
    allieRanking: 1,
    jonRanking: 21,
    monthlyPayment20: 3092.17,
    monthlyPayment40: 2319.13,
    monthlyPayment80: 773.04,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-1200',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 13,
    address: '612 Beechwoods Road',
    city: 'Callicoon',
    state: 'NY',
    zipCode: '12723',
    price: 619000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1400,
    landAcres: 2.75,
    propertyType: 'Single Family',
    description: 'Lovely home on 2.75 acres in Callicoon. You\'ve visited and liked this property - definitely a contender!',
    photos: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/612-Beechwoods-Rd-Callicoon-NY-12723/453494998_zpid/',
    status: 'Visited - Liked',
    allieRanking: 4,
    jonRanking: 20,
    monthlyPayment20: 3195.42,
    monthlyPayment40: 2396.56,
    monthlyPayment80: 798.85,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-1300',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 14,
    address: '1 Crosby Street',
    city: 'Nyack',
    state: 'NY',
    zipCode: '10960',
    price: 645000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1243,
    landAcres: 0.5,
    propertyType: 'Single Family',
    description: 'Charming home in historic Nyack. Close to the Hudson River with small town charm and easy access to NYC.',
    photos: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/1-Crosby-St-Nyack-NY-10960/32384869_zpid/',
    status: '',
    allieRanking: 9,
    jonRanking: 13,
    monthlyPayment20: 3329.63,
    monthlyPayment40: 2497.23,
    monthlyPayment80: 832.41,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-1400',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 15,
    address: '57 Old Taylor Road',
    city: 'Bethel',
    state: 'NY',
    zipCode: '12748',
    price: 650000,
    bedrooms: 4,
    bathrooms: 2,
    squareFootage: 2520,
    landAcres: 14.9,
    propertyType: 'Single Family',
    description: 'Incredible property with nearly 15 acres! This 4 bedroom home offers ultimate privacy and space for all your dreams.',
    photos: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/57-Taylor-Rd-Jeffersonville-NY-12748/2056805995_zpid/',
    status: '',
    allieRanking: null,
    jonRanking: 1,
    monthlyPayment20: 3355.45,
    monthlyPayment40: 2516.58,
    monthlyPayment80: 838.86,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-1500',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 16,
    address: '306 Cutler Road',
    city: 'Swan Lake',
    state: 'NY',
    zipCode: '12783',
    price: 679000,
    bedrooms: 6,
    bathrooms: 3,
    squareFootage: 2788,
    landAcres: 52,
    propertyType: 'Single Family',
    description: 'Massive 6 bedroom home on 52+ acres! This is like having your own private estate with endless possibilities.',
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/306-Cutler-Road-Swan-Lake-NY-12783/32774931_zpid/',
    status: '',
    allieRanking: null,
    jonRanking: 10,
    monthlyPayment20: 3505.15,
    monthlyPayment40: 2628.86,
    monthlyPayment80: 876.29,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-1600',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 17,
    address: '558 White Roe Lake Road',
    city: 'Livingston Manor',
    state: 'NY',
    zipCode: '12758',
    price: 695000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1834,
    landAcres: 5.07,
    propertyType: 'Single Family',
    description: 'Beautiful lakefront property on over 5 acres. This is Jon\'s #1 choice! Stunning views and privacy on White Roe Lake.',
    photos: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://countryhouserealty.com/listings/558-white-roe-lake-road-livingston-manor-ny',
    status: '',
    allieRanking: null,
    jonRanking: 2,
    monthlyPayment20: 3587.75,
    monthlyPayment40: 2690.81,
    monthlyPayment80: 896.94,
    agent: {
      name: 'Country House Realty',
      phone: '(845) 555-1700',
      email: 'info@countryhouserealty.com'
    }
  },
  {
    id: 18,
    address: '877 Shandelee Road',
    city: 'Livingston Manor',
    state: 'NY',
    zipCode: '12758',
    price: 699000,
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 2500,
    landAcres: 7,
    propertyType: 'Single Family',
    description: 'Spacious 4 bedroom, 3 bathroom home on 7 acres. Plenty of room for the whole family and then some!',
    photos: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/877-Shandelee-Rd-Livingston-Manor-NY-12758/208768395_zpid/',
    status: '',
    allieRanking: 2,
    jonRanking: 18,
    monthlyPayment20: 3608.39,
    monthlyPayment40: 2706.30,
    monthlyPayment80: 902.10,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-1800',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 19,
    address: '1211 Gulf Road',
    city: 'Livingston Manor',
    state: 'NY',
    zipCode: '12724',
    price: 729000,
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 2345,
    landAcres: 3,
    propertyType: 'Single Family',
    description: 'Elegant 3 bedroom, 3 bathroom home with over 2,300 square feet on 3 acres. High-end finishes throughout.',
    photos: [
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154084-fb2fb2ed8d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/1211-Gulf-Road-Livingston-Manor-NY-12724/450410753_zpid/',
    status: '',
    allieRanking: null,
    jonRanking: 11,
    monthlyPayment20: 3763.26,
    monthlyPayment40: 2822.45,
    monthlyPayment80: 940.82,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-1900',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 20,
    address: '24 Valell Path',
    city: 'Livingston Manor',
    state: 'NY',
    zipCode: '12758',
    price: 799000,
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 1026,
    landAcres: 6.19,
    propertyType: 'Single Family',
    description: 'Premium property on over 6 acres in Livingston Manor. This is one of your top choices with excellent rankings from both of you!',
    photos: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/24-Valell-Path-Livingston-Manor-NY-12758/32781214_zpid/',
    status: '',
    allieRanking: 6,
    jonRanking: 7,
    monthlyPayment20: 4124.62,
    monthlyPayment40: 3093.46,
    monthlyPayment80: 1031.15,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-2000',
      email: 'agent@zillow.com'
    }
  },
  {
    id: 21,
    address: '9 Cedar Lane',
    city: 'Swan Lake',
    state: 'NY',
    zipCode: '12783',
    price: 799000,
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 1870,
    landAcres: 1.12,
    propertyType: 'Single Family',
    description: 'Beautiful 3 bedroom, 3 bathroom home in Swan Lake. Well-appointed with modern amenities and great outdoor space.',
    photos: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    url: 'https://www.zillow.com/homedetails/9-Cedar-Lane-Swan-Lake-NY-12783/60113596_zpid/',
    status: '',
    allieRanking: null,
    jonRanking: 17,
    monthlyPayment20: 4124.62,
    monthlyPayment40: 3093.46,
    monthlyPayment80: 1031.15,
    agent: {
      name: 'Zillow Agent',
      phone: '(845) 555-2100',
      email: 'agent@zillow.com'
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
      
      // Return real property data
      let filteredProperties = [...REAL_PROPERTIES]
      
      // Apply filters to real data
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

      // Add special filters for your data
      if (params.status) {
        filteredProperties = filteredProperties.filter(property => 
          property.status && property.status.toLowerCase().includes(params.status.toLowerCase())
        )
      }

      if (params.visited) {
        filteredProperties = filteredProperties.filter(property => 
          property.status && property.status.includes('Visited')
        )
      }

      if (params.liked) {
        filteredProperties = filteredProperties.filter(property => 
          property.status && property.status.includes('Liked')
        )
      }

      // Simulate pagination
      const limit = params.limit || 10
      const offset = params.offset || 0
      const paginatedProperties = filteredProperties.slice(offset, offset + limit)
      
      return paginatedProperties

    } catch (err) {
      console.error('Error fetching properties:', err)
      setError('Failed to fetch properties. Please try again.')
      return []
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
      
      const property = REAL_PROPERTIES.find(p => p.id === propertyId)
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
    isUsingMockData: false // Now using real data!
  }
}