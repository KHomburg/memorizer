
module.exports = (sequelize, DataTypes) => {
  const Mail = sequelize.define('Mail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    adressee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
  },
  
  );
  Mail.associate = function(models) {
    Mail.belongsTo(models.User, {foreignKey: 'userId', as: 'user'}) //TODO: foreign key declaration maybe wrong
  };

  return Mail;
};