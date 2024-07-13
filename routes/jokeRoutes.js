import express from 'express';
import jokeController from '../controllers/jokeController.js';

const router = express.Router();

/**
 * @swagger
 * /api/jokes:
 *   post:
 *     summary: Ajouter une nouvelle blague
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Quelle est la femelle du hamster ? L’Amsterdam"
 *     responses:
 *       201:
 *         description: Blague ajoutée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/jokes', jokeController.addJoke);

/**
 * @swagger
 * /api/jokes:
 *   get:
 *     summary: Consulter toutes les blagues
 *     responses:
 *       200:
 *         description: Une liste de blagues
 *       500:
 *         description: Erreur serveur
 */
router.get('/jokes', jokeController.getAllJokes);

/**
 * @swagger
 * /api/jokes/{id}:
 *   get:
 *     summary: Consulter une blague par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Une blague
 *       404:
 *         description: Blague non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/jokes/:id', jokeController.getJokeById);

/**
 * @swagger
 * /api/jokes/random:
 *   get:
 *     summary: Consulter une blague aléatoire
 *     responses:
 *       200:
 *         description: Une blague aléatoire
 *       500:
 *         description: Erreur serveur
 */
router.get('/jokes/random', jokeController.getRandomJoke);

export default router;
