# API Overview

Base URL: `http://localhost:5000/api`

## Core Routes
- `GET /states`
- `GET /states/:stateSlug`
- `GET /states/:stateSlug/places`
- `GET /places`
- `GET /places/:placeSlug`
- `GET /search?q=...`
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /uploads/images` (admin auth required, multipart field name: `images`)

All responses follow:

```json
{ "success": true, "message": "...", "data": {} }
```
