# Parkudo

**Parkudo** is an app that helps you find parking spots in cities super easily — think Uber, but for parking. Whether you’re cruising downtown or visiting a busy area, Parkudo finds you the nearest available parking spot fast so you don’t waste time circling around.

---

## Features

- Real-time search for nearby parking spots across the city
- Book your spot ahead of time to guarantee parking
- Navigate directly to your reserved spot with map integration
- User profiles and booking history for easy management
- Instant notifications for booking confirmation and updates
- Smooth, fast mobile app built with Expo (React Native)
- Serverless backend powered by Neon (PostgreSQL)

---

## Tech Stack

- **Frontend:** React Native with Expo
- **Backend:** Serverless functions (e.g., Vercel, Netlify Functions, or Cloudflare Workers)
- **Database:** Neon (PostgreSQL)
- **Maps API:** Google Maps / Mapbox
- **Version Control:** Git + GitHub

---

## Installation & Setup

1. Clone the repo:
    ```bash
    git clone https://github.com/ErinAbduli/parkudo.git
    ```
2. Navigate into the project folder:
    ```bash
    cd parkudo
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a .env file:
   `bash
DATABASE_URL=your_neon_database_url
  GOOGLE_MAPS_API_KEY=your_google_maps_api_key
`
5. Start the Expo development server:
    ```bash
    npm start
    ```
6. Run the app on your device:
   `bash
   Download Expo Go from the App Store (iOS) or Google Play (Android).
   Open Expo Go and scan the QR code shown in the terminal or browser.
   The app will load instantly on your phone for live testing.
`
