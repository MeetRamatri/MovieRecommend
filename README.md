# Movies Website

This project is a movies website built using React, offering an intuitive and engaging user experience with features such as:
- **Reusable React components** for better code organization and maintainability.
- **Unlimited scrolling**, allowing users to seamlessly browse through a vast collection of movies.
- **Scroll-to-top button** for easy navigation.
- **Quick access to movie recommendations** via a dedicated button that redirects users to the Movie Recommendation Page.

## Movie Recommendation Page

The recommendation system is designed using machine learning techniques and integrated with Streamlit for a smooth frontend experience. The key features include:

- **Data Preprocessing & Analysis**: Used Exploratory Data Analysis (EDA) techniques along with Pandas and NumPy for structured data preparation.
- **Recommendation Algorithm**: Implemented a Bag of Words model and vectorization to compute similarity between movies.
- **Movie Poster Fetching**: Integrated with an API to fetch and display movie posters dynamically.
- **Pickle Integration**: Utilized Pickle to transfer processed data from a Python notebook to the frontend efficiently.

This project effectively combines React for frontend development and Python-based data science techniques to create a functional and engaging movie recommendation system.

## Running the Project

To run this project, you need to start the Streamlit server and the npm server in separate terminals.

1. **Start the Streamlit server**:
    ```sh
    streamlit run /Users/meetramatri/Desktop/Movies/MovieRecommendation/recomend.py
    ```

2. **Start the npm server**:
    ```sh
    npm run dev
    ```

Now, you can access the movies website and the movie recommendation system.