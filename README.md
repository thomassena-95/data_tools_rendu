# Projet Data Tools - ESME

## Description du Projet
Ce projet est une application web complète permettant la gestion et l'analyse de données, développée dans le cadre d'un projet académique à l'ESME. L'application est composée de trois parties principales : un frontend React, un backend FastAPI, et une configuration Docker pour le déploiement. Une fonctionnalité unique de l'application est la génération de blagues via l'API Vertex AI de Google Cloud.

## Contributions des Membres

### Frontend (Thomas Sena)
- Développement de l'interface utilisateur avec React.js
- Architecture modulaire avec une structure claire :
  ```
  frontend/
  ├── src/
  │   ├── components/         # Composants React principaux
  │   │   ├── Header.jsx     # Navigation et interface utilisateur
  │   │   ├── Home.jsx       # Page d'accueil avec présentation
  │   │   └── DataManager.jsx # Gestion et visualisation des données
  │   ├── services/          # Services API et utilitaires
  │   └── styles/            # Fichiers CSS et styles
  ├── public/                # Fichiers statiques
  └── Dockerfile            # Configuration Docker
  ```
- Fonctionnalités principales :
  - Interface de gestion des données interactive
  - Visualisation des données du bucket GCP
  - Génération de blagues via l'API Vertex AI
  - Navigation intuitive entre les différentes sections
  - Design responsive et moderne
- Intégration avec le backend :
  - Appels API REST pour la gestion des données
  - Gestion des erreurs et des états de chargement
  - Validation des données côté client
- Configuration du déploiement :
  - Docker pour la conteneurisation
  - Nginx pour le serveur web
  - Configuration optimisée pour la production
- Points techniques notables :
  - Architecture modulaire et réutilisable
  - Gestion d'état optimisée
  - Tests unitaires
  - Gestion des erreurs robuste
  - Interface utilisateur intuitive
  - Performance optimisée

### Backend (Gabin)
- Développement de l'API REST avec FastAPI
- Intégration avec Google Cloud Platform :
  - Gestion du stockage (Cloud Storage)
  - Intégration avec Vertex AI pour la génération de blagues
- Mise en place des endpoints :
  - `/hello` : Message de bienvenue
  - `/status` : Vérification du statut de l'API
  - `/data` : Gestion des fichiers (lecture/écriture)
  - `/data/{filename}` : Ajout de données à un fichier spécifique
  - `/joke` : Génération de blagues via Vertex AI
  - `/config` : Vérification de la configuration
  - `/debug` : Informations de débogage
- Gestion de l'authentification et des permissions
- Optimisation des performances

### Configuration (Hamza)
- Configuration du projet avec Docker
- Mise en place du `docker-compose.yml`
- Gestion des dépendances et des versions
- Configuration de l'environnement de développement
- Mise en place du système de déploiement
- Gestion des variables d'environnement

## Structure du Projet
```
data_tools/
├── frontend/           # Partie Frontend (Thomas)
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── Dockerfile
├── backend/           # Partie Backend (Gabin)
│   ├── app.py
│   └── requirements.txt
└── docker-compose.yml # Configuration (Hamza)
```

## Technologies Utilisées
- **Frontend** : React.js, CSS3, Nginx
- **Backend** : FastAPI, Google Cloud Platform, Vertex AI
- **Configuration** : Docker, Docker Compose

## Installation et Démarrage

### Prérequis
- Docker et Docker Compose
- Node.js
- Python 3.8+
- Compte Google Cloud Platform

### Installation
1. Cloner le repository
```bash
git clone https://github.com/thomassena-95/data_tools_rendu.git
cd data_tools_rendu
```

2. Configurer les variables d'environnement
```bash
# Backend (.env)
GCP_PROJECT_ID=mini-api-459307
GCP_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=/Users/thomas/Desktop/ESME/Inge2/Hand_On/TP/credentials.json
BUCKET_NAME=mini-api-fichier
FILE_PATH=data.json
```

3. Lancer l'application
```bash
docker-compose up --build
```

## Points Techniques Notables

### Frontend (Thomas)
- Architecture modulaire et réutilisable
- Interface utilisateur intuitive
- Gestion d'état optimisée
- Tests unitaires
- Intégration de la fonctionnalité de génération de blagues
- Gestion des états de chargement et des erreurs

### Backend (Gabin)
- API RESTful
- Intégration GCP
- Gestion des erreurs
- Documentation API
- Intégration de Vertex AI pour la génération de blagues
- Optimisation des appels à l'API de génération

### Configuration (Hamza)
- Environnement de développement cohérent
- Déploiement simplifié
- Gestion des dépendances
- Sécurité

## Fonctionnalités Principales
1. Gestion et visualisation des données
2. Analyse des données via l'API
3. Génération de blagues via Vertex AI
4. Interface utilisateur intuitive
5. Déploiement conteneurisé

## Contact
- Thomas Sena : Frontend
- Gabin : Backend
- Hamza : Configuration
