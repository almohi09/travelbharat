# Local Setup

## Backend
```bash
cd backend
npm install
npm run dev
```

Backend `.env` (required for image uploads via ImageKit):

```env
ADMIN_INVITE_CODE=your_private_invite_code
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
IMAGEKIT_UPLOAD_FOLDER=/travelbharat/places
```

Reference dropdown bootstrap:
- On backend startup, the app now upserts India reference data automatically:
  - 28 states + 8 union territories
  - preloaded city options per state/UT
  - tourism categories used by admin forms
- Seeder code:
  - `backend/src/data/referenceData.js`
  - `backend/src/services/referenceData.service.js`
- Manual seed command:
  - `cd backend && npm run seed:reference`

## Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`  
Backend default URL: `http://localhost:5000`
