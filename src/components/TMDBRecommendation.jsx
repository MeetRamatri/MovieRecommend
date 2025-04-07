import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, CircularProgress, Grid, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

function TMDBRecommendation() {
  const [movieTitle, setMovieTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: 'f120db4af47ac2ecb1f068a79a005777',
            language: 'en-US',
            page: 1
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const fetchRecommendations = async () => {
    if (!movieTitle) {
      setError('Please select a movie first.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // First get the movie ID from the selected movie
      const searchResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'f120db4af47ac2ecb1f068a79a005777',
          query: movieTitle,
          language: 'en-US',
          page: 1
        }
      });
      
      if (searchResponse.data.results.length === 0) {
        throw new Error('Movie not found');
      }
      
      const movieId = searchResponse.data.results[0].id;
      
      // Then get recommendations using the movie ID
      const recommendResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, {
        params: {
          api_key: 'f120db4af47ac2ecb1f068a79a005777',
          language: 'en-US',
          page: 1
        }
      });
      
      setRecommendations(recommendResponse.data.results);
    } catch (err) {
      setError(err.message === 'Movie not found' ? 'Movie not found in TMDB database.' : 'Failed to fetch recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        TMDB Movie Recommendations
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <TextField
          select
          label="Select Movie"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          sx={{ mr: 2, minWidth: 200 }}
          SelectProps={{ native: true }}
        >
          <option value="">None</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.title}>
              {movie.title}
            </option>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchRecommendations}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Get Recommendations'}
        </Button>
      </Box>
      {error && <Typography color="error" align="center">{error}</Typography>}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {recommendations.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{ 
                  aspectRatio: '2/3',
                  width: '345px', 
                  height: '345px', 
                  objectFit: 'cover', 
                  borderRadius: '4px', 
                  margin: '0 auto' // Center the image horizontally
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" align="center" noWrap>
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TMDBRecommendation;