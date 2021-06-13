// Incluimos el fichero con la definición de la BD:
var db = require('../db');
var mongodb = require('mongodb');
var collection;

// Incluimos la constante "validationResult" para poder utilizar los módulos de validación:
const { validationResult } = require('express-validator');

// Conectamos con la base de datos MongoDB:
db.connect('mongodb://localhost:27017', function (err) {
  if (err) {
      throw ('Fallo en la conexión con la BD');
  }
   collection=db.get().db('express').collection('users');
});

// Mostramos todos los usuarios almacenados en la base de datos:
module.exports.users_list = function (req, res) {
    collection.find().toArray(function (err, result) {
            if (err) {
                throw ('Fallo en la conexión con la BD');
            } else {
                res.send(result);
            }
    });
};
  
// Creamos un nuevo usuario y lo almacenamos en la base de datos:
module.exports.users_create = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }
    const user = {};
    //user.id=req.body._id;
    user.nombre = req.body.nombre;
    user.apellidos = req.body.apellidos;
    user.edad = req.body.edad;
    user.dni = req.body.dni;
    user.cumpleanos = req.body.cumpleanos;
    user.colorFav = req.body.colorFav;
    user.sexo = req.body.sexo;
    collection.insertOne(user, function (err, result) {
        if (err) {
            throw ('Fallo en la conexión con la BD');
                } else {
                    res.send(result);
        }
    });
};

// Actualizamos un usuario de la base de datos:
module.exports.users_update_one = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }
    const filter = {_id: new mongodb.ObjectID(req.params.id)};
    const update = {
        $set: {
          //  _id: req.body._id,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            edad: req.body.edad,
            dni: req.body.dni,
            cumpleanos: req.body.cumpleanos,
            colorFav: req.body.colorFav,
            sexo: req.body.sexo
        }
    };
    collection.updateOne(filter, update, function (err, result) {
        // Si se produjo un error, enviamos el error a la siguiente función:
        if (err) {
            next ( new Error('Fallo en la conexión con la BD') );
            return;
        } else {
            // Si todo fue bien, devolvemos el resultado al cliente:
            res.send(result);
        }
    });
};

// Borramos un usuario de la base de datos:
module.exports.users_delete_one = function (req, res, next) {
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }
    const filter = {_id: new mongodb.ObjectID(req.params.id)};
    collection.deleteOne(filter, function (err, result) {
        // Si se produjo un error, enviamos el error a la siguiente función:
        if (err) {
            next ( new Error('Fallo en la conexión con la BD') );
            return;
        } else {
            // Si todo fue bien, devolvemos el resultado al cliente:
            res.send(result);
        }
    });
};