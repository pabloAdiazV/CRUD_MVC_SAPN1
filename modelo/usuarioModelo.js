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

  static obtenerFacturas(nif, tipoFac, fechaIni, fechaFin, ejercicio, callback) {    
        
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    Object.defineProperty(exports, "__esModule", { value: true });
    var client_1 = require("@odata/client");
    console.log('Accessing data using OData Client');
    // Hybrid Data Pipeline's sample odata service
    
    //var oDataServiceURL = "https://vm-wbdsp.gascaribe.com:44300/sap/opu/odata/SAP/ZGW_FI_WEB_PROVEEDORES_SRV/";
    var oDataServiceURL = "http://172.23.4.5:8003/sap/opu/odata/SAP/ZGW_FI_WEB_PROVEEDORES_SRV/";
    var client1 = client_1.OData.New4({
        metadataUri: oDataServiceURL,
    });
    client1.setCredential({ username: "padiazv", password: "padiazv2023" });
    var selectLoginIPsByUserID = function () { return __awaiter(void 0, void 0, void 0, function () {
        var filter, result, tabla, contenido, jsonData, cont;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:  
                    var sociedad  = 'EFIG';                                  
                    var fechaCont = "datetime'2023-01-13T00:00:00'";
                    var fechaReg  = "datetime'2023-01-24T00:00:00'";                                    
                    var ejercicioFormat = fechaIni[0]+fechaIni[1]+fechaIni[2]+fechaIni[3];                    
                    var fechaIniFormat  = "datetime'"+fechaIni+"T00:00:00'";                
                    var fechaFinFormat  = "datetime'"+fechaFin+"T00:00:00'";                                        
                    var tercero   = nif;
                    var textoCabecera   = "20230113-E9962";
                    var cuentaIni   = "1000000000";
                    var cuentaFin   = "1999999999";
                      
                    filter = client1.newFilter().property("BUKRS").eq(sociedad).property("GJAHR").eq(ejercicioFormat).property("ZUONR").eq(tercero).property("BLDAT").ge(fechaIniFormat).property("BLDAT").le(fechaFinFormat);   
                    //filter = client1.newFilter().property("BUKRS").eq(sociedad).property("GJAHR").eq(ejercicio).property("ZUONR").eq(tercero).property("BKTXT").eq(textoCabecera).property("CPUDT").ge(fechaIni).property("CPUDT").le(fechaFin).property("HKONT").ge(cuentaIni).property("HKONT").le(cuentaFin);                                                         
                    //filter = client1.newFilter().property("BUKRS").eq(sociedad).property("GJAHR").eq(ejercicio).property("ZUONR").eq(tercero).property("CPUDT").eq(fechaReg).property("BUDAT").eq(fechaCont).property("BKTXT").eq(textoCabecera);                
                    return [4 /*yield*/, client1.newRequest({
                            collection: "ZGW_FI_BKPF_BSEGSet",
                            params: client1.newParam().filter(filter) // odata param
                        })];
                case 1:
                  jsonData = _a.sent();                   
                  contenido = "";
                  cont=0;                                    
            
                    jsonData.d.results.forEach((item) => {                        
                        contenido = contenido+"<tr>";
                        for (const key in item) {    
                            if (cont > 0)                    
                             contenido = contenido+"<td>"+item[key]+"</td>";                                                        
                            cont++;
                            }
                            contenido = contenido+"</tr>";
                            cont=0;
                        }                        
                    );                                                        
                    callback(contenido); // CallBAck es la respuesta.                                         
                    return [2 /*return*/];
            }
        });
    }); };
    selectLoginIPsByUserID();                    
  }
}

module.exports = Usuario;
