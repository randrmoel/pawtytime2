module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define("Dog", {
    dogName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    breedUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isURL: true
      }
    }
  });

  Dog.associate = function(models) {
    Dog.belongsTo(models.DogActor);
    Dog.hasMany(models.Appt);
  };

  return Dog;
};
