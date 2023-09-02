module.exports = (sequelize, DataTypes) => {
  const NotesTag = sequelize.define('NotesTag', {
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Note',
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tag',
        key: 'id'
      }
    }
  });
  return NotesTag;
};