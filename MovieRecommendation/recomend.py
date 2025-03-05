import streamlit as st 
import pickle 
import pandas as pd 
import requests

def fetch_poster(movie_id):
    url = "https://api.themoviedb.org/3/movie/{}?api_key=f120db4af47ac2ecb1f068a79a005777&language=en-US".format(movie_id)
    data = requests.get(url)
    data = data.json()
    poster_path = data['poster_path']
    full_path = "https://image.tmdb.org/t/p/w500/" + poster_path
    return full_path


def recommend (movie): 
    movie_index = movies[movies ['title'] == movie].index[0] 
    distances = similarity[movie_index] 
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1]) [1:6] 
    recommended_movies=[] 
    recommended_movies_posters=[]
    for i in movies_list: 
        recommended_movies.append(movies.iloc[i[0]].title)
        recommended_movies_posters.append(fetch_poster(movies.iloc[i[0]].movie_id))
    return recommended_movies, recommended_movies_posters

# Use absolute paths to the pickle files
import os

# Get the directory where the script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Load the pickle files using the full path
movies_dict= pickle.load(open(os.path.join(script_dir, 'movie_dict.pkl'),'rb')) 
movies = pd.DataFrame(movies_dict)
similarity = pickle.load(open(os.path.join(script_dir, 'similarity.pkl'),'rb'))
st.title('Movie Recommender System')
selected_movie = st.selectbox( 
    'Type or select a movie from the dropdown', 
    movies['title'].values)
if st.button('Show Recommendation'):
    recommended_movie_names,recommended_movie_posters = recommend(selected_movie)
    col1, col2, col3, col4, col5 = st.columns(5)
    with col1:
        st.text(recommended_movie_names[0])
        st.image(recommended_movie_posters[0])
    with col2:
        st.text(recommended_movie_names[1])
        st.image(recommended_movie_posters[1])

    with col3:
        st.text(recommended_movie_names[2])
        st.image(recommended_movie_posters[2])
    with col4:
        st.text(recommended_movie_names[3])
        st.image(recommended_movie_posters[3])
    with col5:
        st.text(recommended_movie_names[4])
        st.image(recommended_movie_posters[4])
