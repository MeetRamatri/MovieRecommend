import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box, CircularProgress, Button, Fab, AppBar, Toolbar } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import MovieRecommendation from './components/MovieRecommendation'
import './animations.css'
import TMDBRecommendation from './components/TMDBRecommendation';

function Home() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const observer = useRef()
  const lastMovieElementRef = useRef()

  const fetchMovies = async (pageNum) => {
    try {
      setLoading(true)
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
          api_key: 'f120db4af47ac2ecb1f068a79a005777',
          language: 'en-US',
          page: pageNum
        }
      })
      
      const newMovies = response.data.results
      if (newMovies.length === 0) {
        setHasMore(false)
      } else {
        setMovies(prevMovies => [...prevMovies, ...newMovies])
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching movies:', error)
      setLoading(false)
    }
  }

  const refreshMovies = () => {
    setMovies([])
    setPage(1)
    setHasMore(true)
  }

  const lastMovieRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1)
      }
    }, { threshold: 0.5 })
    
    if (node) observer.current.observe(node)
  }, [loading, hasMore])
  
  useEffect(() => {
    fetchMovies(page)
  }, [page])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


  const getRowDirection = (index) => {
    const rowNumber = Math.floor(index / 4)
    return rowNumber % 2 === 1 ? 'ltr' : 'rtl'
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        TMDB Movie Database
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => navigate('/recommendations')}
          sx={{ mb: 2 }}
        >
          Go to Movie Recommendations
        </Button>
      </Box>
      <Grid container spacing={3}>
        {Array.from({ length: Math.ceil(movies.length / 4) }).map((_, rowIndex) => {
          const rowMovies = movies.slice(rowIndex * 4, (rowIndex + 1) * 4)
          const isReverseRow = rowIndex % 2 === 1

          return (
            <Grid
              container
              item
              key={rowIndex}
              spacing={3}
              className={isReverseRow ? 'row-even-animation' : 'row-odd-animation'}
              sx={{
                flexDirection: isReverseRow ? 'row-reverse' : 'row',
                width: '100%'
              }}
            >
              {rowMovies.map((movie, index) => {
                const isLastMovie = rowIndex * 4 + index === movies.length - 1
                
                return (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  lg={3} 
                  key={movie.id} 
                  ref={isLastMovie ? lastMovieRef : null}
                >
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      boxShadow: 3,
                      borderRadius: 2,
                      maxHeight: '400px',
                    }}
                    className="movie-card-animation"
                  >
                    <CardMedia
                          component="img"
                          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          sx={{ 
                        aspectRatio: '2/3', 
                        objectFit: 'cover',
                        borderRadius: '4px',
                        width: '345px',
                        height: '345px' // Adjust height for better fit
                      }}
                  />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h2">
                        {movie.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
              })}
            </Grid>
          )
        })}
      </Grid>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!hasMore && movies.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography variant="body1" color="textSecondary">
            No more movies to load
          </Typography>
        </Box>
      )}

      {}
      {showBackToTop && (
        <Fab 
          color="primary" 
          size="medium" 
          aria-label="back to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </Container>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendations" element={<MovieRecommendation />} />
        <Route path="/tmdb-recommendation" element={<TMDBRecommendation />} />
      </Routes>
    </Router>
  )
}

export default App
