import { useState } from 'react'
import { Container, Typography, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function MovieRecommendation() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Movie Recommendations
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, alignItems: 'center' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/tmdb-recommendation')}
          sx={{ height: 56 }}
          disabled={loading}
        >
          Go to Movie Recommendations
        </Button>
      </Box>
      
      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
        Click the button above to open our movie recommendation system
      </Typography>
    </Container>
  )
}

export default MovieRecommendation