import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Joke = sequelize.define('Joke', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

sequelize.sync()
  .then(() => console.log('Database & tables created!'));

export default Joke;
