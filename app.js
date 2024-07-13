import express from 'express';
import { Sequelize } from 'sequelize';
import jokeRoutes from './routes/jokeRoutes.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Active CORS
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Jokes API',
      version: '1.0.0',
      description: 'A simple API to manage jokes',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
      {
        url: 'https://carambar-api-9cle.onrender.com',
        description: 'Production server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', jokeRoutes);

// Database connection and sync
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
