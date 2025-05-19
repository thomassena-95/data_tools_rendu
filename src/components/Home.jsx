import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Button, 
  Typography, 
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import apiService from '../services/api';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const [jokeDialogOpen, setJokeDialogOpen] = useState(false);
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetJoke = async () => {
    setLoading(true);
    try {
      const response = await apiService.getJoke();
      setJoke(response);
      setJokeDialogOpen(true);
    } catch (error) {
      console.error('Erreur lors de la récupération de la blague:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseJoke = () => {
    setJokeDialogOpen(false);
    setJoke(null);
  };

  return (
    <Container className="home-container">
      <Paper className="welcome-card">
        <Typography variant="h1" color="primary" gutterBottom>
          Bienvenue sur l'API de Gestion de Données
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Explorez et gérez vos données facilement
        </Typography>
        
        <Box className="button-container">
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/data')}
          >
            Gérer les Données
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={handleGetJoke}
            startIcon={<SentimentVerySatisfiedIcon />}
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Obtenir une Blague'}
          </Button>
        </Box>
      </Paper>

      <Dialog 
        open={jokeDialogOpen} 
        onClose={handleCloseJoke}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: 'joke-dialog'
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SentimentVerySatisfiedIcon color="primary" />
            <Typography variant="h6">Une Blague pour Vous</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : joke ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                {joke.joke}
              </Typography>
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJoke} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Home;
