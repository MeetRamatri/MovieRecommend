# Movies Website

A web application that provides movie recommendations using TMDB data and a custom recommendation system.

## Features

- Browse popular movies
- Get personalized movie recommendations
- Search for specific movies
- View detailed movie information

## Tech Stack

- Frontend: React with Vite
- UI Components: Material-UI
- Movie Data: TMDB API
- Recommendation System: Python (Streamlit)

## Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- npm or yarn package manager

## Installation

1. Clone the repository
2. Install frontend dependencies:
   ```sh
   npm install
   ```
3. Install Python dependencies:
   ```sh
   pip install streamlit pandas numpy scikit-learn
   ```

## Running the Project

To run this project, you need to start both the frontend and backend servers:

1. **Start the frontend development server**:
   ```sh
   npm run dev
   ```
   The frontend will be available at http://localhost:5173

2. **Start the recommendation system server**:
   ```sh
   streamlit run MovieRecommendation/recomend.py
   ```
   The Streamlit server will be available at http://localhost:8501

## Deployment

This project is configured for deployment on Netlify:

1. The frontend is automatically built using `npm run build`
2. Static files are served from the `dist` directory
3. All routes are redirected to `index.html` for SPA functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details.