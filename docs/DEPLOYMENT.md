# Deployment

## Backend
- Build: `npm install`
- Start: `node server.js`
- Required env: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`

## Frontend
- Build: `npm run build`
- Preview: `npm run preview`
- Required env: `VITE_API_URL`

## Reverse Proxy
Nginx config is available at `infrastructure/nginx/nginx.conf`.
