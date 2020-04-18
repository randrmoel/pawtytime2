module.exports = function(sequelize, DataTypes) {
    var Appt = sequelize.define("Appt", {
        walkDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        timeSlot: {
            type: DataTypes.TIME,
            allowNull: false
        },
        dogUser:{
            type: DataTypes.INTEGER,
            defaultValue: 0

        },
        walkMemo:{
            type:DataTypes.STRING,
            allowNull:true,
            defaultValue: "Put note here"

        }

    });

    Appt.associate = function(models){
        Appt.belongsTo(models.Dog); //DogId
        Appt.belongsTo(models.DogActor); //DogActorId
    };
    return Appt;
}
