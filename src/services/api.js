import axios from 'axios';

// Récupérer l'URL de l'API depuis la configuration injectée
const API_URL = window.ENV?.API_URL || "https://backend-250727144578.europe-west1.run.app";

console.log('API URL utilisée:', API_URL); 

// Création d'une instance axios avec la configuration
const api = axios.create({
    baseURL: API_URL,
    // Retirer withCredentials car nous n'utilisons pas de cookies
    headers: {
        'Content-Type': 'application/json',
    }
});

const apiService = {
    // Endpoints de base
    getStatus: async () => {
        try {
            const response = await api.get('/status');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération du statut:', error);
            throw error;
        }
    },

    // Gestion des données
    getData: async (filename = null, format = 'json') => {
        try {
            let url = '/data';
            if (filename) {
                url += `?filename=${filename}&format=${format}`;
            }
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            throw error;
        }
    },

    addData: async (data, filename, format = 'json') => {
        try {
            const response = await api.post(`/data/${filename}`, data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout des données:', error);
            throw error;
        }
    },

    // Génération de blagues
    getJoke: async () => {
        try {
            const response = await api.get('/joke');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de la blague:', error);
            throw error;
        }
    }
};

export default apiService;
