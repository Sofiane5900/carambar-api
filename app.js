import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { seedDatabase } from './seed.js'; // Importe le script de seed
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middlewares
app.use(express.json());

// Configuration de la base de données
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Définition du modèle Joke
const Joke = sequelize.define('Joke', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Configurer Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Carambar API',
      version: '1.0.0',
      description: 'API pour les blagues Carambar',
    },
    servers: [
      {
        url: `http://localhost:${port}`, // Modifier si nécessaire pour le déploiement
        description: 'Development server',
      },
      {
        url: 'https://carambar-api-9cle.onrender.com',
        description: 'Production server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Chemin vers tes fichiers de routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Fonction pour démarrer l'application
async function startApp() {
  try {
    await sequelize.sync({ force: true }); // Synchronise et recrée toutes les tables
    await seedDatabase(); // Appelle le script de seed
    console.log('Base de données synchronisée et peuplée avec succès !');

    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  } catch (error) {
    console.error('Erreur lors de la synchronisation ou du peuplement de la base de données :', error);
  }
}

// Je lance le serveur
startApp();

// Exemple de route pour récupérer toutes les blagues
app.get('/api/jokes', async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    res.status(200).json(jokes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des blagues.' });
  }
});

// Exemple de route pour ajouter une blague
app.post('/api/jokes', async (req, res) => {
  try {
    const joke = await Joke.create(req.body);
    res.status(201).json(joke);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la blague.' });
  }
});

// Exemple de route pour récupérer une blague par son ID
app.get('/api/jokes/:id', async (req, res) => {
  try {
    const joke = await Joke.findByPk(req.params.id);
    if (!joke) {
      res.status(404).json({ error: 'Blague non trouvée.' });
    } else {
      res.status(200).json(joke);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la blague.' });
  }
});

// Exemple de route pour avoir une blague aléatoire
app.get('/api/jokesrandom', async (req, res) => {
  try {
    const joke = await Joke.findOne({ order: sequelize.random() });
    res.status(200).json(joke);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la blague.' });
  }
});


