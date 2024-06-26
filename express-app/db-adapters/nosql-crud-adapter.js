function NoSqlCrudAdapter (dbConnectFunction, getId) {
  function getObjects (collectionName, filter, callback) {
    filter = filter || [];
    let query = {};
    filter.forEach(fi => query[fi.name] = fi.value);
    dbConnectFunction((db, finalizeCallback) => {
      db.collection(collectionName).find(query).toArray()
        .then((results) => {
          callback(results);
          finalizeCallback(results);
        })
        .catch(() => {
          console.error(JSON.stringify(arguments));
        });
      }
    );
  }

  function deleteObject (collectionName, idValue, callback) {
    dbConnectFunction((db, finalizeCallback) => {
      db.collection(collectionName).deleteMany({ id: idValue })
        .then((results) => {
          callback(results);
          finalizeCallback(results);
        })
        .catch(() => {
          console.error(JSON.stringify(arguments));
        });
      }
    );
  }

  function createObject (collectionName, object, callback) {
    object.id = object.id || getId();
    dbConnectFunction((db, finalizeCallback) => {
      db.collection(collectionName).insertOne(object)
        .then((results) => {
          callback(object.id);
          finalizeCallback(results);
        })
        .catch(() => {
          console.error(JSON.stringify(arguments));
        });
      }
    );
  }

  function updateObject (collectionName, object, callback) {
    dbConnectFunction((db, finalizeCallback) => {
      db.collection(collectionName).updateOne({ id: object.id }, { $set: object })
        .then((results) => {
          callback(results);
          finalizeCallback(results);
        })
        .catch(() => {
          console.error(JSON.stringify(arguments));
        });
      }
    );
  }

  return {
    create: createObject,
    retrieve: getObjects,
    update: updateObject,
    delete: deleteObject
  }
}

module.exports = NoSqlCrudAdapter;