import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 3000;

// Configurer CORS pour accepter les requêtes de partout
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

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

// Autres configurations d'Express (middlewares, routes, etc.)

// Exemple de route pour récupérer toutes les blagues
app.get('/api/jokes', async (req, res) => {
  try {
    // Code pour récupérer les blagues depuis la base de données
    const jokes = await Joke.findAll();
    res.status(200).json(jokes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des blagues.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
