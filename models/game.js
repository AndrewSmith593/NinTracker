module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
      // The email cannot be null, and must be a proper email before creation
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // The password cannot be null
      platforms: {
        type: DataTypes.STRING,
        allowNull: false
      },
      genres: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
   
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password

    return Game;
  };
  