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
    
    console.log("Esta es la función acrear");
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
                    
                    console.log(fechaIniFormat);
                    console.log(fechaFinFormat);
                    console.log(ejercicioFormat);
                    
                    
                    
                    var tercero   = nif;
                    var textoCabecera   = "20230113-E9962";
                    var cuentaIni   = "1000000000";
                    var cuentaFin   = "1999999999";
                      
                    filter = client1.newFilter().property("BUKRS").eq(sociedad).property("GJAHR").eq(ejercicioFormat).property("ZUONR").eq(tercero).property("BLDAT").ge(fechaIniFormat).property("BLDAT").le(fechaFinFormat);   
                    //filter = client1.newFilter().property("BUKRS").eq(sociedad).property("GJAHR").eq(ejercicio).property("ZUONR").eq(tercero).property("BKTXT").eq(textoCabecera).property("CPUDT").ge(fechaIni).property("CPUDT").le(fechaFin).property("HKONT").ge(cuentaIni).property("HKONT").le(cuentaFin);   
                    //filter = client1.newFilter().property("BUKRS").eq(sociedad).property("GJAHR").eq(ejercicio).property("ZUONR").eq(tercero).property("BKTXT").eq(textoCabecera).property("CPUDT").ge(fechaIni).property("CPUDT").le(fechaFin).property("HKONT").ge(cuentaIni).property("HKONT").le(cuentaFin);   
                    //filter = client1.newFilter().property("BUKRS").eq(sociedad).property("GJAHR").eq(ejercicio).property("BUDAT").eq(fechaCont).property("CPUDT").eq(fechaReg).property("ZUONR").eq(tercero);                
                    //filter = client1.newFilter().property("BUKRS").eq(sociedad).property("GJAHR").eq(ejercicio).property("ZUONR").eq(tercero).property("CPUDT").eq(fechaReg).property("BUDAT").eq(fechaCont).property("BKTXT").eq(textoCabecera);                
                    return [4 /*yield*/, client1.newRequest({
                            collection: "ZGW_FI_BKPF_BSEGSet",
                            params: client1.newParam().filter(filter) // odata param
                        })];
                case 1:
                    result = _a.sent();
                    console.log('Executed OData Query (1) successfully.');
                    //console.log(JSON.stringify(result));
                    //console.log(JSON.stringify(filter));
    
                    //jsonData = JSON.stringify(result);
                    jsonData = result;
                    
                   /* var http = require('http');
                    var server = http.createServer();*/
    
                    /************/
    
                    
                     //jsonData = {"d":{"results":[{"__metadata":{"id":"http://172.23.4.5:8003/sap/opu/odata/SAP/ZGW_FI_WEB_PROVEEDORES_SRV/ZGW_FI_BKPF_BSEGSet(BUKRS='EFIG',BELNR='0800000018',GJAHR='2023',BUZEI='001')","uri":"http://172.23.4.5:8003/sap/opu/odata/SAP/ZGW_FI_WEB_PROVEEDORES_SRV/ZGW_FI_BKPF_BSEGSet(BUKRS='EFIG',BELNR='0800000018',GJAHR='2023',BUZEI='001')","type":"ZGW_FI_WEB_PROVEEDORES_SRV.ZGW_FI_BKPF_BSEG"},"BUKRS":"EFIG","BELNR":"0800000018","GJAHR":"2023","BUZEI":"001","BUDAT":"/Date(1673568000000)/","SHKZG":"H","KOART":"K","KOSTL":"","HKONT":"2425070100","AUFNR":"","LSTAR":"","PSWSL":"COP","PSWBT":"       7238.42","DMBTR":"       7238.42","BLDAT":"/Date(1673568000000)/","CPUDT":"/Date(1674518400000)/","FDTAG":null,"BLART":"99","XBLNR":"","SAKNR":"2425070100","PRCTR":"","XREF1":"97780969","XREF2":"","XREF3":"TRIVIÑO RODRIGUEZ MA","ZUONR":"97780969","SGTXT":"","EBELN":"","EBELP":"00000","STBLG":"0740000466","BSTAT":"","MWSKZ":"","QSSKZ":"","AUGBL":"0800000018","BSCHL":"35","BKTXT":"20230113-E9962"},{"__metadata":{"id":"http://172.23.4.5:8003/sap/opu/odata/SAP/ZGW_FI_WEB_PROVEEDORES_SRV/ZGW_FI_BKPF_BSEGSet(BUKRS='EFIG',BELNR='0800000018',GJAHR='2023',BUZEI='002')","uri":"http://172.23.4.5:8003/sap/opu/odata/SAP/ZGW_FI_WEB_PROVEEDORES_SRV/ZGW_FI_BKPF_BSEGSet(BUKRS='EFIG',BELNR='0800000018',GJAHR='2023',BUZEI='002')","type":"ZGW_FI_WEB_PROVEEDORES_SRV.ZGW_FI_BKPF_BSEG"},"BUKRS":"EFIG","BELNR":"0800000018","GJAHR":"2023","BUZEI":"002","BUDAT":"/Date(1673568000000)/","SHKZG":"S","KOART":"S","KOSTL":"","HKONT":"1110067092","AUFNR":"","LSTAR":"","PSWSL":"COP","PSWBT":"       7238.42","DMBTR":"       7238.42","BLDAT":"/Date(1673568000000)/","CPUDT":"/Date(1674518400000)/","FDTAG":null,"BLART":"99","XBLNR":"","SAKNR":"","PRCTR":"","XREF1":"97780969","XREF2":"","XREF3":"TRIVIÑO RODRIGUEZ MA","ZUONR":"97780969","SGTXT":"","EBELN":"","EBELP":"00000","STBLG":"0740000466","BSTAT":"","MWSKZ":"","QSSKZ":"","AUGBL":"0800000018","BSCHL":"40","BKTXT":"20230113-E9962"},{"__metadata":{"id":"http://172.23.4.5:8003/sap/opu/odata/SAP/ZGW_FI_WEB_PROVEEDORES_SRV/ZGW_FI_BKPF_BSEGSet(BUKRS='EFIG',BELNR='0800000018',GJAHR='2023',BUZEI='003')","uri":"http://172.23.4.5:8003/sap/opu/odata/SAP/ZGW_FI_WEB_PROVEEDORES_SRV/ZGW_FI_BKPF_BSEGSet(BUKRS='EFIG',BELNR='0800000018',GJAHR='2023',BUZEI='003')","type":"ZGW_FI_WEB_PROVEEDORES_SRV.ZGW_FI_BKPF_BSEG"},"BUKRS":"EFIG","BELNR":"0800000018","GJAHR":"2023","BUZEI":"003","BUDAT":"/Date(1673568000000)/","SHKZG":"H","KOART":"S","KOSTL":"0000398000","HKONT":"5803120000","AUFNR":"","LSTAR":"","PSWSL":"COP","PSWBT":"          0.00","DMBTR":"          0.00","BLDAT":"/Date(1673568000000)/","CPUDT":"/Date(1674518400000)/","FDTAG":null,"BLART":"99","XBLNR":"","SAKNR":"","PRCTR":"0000003980","XREF1":"97780969","XREF2":"","XREF3":"TRIVIÑO RODRIGUEZ MA","ZUONR":"97780969","SGTXT":"","EBELN":"","EBELP":"00000","STBLG":"0740000466","BSTAT":"","MWSKZ":"","QSSKZ":"","AUGBL":"","BSCHL":"50","BKTXT":"20230113-E9962"}]}}
                      
                    
    
                    console.log(jsonData);
                    console.log(JSON.stringify(result));
                    contenido = "";
                    cont=0;
    
            
                    //const tableBody = document.getElementById("table-body");
            
                    jsonData.d.results.forEach((item) => {
                        //const row = document.createElement("tr");
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
    
                    tabla = `
                        <!DOCTYPE html>
                              <html>                                               
                                <head>                                                                                
                                     <title>Partidas Individuales</title>    
                                     <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>        
                                     <link rel='stylesheet' type='text/css' href='https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css'>      
                                     <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>            
                                     <script type='text/javascript' charset='utf8' src='https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js'></script>
                                </head>
                                <body>
                                  <table id='miTabla' class='tabla'>                            
                                   <thead>                                
                                    <tr>                                                                           
                                      <th title='BUKRS' >Sociedad</th>
                                      <th title='BELNR' >Documento</th>
                                      <th title='GJAHR' >Ejercicio</th>
                                      <th title='BUZEI' >Pos</th>
                                      <th title='BUDAT' >F. contabilización</th>
                                      <th title='SHKZG' >Debe/Haber</th>
                                      <th title='KOART' >Clase cuenta</th>
                                      <th title='KOSTL' >Centro Coste</th>
                                      <th title='HKONT' >Libro mayor</th>
                                      <th title='AUFNR' >Orden</th>
                                      <th title='LSTAR' >Clase Actividad</th>
                                      <th title='PSWSL' >Mon.libro mayor</th>
                                      <th title='PSWBT' >Impte.libro mayor</th>
                                      <th title='DMBTR' >Importe ML</th>
                                      <th title='BLDAT' >Fecha documento</th>
                                      <th title='CPUDT' >Registrado el</th>
                                      <th title='FDTAG' >Fecha tes.</th>
                                      <th title='BLART' >Clase documento</th>
                                      <th title='XBLNR' >Referencia</th>
                                      <th title='SAKNR' >Cta.mayor</th>
                                      <th title='PRCTR' >CeBe</th>
                                      <th title='XREF1' >Clave ref.1</th>
                                      <th title='XREF2' >Clave ref.2</th>
                                      <th title='XREF3' >Clave ref.3</th>
                                      <th title='ZUONR' >Asignación</th>
                                      <th title='SGTXT' >Texto</th>
                                      <th title='EBELN' >Doc.compras</th>
                                      <th title='EBELP' >Posición</th>
                                      <th title='STBLG' >Anulado con</th>
                                      <th title='BSTAT' >Status doc.</th>
                                      <th title='MWSKZ' >Ind.impuestos</th>
                                      <th title='QSSKZ' >Ind.ret.</th>
                                      <th title='AUGBL' >Doc.comp.</th>
                                      <th title='BSCHL' >Clave contab.</th>
                                      <th title='BKTXT' >Txt.cab.doc.</th>                                                            
                                    </tr>                            
                                   </thead>                            
                                    <tbody id='table-body'>   
                                                `+contenido+`   <script> $('#miTabla').DataTable();</script>                     
                                    </tbody>   
                                  </table>                    `;  

                                  //res.render('partidasIndividuales', { tabla, nif, fechaIni, fechaFin  });
                                  callback(tabla); // CallBAck es la respuesta.

    
    
                                 
                    return [2 /*return*/];
            }
        });
    }); };
    selectLoginIPsByUserID();                 

    callback(''); // CallBAck es la respuesta.

    /*db.all('SELECT * FROM usuario', (err, rows) => {
      if (err) throw err;
      callback(rows);
    });*/
  }
}

module.exports = Usuario;
