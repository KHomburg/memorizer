
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  
  );
  Note.associate = function(models) {
    Note.belongsTo(models.User, {foreignKey: 'userId', as: 'user'}) //TODO: foreign key declaration maybe wrong
    Note.belongsToMany(models.Tag, {through: "NotesTag", as: "tags", foreignKey: "noteId"})
  };

  //search for notes by a term
  Note.searchFilter = function(term, limit, offset){
    return this.sequelize.query(`
      SELECT "id", "userId", "title", "text", "content", "createdAt", "updatedAt", "isPublic" 
      FROM "Notes"
      WHERE "isPublic" = true AND ts_search @@ plainto_tsquery('simple', :query)
      ORDER BY "createdAt" DESC
      OFFSET :offset
      LIMIT :limit;
      `, {
      model: Note,
      replacements: { query: term, limit: limit, offset: offset },
      }
    );
  }

  //search for notes by a term
  Note.searchFilterUsersNotes = function(term, user_id, limit, offset){
    return this.sequelize.query(`
      SELECT "id", "userId", "title", "text", "content", "createdAt", "updatedAt", "isPublic" 
      FROM "Notes"      
      WHERE "userId" = :ID AND "isPublic" = true AND ts_search @@ plainto_tsquery('simple', :query)
      ORDER BY "createdAt" DESC
      OFFSET :offset
      LIMIT :limit;
      `, {
      model: Note,
      replacements: { query: term, ID: user_id, limit: limit, offset: offset },
      }
    );
  }

  //search for notes by a term
  Note.searchFilterMyNotes = function(term, user_id, limit, offset){
    return this.sequelize.query(`
      SELECT "id", "userId", "title", "text", "content", "createdAt", "updatedAt", "isPublic" 
      FROM "Notes"
      WHERE "userId" = :ID AND ts_search @@ plainto_tsquery('simple', :query)
      ORDER BY "createdAt" DESC
      OFFSET :offset
      LIMIT :limit;
      `, {
      model: Note,
      replacements: { query: term, ID: user_id, limit: limit, offset: offset },
      }
    );
  }


  return Note;
};