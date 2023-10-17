'use strict';

const vectorName = 'ts_search';

const searchObjects = {
  Notes: ['title', 'text'],
};

module.exports = {
  up: (queryInterface) => (
    queryInterface.sequelize.transaction((t) =>
      Promise.all(Object.keys(searchObjects).map((table) =>
        queryInterface.sequelize.query(`ALTER TABLE "Notes" ADD COLUMN ${vectorName} TSVECTOR;`, { transaction: t })
          .then(() =>{
            queryInterface.sequelize.query(`
                UPDATE "Notes" SET ${vectorName} = to_tsvector('simple', ${searchObjects[table].join(" || ' ' || ")});
              `, { transaction: t })
            }
          ).then(() =>
            queryInterface.sequelize.query(`
                CREATE INDEX "Notes_search" ON "Notes" USING gin(${vectorName});
              `, { transaction: t })
          ).then(() =>
            queryInterface.sequelize.query(`
                CREATE TRIGGER "Notes_vector_update"
                BEFORE INSERT OR UPDATE ON "Notes"
                FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger(${vectorName}, 'pg_catalog.simple', ${searchObjects[table].join(', ')});
              `, { transaction: t })
          )
          .error(console.log)
      ))
    )
  ),

  down: (queryInterface) => (
    queryInterface.sequelize.transaction((t) =>
      Promise.all(Object.keys(searchObjects).map((table) =>
        queryInterface.sequelize.query(`
          DROP TRIGGER "Notes_vector_update" ON "Notes";
        `, { transaction: t })
          .then(() =>
            queryInterface.sequelize.query(`
                DROP INDEX "Notes_search";
              `, { transaction: t })
          ).then(() =>
            queryInterface.sequelize.query(`
                ALTER TABLE "Notes" DROP COLUMN ${vectorName};
              `, { transaction: t })
          )
      ))
    )
  ),
};