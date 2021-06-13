// Creamos el cliente de MongoDB:
var MongoClient = require('mongodb').MongoClient;

// Creamos una variable denominada "db" para almacenar la conexión:
var db = null;

// Creamos una función para conectanos con la base de datos:
module.exports.connect = function (url, callback) {
    // Si ya estaamos conectados, no se vuelve a conectar:
    if (db) {
        return callback();
    }

    // Creamos una instancia del cliente de MongoDB:
    const client = new MongoClient(url, {
        useNewUrlParser: true
    });

    // Conectamo el cliente al servidor:
    client.connect(function (err, result) {
        if (err) {
            return callback(err);
        }
        console.log("Conectado a BD");
        db = result;
        callback();
    });
};

// Creamos una función para cerrar la conexión con la base de datos:
module.exports.close = function (callback) {
    if (db) {
        db.close(function (err, result) {
            console.log("Desconectado de BD");
            db = null;
            callback(err);
        });
    }
};

// Creamos una función para obtener el cliente de MongoDB conectado a la base de datos:
module.exports.get = function () {
  return db;
}