# Backend API Proxy Security Fix - Implementation Summary

## Overview

This branch implements a backend API proxy to fix the critical security issue where the Jellyfin admin API key was exposed in the public JavaScript bundle.

## Changes Made

### New Files Created

1. **Backend API Server**

   - `backend/src/server.ts` - Express server setup
   - `backend/src/routes/playback-reporting.ts` - API route handler
   - `backend/src/middleware/auth.ts` - User authentication middleware
   - `backend/src/services/jellyfin-proxy.ts` - Jellyfin API proxy service
   - `backend/package.json` - Backend dependencies
   - `backend/tsconfig.json` - TypeScript configuration

2. **Infrastructure**
   - `start.sh` - Script to run both backend and Apache services

### Files Modified

1. **Frontend Changes**

   - `src/lib/jellyfin-api.ts`

     - Removed `getAdminApiKey()` function
     - Removed `getAdminJellyfinApi()` function
     - Added `getBackendApiUrl()` helper function
     - Admin API key no longer accessible from frontend

   - `src/lib/queries/utils.ts`
     - Updated `playbackReportingSqlRequest()` to call backend API
     - Now uses user auth token instead of admin API key
     - Backend handles admin API key server-side only

2. **Configuration Changes**

   - `apache-config.conf`

     - Removed API key injection from HTML
     - Only injects `JELLYFIN_SERVER_URL` (safe to expose)
     - Optional `BACKEND_API_URL` injection

   - `Dockerfile`

     - Multi-stage build for frontend and backend
     - Installs Node.js for backend runtime
     - Configures Apache proxy to backend API
     - Runs both services via start.sh

   - `docker-compose.yaml`
     - Updated environment variables
     - `JELLYFIN_API_KEY` now backend-only (not exposed to frontend)
     - Added `BACKEND_PORT` and `FRONTEND_URL` variables
     - Enabled build from source

## Security Improvements

### Before

- ❌ Admin API key injected into HTML via Apache
- ❌ API key visible in `window.ENV` object
- ❌ API key sent in request headers from browser
- ❌ Full admin access exposed to anyone accessing the site

### After

- ✅ Admin API key kept server-side only
- ✅ API key never exposed to frontend
- ✅ User authentication validated before proxying requests
- ✅ Only user tokens sent from browser
- ✅ Backend validates user auth before making admin requests

## Architecture

```
Browser → Frontend (React) → Backend API (/api/playback-reporting/query)
                                         ↓
                                    Validates User Token
                                         ↓
                                    Jellyfin Server (with Admin Key)
```

## Environment Variables

### Required

- `JELLYFIN_SERVER_URL` - Jellyfin server URL (can be public)
- `JELLYFIN_API_KEY` - Admin API key (backend only, NOT exposed)

### Optional

- `BACKEND_PORT` - Backend API port (default: 3000)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost)
- `BACKEND_API_URL` - Backend API path (default: /api)

## Testing

1. **Build Backend**

   ```bash
   cd backend
   npm install
   npm run build
   ```

2. **Build Frontend**

   ```bash
   npm install
   npm run build
   ```

3. **Test Locally**

   ```bash
   # Start backend
   cd backend
   npm start

   # In another terminal, start frontend dev server
   npm run dev
   ```

4. **Docker Build**
   ```bash
   docker build -t jellyfin-wrapped .
   docker run -p 80:80 \
     -e JELLYFIN_SERVER_URL=http://your-server:8096 \
     -e JELLYFIN_API_KEY=your-key \
     jellyfin-wrapped
   ```

## Verification Checklist

- [x] Backend API server implemented
- [x] User authentication middleware working
- [x] Frontend updated to use backend API
- [x] Admin API key removed from frontend code
- [x] Apache config updated (no API key injection)
- [x] Dockerfile updated for multi-stage build
- [x] Docker Compose updated with new env vars
- [x] Start script created for both services
- [ ] Manual testing of full flow
- [ ] Security verification (API key not in bundle)
- [ ] Performance testing

## Migration Notes

- **Breaking Change**: This is a breaking change - requires backend deployment
- **User Impact**: Users will need to re-authenticate after deployment
- **Backward Compatibility**: None - old version incompatible
- **Rollback**: Keep previous Docker image tagged for rollback if needed

## Next Steps

1. Test the implementation locally
2. Verify API key is not exposed in browser
3. Test all query endpoints work correctly
4. Deploy to production
5. Monitor logs for any issues
