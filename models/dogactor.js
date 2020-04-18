// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our DogActor model which can be either a walker or an
//owner.  Owner has actorType: true and Walker has actorType: false
module.exports = function(sequelize, DataTypes) {
  var DogActor = sequelize.define("DogActor", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    actorType: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    st: {
      type: DataTypes.ENUM(
        "AK",
        "AL",
        "AR",
        "AS",
        "AZ",
        "CA",
        "CO",
        "CT",
        "DC",
        "DE",
        "FL",
        "GA",
        "GU",
        "HI",
        "IA",
        "ID",
        "IL",
        "IN",
        "KS",
        "KY",
        "LA",
        "MA",
        "MD",
        "ME",
        "MI",
        "MN",
        "MO",
        "MP",
        "MS",
        "MT",
        "NC",
        "ND",
        "NE",
        "NH",
        "NJ",
        "NM",
        "NV",
        "NY",
        "OH",
        "OK",
        "OR",
        "PA",
        "PR",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UM",
        "UT",
        "VA",
        "VI",
        "VT",
        "WA",
        "WI",
        "WV",
        "WY"
      ),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        is: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i
      }
    },
    phoneType: {
      type: DataTypes.ENUM("landline", "mobile"),
      allowNull: false
    },
    zip5: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 5,
        isInt: true
      }
    },
    lat: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: true
    },
    lng: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: true
    }
  });

  DogActor.associate = function(models) {
    //dogowners can have many dogs
    DogActor.hasMany(models.Dog, {
      onDelete: "cascade"
    });
    DogActor.hasMany(models.Appt, {
      onDelete: "cascade"
    });
  };
  // Creating a custom method for our DogActor model. This will check if an unhashed password entered by the actor can be compared to the hashed password stored in our database
  DogActor.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the DogActor Model lifecycle
  // In this case, before a DogActor is created, we will automatically hash their password
  DogActor.addHook("beforeCreate", function(actor) {
    actor.password = bcrypt.hashSync(
      actor.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return DogActor;
};
