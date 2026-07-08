# MovieStream

A React + Vite movie and TV show streaming platform with blog, user panel, and comments.

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- React Router 7
- Axios + MockAPI

## Local Development

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_BASE_URL` | Base URL for the MockAPI backend |

## Production Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

### Option 1: Vercel Dashboard

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel auto-detects Vite. Confirm these settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Add environment variable:
   - `VITE_BASE_URL` = `https://67bde069321b883e790e53c8.mockapi.io`
5. Click **Deploy**.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

Set `VITE_BASE_URL` when prompted, or add it in the Vercel project settings after the first deploy.

## Project Structure

```
src/
├── component/
│   ├── Auth/          # Registration
│   ├── Blog/          # Blog pages
│   ├── core/api/      # API layer (axios, auth, courses)
│   ├── layout/        # Header, Footer, Root layout
│   ├── movies/        # Movies listing
│   ├── TVshow/        # TV shows listing
│   └── Userpanel/     # User dashboard & settings
├── App.jsx
└── main.jsx           # Router setup
```
