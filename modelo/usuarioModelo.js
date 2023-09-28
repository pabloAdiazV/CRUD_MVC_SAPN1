const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db');

//db.run('DROP TABLE usuario');
db.run('CREATE TABLE IF NOT EXISTS usuario (id INTEGER PRIMARY KEY, nombre TEXT, descripcion TEXT)');

class Usuario {
  constructor(nombre, descripcion) {
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

  static obtenerTodos(callback) {
    db.all('SELECT * FROM usuario', (err, rows) => {
      if (err) throw err;
      callback(rows);
    });
  }

  static obtenerPorId(id, callback) {
    db.get('SELECT * FROM usuario WHERE id = ?', [id], (err, row) => {
      if (err) throw err;
      callback(row);
    });
  }

  static crear(usuario, callback) {
    db.run('INSERT INTO usuario (nombre, descripcion) VALUES (?, ?)', [usuario.nombre, usuario.descripcion], (err) => {
      if (err) throw err;
      callback();
    });
  }

  static actualizar(id, usuario, callback) {
    db.run('UPDATE usuario SET nombre = ?, descripcion = ? WHERE id = ?', [usuario.nombre, usuario.descripcion, id], (err) => {
      if (err) throw err;
      callback();
    });
  }

  static eliminar(id, callback) {
    db.run('DELETE FROM usuario WHERE id = ?', [id], (err) => {
      if (err) throw err;
      callback();
    });
  }
}

module.exports = Usuario;
