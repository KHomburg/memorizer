
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //references: {         
      //  model: 'User',
      //  key: 'id'
      //}
    },
  });
  Note.associate = function(models) {
    Note.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
    Note.belongsToMany(models.Tag, {through: "NotesTag", as: "tags", foreignKey: "noteId"})
  };
  return Note;
};