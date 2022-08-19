const dbConnection = require("./mongoConnection");


const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.connectToDb();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
  UsersData: getCollectionFn('UsersData'),
  ImagesData: getCollectionFn('ImagesData'),
  QueueData: getCollectionFn('QueueData')
};