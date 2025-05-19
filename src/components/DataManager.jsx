import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import apiService from '../services/api';
import '../styles/DataManager.css';

function DataManager() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newData, setNewData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const response = await apiService.getData();
      setFiles(response.files || []);
    } catch (error) {
      console.error('Erreur lors du chargement des fichiers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (file) => {
    setSelectedFile(file);
    setLoading(true);
    try {
      const response = await apiService.getData(file.name, file.format);
      setFileContent(response);
    } catch (error) {
      console.error('Erreur lors du chargement du fichier:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setFileContent(null);
  };

  const handleAddClick = (file) => {
    setSelectedFile(file);
    setAddDialogOpen(true);
  };

  const handleAddClose = () => {
    setAddDialogOpen(false);
    setNewData({});
  };

  const handleAddSubmit = async () => {
    try {
      await apiService.addData(newData, selectedFile.name, selectedFile.format);
      setSnackbar({
        open: true,
        message: 'Informations ajoutées avec succès !',
        severity: 'success'
      });
      handleAddClose();
      
      // Recharger la liste des fichiers
      await loadFiles();
      
      // Recharger le contenu du fichier sélectionné
      if (selectedFile) {
        const response = await apiService.getData(selectedFile.name, selectedFile.format);
        setFileContent(response);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout des données:', error);
      setSnackbar({
        open: true,
        message: 'Erreur lors de l\'ajout des données',
        severity: 'error'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box className="data-manager-container">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Gestion des Données
        </Typography>
      </Box>

      <Paper className="file-list">
        <Typography variant="h6" gutterBottom>
          Fichiers disponibles
        </Typography>
        
        {loading && !selectedFile ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {files.map((file, index) => (
              <ListItem 
                key={index}
                onClick={() => handleFileClick(file)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  },
                  cursor: 'pointer'
                }}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={file.name}
                  secondary={`Taille: ${(file.size / 1024).toFixed(2)} KB • Mis à jour: ${new Date(file.updated).toLocaleString()}`}
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddClick(file);
                    }}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Dialog 
        open={addDialogOpen} 
        onClose={handleAddClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Ajouter des données à {selectedFile?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nom"
              value={newData.nom || ''}
              onChange={(e) => setNewData({ ...newData, nom: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Âge"
              type="number"
              value={newData.age || ''}
              onChange={(e) => setNewData({ ...newData, age: parseInt(e.target.value) })}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Annuler</Button>
          <Button 
            onClick={handleAddSubmit} 
            variant="contained" 
            color="primary"
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog 
        open={!!selectedFile && !addDialogOpen} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Détails du fichier: {selectedFile?.name}
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : fileContent ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Format: {fileContent.format}
              </Typography>
              <Paper 
                sx={{ 
                  p: 2, 
                  mt: 2, 
                  maxHeight: '400px', 
                  overflow: 'auto',
                  backgroundColor: 'grey.50'
                }}
              >
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(fileContent.content, null, 2)}
                </pre>
              </Paper>
            </Box>
          ) : (
            <Typography color="error">
              Erreur lors du chargement du contenu
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DataManager;
