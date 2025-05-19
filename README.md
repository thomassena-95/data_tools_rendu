# API de Gestion de Données avec Vertex AI

Cette API FastAPI permet de gérer des données dans Google Cloud Storage et d'interagir avec Vertex AI pour la génération de contenu.

## Prérequis

- Python 3.8+
- Docker (pour le déploiement)
- Compte Google Cloud Platform
- Credentials Google Cloud (fichier JSON)
- Variables d'environnement configurées :
  - `BUCKET_NAME` : Nom du bucket Google Cloud Storage
  - `FILE_PATH` : Chemin du fichier dans le bucket
  - `GOOGLE_APPLICATION_CREDENTIALS` : Chemin vers le fichier de credentials

## Installation et Déploiement

### 1. Installation Locale

1. Cloner le repository :
```bash
git clone <votre-repo>
cd <votre-repo>
```

2. Créer un environnement virtuel :
```bash
python -m venv venv
source venv/bin/activate  # Sur Windows : venv\Scripts\activate
```

3. Installer les dépendances :
```bash
pip install -r requirements.txt
```

4. Configurer les variables d'environnement :
```bash
export BUCKET_NAME="votre-bucket"
export FILE_PATH="votre/chemin/fichier"
export GOOGLE_APPLICATION_CREDENTIALS="chemin/vers/credentials.json"
```

5. Lancer l'API :
```bash
uvicorn app:app --reload
```

### 2. Déploiement avec Docker

1. Construire l'image Docker :
```bash
docker build -t api-gestion-donnees .
```

2. Lancer le conteneur :
```bash
docker run -p 8000:8000 \
  -e BUCKET_NAME="votre-bucket" \
  -e FILE_PATH="votre/chemin/fichier" \
  -e GOOGLE_APPLICATION_CREDENTIALS="/app/credentials.json" \
  -v $(pwd)/credentials.json:/app/credentials.json \
  api-gestion-donnees
```

### 3. Déploiement sur Google Cloud Run

1. Installer et configurer Google Cloud SDK :
```bash
# Installation de gcloud CLI
# Voir : https://cloud.google.com/sdk/docs/install

# Configuration du projet
gcloud config set project <votre-projet-id>
```

2. Activer les APIs nécessaires :
```bash
gcloud services enable run.googleapis.com
gcloud services enable storage.googleapis.com
gcloud services enable aiplatform.googleapis.com
```

3. Construire et pousser l'image :
```bash
# Construire l'image
docker build -t gcr.io/<votre-projet-id>/api-gestion-donnees .

# Pousser l'image
docker push gcr.io/<votre-projet-id>/api-gestion-donnees
```

4. Déployer sur Cloud Run :
```bash
gcloud run deploy api-gestion-donnees \
  --image gcr.io/<votre-projet-id>/api-gestion-donnees \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars="BUCKET_NAME=votre-bucket,FILE_PATH=votre/chemin/fichier" \
  --set-secrets="GOOGLE_APPLICATION_CREDENTIALS=credentials:latest"
```

5. Configurer les secrets :
```bash
# Créer le secret
gcloud secrets create credentials --data-file=credentials.json

# Donner accès à Cloud Run
gcloud secrets add-iam-policy-binding credentials \
  --member="serviceAccount:<votre-service-account>@<votre-projet-id>.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

## Endpoints API

### 1. Endpoints de Base

#### GET `/hello`
- **Description** : Endpoint de bienvenue
- **Réponse** : Message de bienvenue
- **Exemple de réponse** :
```json
{
    "message": "Bienvenue sur mon API !"
}
```

#### GET `/status`
- **Description** : Vérifie l'état de l'API
- **Réponse** : Statut et timestamp
- **Exemple de réponse** :
```json
{
    "status": "ok",
    "timestamp": "2024-03-21T10:30:00.000Z"
}
```

### 2. Gestion des Données

#### GET `/data`
- **Description** : Récupère les données depuis Google Cloud Storage
- **Paramètres** :
  - `format` (query) : Format souhaité (`json` ou `csv`)
- **Réponse** : Données au format demandé
- **Exemple de requête** :
```
GET /data?format=json
```

#### POST `/data`
- **Description** : Ajoute une nouvelle entrée dans le stockage
- **Paramètres** :
  - `format` (query) : Format du fichier (`json` ou `csv`)
  - `item` (body) : Données à ajouter
- **Réponse** : Message de confirmation
- **Exemple de requête** :
```json
POST /data?format=json
{
    "nom": "John",
    "age": 30
}
```

### 3. Génération de Blagues avec Vertex AI

#### GET `/joke`
- **Description** : Génère une blague en utilisant le modèle Gemini
- **Réponse** : Blague générée
- **Exemple de réponse** :
```json
{
    "joke": "Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tombent dans le bateau !"
}
```

## Fonctionnalités Techniques

### Gestion des Données
- Support multiformat (JSON/CSV)
- Stockage persistant dans Google Cloud Storage
- Validation des données avec Pydantic
- Gestion automatique des fichiers

### Intégration Vertex AI
- Utilisation du modèle Gemini 2.5 Pro
- Génération de contenu en français
- Gestion des erreurs de connexion et permissions

### Sécurité
- Gestion des credentials via variables d'environnement
- Validation des entrées utilisateur
- Gestion des permissions Google Cloud

## Gestion des Erreurs

L'API gère plusieurs types d'erreurs :
- Erreurs de connexion à Google Cloud
- Erreurs de permissions
- Erreurs de format de données
- Erreurs de validation

## Exemples d'Utilisation

### Récupérer des données en JSON
```bash
curl "http://localhost:8000/data?format=json"
```

### Ajouter des données en CSV
```bash
curl -X POST "http://localhost:8000/data?format=csv" \
     -H "Content-Type: application/json" \
     -d '{"nom":"Alice","age":25}'
```

### Obtenir une blague
```bash
curl "http://localhost:8000/joke"
```

## Structure du Projet

```
.
├── app.py              # Application FastAPI principale
├── requirements.txt    # Dépendances Python
├── Dockerfile         # Configuration Docker
├── .dockerignore     # Fichiers ignorés par Docker
├── credentials.json   # Credentials Google Cloud (à ne pas commiter)
└── README.md         # Documentation
```

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request
