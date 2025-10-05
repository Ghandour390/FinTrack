# Installation et Configuration - FinTrack

## Prérequis

- Node.js (v14 ou supérieur)
- MySQL (v8.0 ou supérieur)
- Docker et Docker Compose (optionnel)

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Ghandour390/FinTrack.git
cd FinTrack
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

Créer un fichier `.env` à la racine du projet :

```env
DB_HOST=localhost
DB_USER=finuser
DB_PASSWORD=finpass
DB_NAME=findb
DB_PORT=3306

SESSION_SECRET=votre_secret_session

EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
```

## Configuration de la base de données

### Option 1 : Avec Docker (Recommandé)

```bash
docker-compose up -d mysql
```

### Option 2 : MySQL local

Créer la base de données manuellement :

```sql
CREATE DATABASE findb;
CREATE USER 'finuser'@'localhost' IDENTIFIED BY 'finpass';
GRANT ALL PRIVILEGES ON findb.* TO 'finuser'@'localhost';
FLUSH PRIVILEGES;
```

## Commandes de base de données

### Créer les tables

```bash
npx sequelize-cli db:migrate
```

### Supprimer toutes les tables

```bash
npx sequelize-cli db:migrate:undo:all
```

### Insérer les données de test (seed)

```bash
npx sequelize-cli db:seed:all
```

### Supprimer les données de test

```bash
npx sequelize-cli db:seed:undo:all
```

### Réinitialiser complètement la base de données

```bash
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Démarrage de l'application

### Mode développement

```bash
npm start
```

### Avec Docker Compose (app + MySQL)

```bash
docker-compose up --build
```

L'application sera accessible sur `http://localhost:3000`

## Endpoints disponibles

- `/` - Page d'accueil
- `/health` - Santé de l'application
- `/db-health` - Santé de la connexion MySQL
- `/login` - Page de connexion
- `/register` - Page d'inscription
- `/dashboard` - Tableau de bord (authentification requise)

## Arrêter l'application

### Docker

```bash
docker-compose down
```

### Supprimer les volumes Docker

```bash
docker-compose down -v
```
