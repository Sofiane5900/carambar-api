import Joke from '../models/joke.js';

const addJoke = async (req, res) => {
  try {
    const newJoke = await Joke.create({
      content: req.body.content,
    });
    res.status(201).json(newJoke);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la blague.' });
  }
};

const getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    res.status(200).json(jokes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des blagues.' });
  }
};

const getJokeById = async (req, res) => {
  try {
    const joke = await Joke.findByPk(req.params.id);
    if (joke) {
      res.status(200).json(joke);
    } else {
      res.status(404).json({ error: 'Blague non trouvée.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la blague.' });
  }
};

const getRandomJoke = async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const randomJoke = jokes[randomIndex];
    res.status(200).json(randomJoke);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la blague aléatoire.' });
  }
};

export default {
  addJoke,
  getAllJokes,
  getJokeById,
  getRandomJoke,
};
