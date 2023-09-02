
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
  });
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Note, {through: "NotesTag", as: "notes", foreignKey: "tagId"})
  };
  return Tag;
};