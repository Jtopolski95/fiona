# Fiona Real Estate - Deployment Guide

This guide covers deploying the Fiona Real Estate app to Netlify with Rentcast API integration.

## Prerequisites

1. **Rentcast API Account**
   - Sign up at [Rentcast.io](https://rentcast.io)
   - Get your API key from the dashboard
   - Note: The app works with mock data if no API key is provided

2. **GitHub Repository**
   - Fork or clone this repository
   - Push your code to GitHub

3. **Netlify Account**
   - Sign up at [Netlify.com](https://netlify.com)
   - Connect your GitHub account

## Environment Variables Setup

### Local Development

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Add your Rentcast API key to `.env`:
   ```env
   REACT_APP_RENTCAST_API_KEY=your_actual_api_key_here
   REACT_APP_RENTCAST_BASE_URL=https://api.rentcast.io/v1
   REACT_APP_APP_NAME=Fiona Real Estate
   REACT_APP_DEFAULT_STATE=NY
   REACT_APP_DEFAULT_LIMIT=20
   ```

3. Test locally:
   ```bash
   npm install
   npm run dev
   ```

### Production (Netlify)

1. **Deploy to Netlify:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`

2. **Set Environment Variables:**
   - In your Netlify site dashboard, go to **Site settings > Environment variables**
   - Add the following variables:

   | Variable Name | Value | Description |
   |---------------|--------|-------------|
   | `REACT_APP_RENTCAST_API_KEY` | `your_api_key` | Your Rentcast API key |
   | `REACT_APP_RENTCAST_BASE_URL` | `https://api.rentcast.io/v1` | Rentcast API base URL |
   | `REACT_APP_APP_NAME` | `Fiona Real Estate` | App display name |
   | `REACT_APP_DEFAULT_STATE` | `NY` | Default search state |
   | `REACT_APP_DEFAULT_LIMIT` | `20` | Default results limit |

3. **Redeploy:**
   - After adding environment variables, trigger a new deployment
   - Go to **Deploys** tab and click **Trigger deploy**

## Rentcast API Configuration

### API Key Setup

1. **Get Your API Key:**
   - Visit [Rentcast.io](https://rentcast.io)
   - Sign up for an account
   - Navigate to your dashboard
   - Copy your API key

2. **API Endpoints Used:**
   - `GET /v1/listings/sale` - For property listings
   - `GET /v1/properties/{id}` - For property details

3. **Rate Limits:**
   - Check your Rentcast plan for rate limits
   - The app includes error handling and fallback to mock data

### Search Parameters

The app supports these NY-specific search parameters:

- **Location:** Restricted to New York State only
- **City:** Searchable NY cities with autocomplete
- **Price Range:** Min/max price filtering
- **Bedrooms:** Min/max bedroom filtering  
- **Property Type:** Single Family, Condo, Townhouse, Multi Family

## Features

### ✅ Current Features

- **NY State Property Search** with city autocomplete
- **Real-time Rentcast API Integration** with mock data fallback
- **Drag & Drop Property Rankings** 
- **Responsive Mobile Design**
- **West Highland Terrier Theme** (hamburger menu & Fiona page)
- **Netlify Deployment Ready**

### 🔄 API Integration Status

- **Mock Data Mode:** Works without API key for testing
- **Live Data Mode:** Requires valid Rentcast API key
- **Fallback Handling:** Gracefully falls back to mock data if API fails
- **Error Handling:** User-friendly error messages

## Deployment Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Netlify (if using Netlify CLI)
netlify deploy --prod
```

## Troubleshooting

### Common Issues

1. **"Using sample data" message:**
   - Ensure `REACT_APP_RENTCAST_API_KEY` is set in Netlify environment variables
   - Check that the API key is valid and has sufficient quota

2. **Build failures:**
   - Verify all dependencies are in `package.json`
   - Check that Node.js version is 18+ in Netlify settings

3. **API errors:**
   - Verify your Rentcast API key is active
   - Check API rate limits
   - The app will fallback to mock data automatically

4. **Routing issues:**
   - Ensure `netlify.toml` is properly configured with redirects
   - Check that build publishes to `dist` directory

### Testing Deployment

1. **Local Testing:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Production Testing:**
   - Test all search functionality
   - Verify drag & drop rankings work
   - Check mobile responsiveness
   - Confirm API integration (or mock data fallback)

## Security Notes

- API keys are client-side visible (normal for Rentcast public API)
- CORS headers are configured in `netlify.toml`
- All searches are restricted to NY state only
- No sensitive user data is stored

## Support

For deployment issues:
1. Check Netlify deploy logs
2. Verify environment variables are set
3. Test API key with Rentcast directly
4. Review browser console for errors

The app is designed to work reliably with or without the Rentcast API key, making deployment straightforward for testing and production use.

## Next Steps

After deployment:
1. Test the drag & drop functionality on mobile
2. Add your Rentcast API key for real data
3. Customize the property filters for your preferences
4. Share the URL with your wife for house hunting!

Happy house hunting! 🏠 