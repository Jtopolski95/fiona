# Fiona Real Estate App

A mobile-responsive web application for browsing and ranking real estate listings in New York State, named after our beloved dog Fiona.

## Features

- 🏠 **Real Estate Listings**: Browse properties from New York State using the Rentcast API
- 📱 **Mobile-Responsive**: Optimized for mobile devices with touch-friendly interactions
- 🎯 **Drag & Drop Ranking**: Rank your favorite properties by dragging and dropping
- ❤️ **Favorites System**: Mark properties as favorites for easy access
- 🔍 **Smart Filtering**: Filter by price range, property type, and listing date
- 💰 **Mortgage Calculator**: Get estimated monthly payments for each property
- 🎨 **Beautiful UI**: Clean design with royal purple, black, and white color scheme

## Design Specifications

- **Color Palette**: 
  - Royal Purple (#6A4C93) for highlights and selections
  - Black (#000000) for text and outlines
  - White (#FFFFFF) as the primary background
- **Typography**: Modern, mobile-friendly fonts with smooth transitions
- **Animations**: Smooth CSS transitions inspired by the provided CodePen example

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Styled Components
- **Drag & Drop**: @dnd-kit library
- **API Integration**: Axios for HTTP requests
- **Routing**: React Router DOM
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fiona
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Rentcast API key:
   ```
   REACT_APP_RENTCAST_API_KEY=your_actual_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

## API Integration

This app integrates with the Rentcast API to fetch real estate listings. To use real data:

1. Sign up for a Rentcast API account at https://www.rentcast.io/
2. Get your API key from the dashboard
3. Add it to your `.env` file as `REACT_APP_RENTCAST_API_KEY`

Currently, the app uses mock data for development purposes. The `useRentcastAPI` hook contains commented code showing how to integrate with the real API.

## Deployment to Netlify

### Option 1: Connect GitHub Repository

1. Push your code to GitHub
2. Log in to Netlify
3. Click "New site from Git"
4. Connect your GitHub repository
5. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Netlify dashboard
7. Deploy!

### Option 2: Manual Deploy

1. Build the project:
   ```bash
   npm run build
   ```

2. Drag and drop the `dist` folder to Netlify's deploy interface

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Top navigation bar
│   ├── Drawer.jsx      # Side navigation drawer
│   └── PropertyCard.jsx # Individual property listing card
├── pages/              # Page components
│   ├── HomePage.jsx    # Main properties listing page
│   └── FionaPage.jsx   # About page with animated title
├── hooks/              # Custom React hooks
│   └── useRentcastAPI.js # API integration hook
├── services/           # API and external service integrations
├── App.jsx            # Main app component with routing
├── main.jsx           # App entry point
└── index.css          # Global styles and CSS variables
```

## Features in Detail

### Property Listings
- Displays comprehensive property information including photos, price, bedrooms, bathrooms, square footage, and agent details
- Mortgage estimate calculator with 20% down payment assumption
- Responsive grid layout that adapts to different screen sizes

### Drag & Drop Ranking
- Intuitive drag and drop interface for ranking properties
- Visual feedback during dragging with opacity changes
- Automatic rank number updates

### Mobile Optimization
- Touch-friendly interface elements
- Responsive typography and spacing
- Hamburger menu for navigation on smaller screens
- Optimized image loading and display

### Filtering System
- Filter by favorites
- Filter by new listings (within last 7 days)
- Filter by price range (e.g., under $500K)
- Dynamic property count updates

## Future Enhancements

- [ ] Advanced search filters (location, property type, etc.)
- [ ] Property detail pages with image galleries
- [ ] Saved searches and email alerts
- [ ] User authentication and personalized rankings
- [ ] Comparison tool for multiple properties
- [ ] Integration with mortgage lenders for pre-approval
- [ ] Map view with property locations
- [ ] Property history and market analysis

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and intended for personal use.

## Contact

Created with ❤️ for house hunting adventures, inspired by our dog Fiona.
