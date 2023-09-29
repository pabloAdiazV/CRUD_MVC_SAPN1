const Usuario = require('../modelo/usuarioModelo');

const usuarioControlador = {
  
  listar(req, res) {
    Usuario.obtenerTodos((listaUsuario) => {      
      res.render('usuarioListar', { listaUsuario });
    });
  },

  menuAdmin(req, res) {    
    res.render('menuAdmin');
  },

  facturas(req, res) {    
    res.render('usuarioFacturas');
  },

  listarFacturas(req, res) {            
      
      const { nif, fechaIni, fechaFin, ejercicio, tipoFac } = req.body;                                

      //Usuario.actualizar(req.params.id, usuario, () 
      Usuario.obtenerFacturas(nif,tipoFac,fechaIni,fechaFin,ejercicio,(listaFacturas) => {   
        console.log(listaFacturas);
         res.render('usuarioListarFacturas', { listaFacturas });
      });                                         
  },

  crear(req, res) {    
    res.render('usuarioCrear');
  },


  guardar(req, res) {    
    const usuario = new Usuario(req.body.nombre, req.body.descripcion);
    Usuario.crear(usuario, () => {
      res.redirect('/usuario/listar');
    });
  },


  eliminar(req, res) {    
    Usuario.eliminar(req.params.id, () => {
      res.redirect('/usuario/listar');
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
      res.redirect('/usuario/listar');
    });
  },


}

module.exports = usuarioControlador;