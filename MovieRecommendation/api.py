from flask import Flask, request, jsonify
import pickle
import pandas as pd
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the movie data and similarity matrix
try:
    movies_dict = pickle.load(open('movie_dict.pkl', 'rb'))
    movies = pd.DataFrame(movies_dict)
    similarity = pickle.load(open('similarity.pkl', 'rb'))
except Exception as e:
    print(f"Error loading data: {e}")

def fetch_poster(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=f120db4af47ac2ecb1f068a79a005777&language=en-US"
    data = requests.get(url)
    data = data.json()
    poster_path = data['poster_path']
    full_path = "https://image.tmdb.org/t/p/w500/" + poster_path
    return full_path

def recommend(movie):
    try:
        movie_index = movies[movies['title'] == movie].index[0]
        distances = similarity[movie_index]
        movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
        
        recommended_movies = []
        recommended_movies_posters = []
        
        for i in movies_list:
            movie_id = movies.iloc[i[0]].movie_id
            recommended_movies.append({
                'title': movies.iloc[i[0]].title,
                'poster': fetch_poster(movie_id)
            })
            
        return recommended_movies
    except Exception as e:
        print(f"Error in recommendation: {e}")
        return []

@app.route('/api/movies', methods=['GET'])
def get_movies():
    # Return a list of all movie titles for the dropdown
    return jsonify({
        'movies': movies['title'].tolist()
    })

@app.route('/api/recommend', methods=['POST'])
def get_recommendations():
    data = request.json
    movie_title = data.get('movie')
    
    if not movie_title:
        return jsonify({'error': 'No movie title provided'}), 400
    
    # Check if movie exists in our dataset
    if movie_title not in movies['title'].values:
        return jsonify({'error': 'Movie not found in database'}), 404
    
    recommendations = recommend(movie_title)
    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True, port=5000)