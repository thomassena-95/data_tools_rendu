import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Box,
  CircularProgress
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import apiService from '../services/api';
import '../styles/Header.css';

function Header() {
  const [open, setOpen] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const data = await apiService.getStatus();
      setStatusData(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du statut:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="static" className="header">
        <Toolbar className="header-toolbar">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StorageIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div">
              API de Gestion de Données
            </Typography>
          </Box>
          <Button 
            color="inherit" 
            onClick={handleClickOpen}
            className="status-button"
          >
            Statut API
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: 'dialog-paper'
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: 'primary.main',
          color: 'white',
          py: 2
        }}>
          Statut de l'API
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : statusData ? (
            <Paper sx={{ p: 3, mt: 1 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Statut:</strong>{' '}
                <Box 
                  component="span" 
                  sx={{ 
                    color: statusData.status === 'ok' ? 'success.main' : 'error.main',
                    fontWeight: 'bold'
                  }}
                >
                  {statusData.status}
                </Box>
              </Typography>
              <Typography variant="body1">
                <strong>Dernière mise à jour:</strong>{' '}
                {new Date(statusData.timestamp).toLocaleString()}
              </Typography>
            </Paper>
          ) : (
            <Typography color="error" sx={{ p: 2 }}>
              Erreur lors de la récupération du statut
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleClose} 
            variant="contained" 
            color="primary"
            sx={{ px: 3 }}
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;
