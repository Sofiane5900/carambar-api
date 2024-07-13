import { Sequelize, DataTypes } from 'sequelize';

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

// Données de seed pour les blagues
const jokesData = [
  "Quelle est la femelle du hamster ? L’Amsterdam",
  "Que dit un oignon quand il se cogne ? Aïe",
  "Quel est l'animal le plus heureux ? Le hibou, parce que sa femme est chouette.",
  "Pourquoi le football c'est rigolo ? Parce que Thierry en rit",
  "Quel est le sport le plus fruité ? La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.",
  "Que se fait un Schtroumpf quand il tombe ? Un Bleu",
  "Quel est le comble pour un marin ? Avoir le nez qui coule",
  "Qu'est ce que les enfants usent le plus à l'école ? Le professeur",
  "Quel est le sport le plus silencieux ? Le para-chuuuut",
  "Quel est le comble pour un joueur de bowling ? C’est de perdre la boule"
];

// Fonction pour vider et repeupler la base de données
export async function seedDatabase() {
  try {
    await sequelize.sync({ force: true }); // Synchronise et recrée toutes les tables
    await Joke.bulkCreate(jokesData.map(content => ({ content }))); // Insère les données de seed dans la table Joke
  } catch (error) {
    console.error('Erreur lors du peuplement de la base de données :', error);
  } finally {
    await sequelize.close(); // Ferme la connexion Sequelize
  }
}
