/**
 *
 * doGetUser function
 *
 * gets user document by id
 */
export default (db, id) => {
  return db.get(id);
};
