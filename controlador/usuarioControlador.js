const Usuario = require('../modelo/usuarioModelo');

const usuarioControlador = {
  
  listar(req, res) {
    Usuario.obtenerTodos((listaUsuario) => {      
      res.render('usuarioListar', { listaUsuario });
    });
  },

  crear(req, res) {    
    res.render('usuarioCrear');
  },


  guardar(req, res) {    
    const usuario = new Usuario(req.body.nombre, req.body.descripcion);
    Usuario.crear(usuario, () => {
      res.redirect('/');
    });
  },


  eliminar(req, res) {    
    Usuario.eliminar(req.params.id, () => {
      res.redirect('/');
    });
  },


  modificar(req, res) {
    Usuario.obtenerPorId(req.params.id, (usuario) => {
      res.render('usuarioModificar', { usuario });
    });
  },

  actualizar(req, res) {
    const usuario = new Usuario(req.body.nombre, req.body.descripcion);
    Usuario.actualizar(req.params.id, usuario, () => {
      res.redirect('/');
    });
  },


}

module.exports = usuarioControlador;