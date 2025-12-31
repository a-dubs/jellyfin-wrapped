# Local Testing Guide

Quick guide to test Jellyfin Wrapped locally on your laptop with the new backend API proxy.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Access to your Jellyfin server
- Jellyfin admin API key

## Quick Setup

### 1. Clone Your Fork

```bash
git clone https://github.com/a-dubs/jellyfin-wrapped.git
cd jellyfin-wrapped
git checkout backend-api-proxy-security-fix
```

### 2. Set Up Environment Variables

Create a `.env` file in the project root:

```bash
# Frontend (development)
VITE_JELLYFIN_SERVER_URL=http://your-jellyfin-server:8096

# Backend (create backend/.env)
# Note: Backend needs its own .env file!
```

**Important**: The backend runs separately and needs its own environment variables. Create `backend/.env`:

```bash
# Backend environment variables
JELLYFIN_SERVER_URL=http://your-jellyfin-server:8096
JELLYFIN_API_KEY=your-admin-api-key-here
BACKEND_PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 3. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 4. Start Backend Server

In one terminal:

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:3000` and watch for changes.

### 5. Start Frontend Development Server

In another terminal:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is busy).

### 6. Test the Application

1. Open `http://localhost:5173` in your browser
2. Enter your Jellyfin server URL if prompted
3. Log in with your Jellyfin credentials
4. Verify that statistics load correctly

## Verification Checklist

- [ ] Backend server starts without errors
- [ ] Frontend connects to backend API
- [ ] You can log in with Jellyfin credentials
- [ ] Statistics pages load correctly
- [ ] No API key visible in browser DevTools
- [ ] Network requests go to `/api/playback-reporting/query` (not directly to Jellyfin)

## Troubleshooting

### Backend won't start

- Check that `backend/.env` exists with `JELLYFIN_SERVER_URL` and `JELLYFIN_API_KEY`
- Verify Node.js version: `node --version` (should be 18+)
- Check backend logs for errors

### Frontend can't connect to backend

- Verify backend is running on port 3000
- Check browser console for CORS errors
- Verify `FRONTEND_URL` in `backend/.env` matches frontend URL
- Check network tab - requests should go to `/api/playback-reporting/query`

### API key still visible in browser

- Verify you're on the `backend-api-proxy-security-fix` branch
- Check that `apache-config.conf` doesn't inject API key
- Verify backend is running and handling requests
- Check browser DevTools → Network → Headers (should see `X-User-Auth-Token`, not admin API key)

### Build errors

```bash
# Clean and reinstall
rm -rf node_modules backend/node_modules
npm install
cd backend && npm install && cd ..
```

## Testing Security Fix

### Verify API Key is NOT Exposed

1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `window.ENV`
4. **Should NOT contain `JELLYFIN_API_KEY`** ✅
5. Should only show `JELLYFIN_SERVER_URL` (if set)

### Verify Network Requests

1. Open DevTools → Network tab
2. Filter by "playback-reporting"
3. Click on a request
4. Check Request Headers
5. **Should see `X-User-Auth-Token`** (user token) ✅
6. **Should NOT see admin API key** ✅

### Verify Backend is Handling Requests

1. Check backend terminal logs
2. Should see requests logged: `POST /api/playback-reporting/query`
3. Should see successful responses

## Environment Variables Reference

### Frontend (.env)

```bash
# Optional: Jellyfin server URL (can also be entered in UI)
VITE_JELLYFIN_SERVER_URL=http://your-server:8096

# Note: VITE_JELLYFIN_API_KEY is NO LONGER NEEDED!
# The API key is handled by the backend only.
```

### Backend (backend/.env)

```bash
# Required: Jellyfin server URL
JELLYFIN_SERVER_URL=http://your-server:8096

# Required: Admin API key (server-side only!)
JELLYFIN_API_KEY=your-admin-api-key-here

# Optional: Backend port (default: 3000)
BACKEND_PORT=3000

# Optional: Frontend URL for CORS (default: http://localhost:5173)
FRONTEND_URL=http://localhost:5173
```

## Quick Test Script

Create a test script to verify everything works:

```bash
# test-setup.sh
#!/bin/bash

echo "Checking Node.js version..."
node --version

echo "Checking if backend .env exists..."
if [ -f "backend/.env" ]; then
  echo "✅ backend/.env exists"
else
  echo "❌ backend/.env missing - create it!"
fi

echo "Checking dependencies..."
if [ -d "node_modules" ]; then
  echo "✅ Frontend dependencies installed"
else
  echo "❌ Frontend dependencies missing - run npm install"
fi

if [ -d "backend/node_modules" ]; then
  echo "✅ Backend dependencies installed"
else
  echo "❌ Backend dependencies missing - run cd backend && npm install"
fi

echo "Done!"
```

## Next Steps After Testing

Once local testing is successful:

1. Build Docker image: `docker build -t jellyfin-wrapped .`
2. Test Docker container locally
3. Deploy to your server
4. Create PR to upstream repository if desired

## Getting Your Jellyfin API Key

1. Log into Jellyfin server as administrator
2. Go to **Dashboard** → **API Keys**
3. Click **"+"** to create new API key
4. Name it (e.g., "Jellyfin Wrapped - Local Testing")
5. Copy the generated key
6. Add to `backend/.env` as `JELLYFIN_API_KEY`
