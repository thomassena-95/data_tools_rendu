FROM python:3.9-slim

WORKDIR /app

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Installer les dépendances Python dans un ordre spécifique
RUN pip install --no-cache-dir typing-extensions==4.0.1
RUN pip install --no-cache-dir pydantic==1.8.2
RUN pip install --no-cache-dir numpy==1.23.5
RUN pip install --no-cache-dir pandas==1.3.3
RUN pip install --no-cache-dir google-cloud-aiplatform>=1.36.0
RUN pip install --no-cache-dir vertexai==0.0.1
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Créer un dossier pour les credentials
RUN mkdir -p /app/credentials

EXPOSE 8080

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
