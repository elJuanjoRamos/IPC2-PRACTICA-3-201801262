"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var MensajeController = /** @class */ (function() {
    function MensajeController() {
        this.getAll = function(req, res) {
            var query = "\n            SELECT * FROM Mensaje\n        ";
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };
        this.getSingle = function(req, res) {
            var query = "\n  SELECT DetalleMensaje.idMensaje, Mensaje.asunto,  rec.idUsuario as idRem, concat(rec.nombre, ' ', rec.apellido) as recept, emi.idUsuario as idEmis, concat(emi.nombre, ' ', emi.apellido) as emisorM, cuerpo FROM DetalleMensaje \n INNER JOIN Mensaje ON DetalleMensaje.idMensaje = Mensaje.idMensaje \nINNER JOIN Usuario as emi ON Mensaje.emisor =  emi.idUsuario \n INNER JOIN Usuario as rec ON Mensaje.receptor = rec.idUsuario \n WHERE  Mensaje.idMensaje = ?";
            var body = {
                idMensaje: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idMensaje, function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json(data[0]);
                }
            });
        };
        this.getMessageUser = function(req, res) {
            var query = "\n   SELECT idMensaje, asunto, concat(Usuario.nombre, ' ', Usuario.apellido) as emisor, Usuario.idUsuario FROM Mensaje \n INNER JOIN Usuario ON Mensaje.emisor = Usuario.idUsuario \n  WHERE receptor = " + req.params.id;
            //var query = "\n            SELECT Usuario.nombre, Usuario.apellido, Usuario.email, Usuario.idUsuario as 'Receptor' FROM Mensaje\n            INNER JOIN Usuario ON Mensaje.idUsuario2 = Usuario.idUsuario\n            WHERE idUsuario1 = ?\n            UNION\n            SELECT Usuario.nombre, Usuario.apellido, Usuario.email, Usuario.idUsuario as 'Receptor' FROM Mensaje\n            INNER JOIN Usuario ON Mensaje.idUsuario1 = Usuario.idUsuario\n            WHERE idUsuario2 = ?\n            ORDER BY Receptor;\n        ";
            var body = {
                idUsuario: req.params.id
            };
            mysql_1.default.sendQuery(query, [body.idUsuario, body.idUsuario], function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };
        this.getMessages = function(req, res) {
            var query = "\n   SELECT  idMensaje, asunto, concat(Usuario.nombre, ' ', Usuario.apellido) as receptor, Usuario.idUsuario FROM Mensaje \n INNER JOIN Usuario ON Mensaje.receptor = Usuario.idUsuario \n  WHERE emisor = " + req.params.id;
            mysql_1.default.sendQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };
        this.getRespuestas = function(req, res) {
            var query = "\n  SELECT * FROM RespuestaMENSAJE \n WHERE  idMensaje = " + req.params.id;
            mysql_1.default.sendQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };
        this.create = function(req, res) {
            var query = "\n            CALL SP_CreateMensaje(?, ?, ?, ?, ?);\n        ";
            var body = {
                usuario1: req.body.usuario1,
                usuario2: req.body.usuario2,
                asunto: req.body.asunto,
                mensaje: req.body.mensaje,
                file: req.body.file
            };
            mysql_1.default.sendQuery(query, [body.usuario1, body.usuario2, body.asunto, body.mensaje, body.file], function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json({
                        ok: true,
                        status: 200
                    });
                }
            });
        };
        this.createRespuesta = function(req, res) {
            var query = "\n            CALL SP_CreateRespuesta(?, ?, ?, ?, ?,?);\n        ";
            var body = {
                emisor: req.body.emisor,
                receptor: req.body.receptor,
                asunto: req.body.asunto,
                cuerpo: req.body.cuerpo,
                archivo: req.body.archivo,
                idMensaje: req.body.idMensaje
            };


            mysql_1.default.sendQuery(query, [body.emisor, body.receptor, body.asunto, body.cuerpo, body.archivo, body.idMensaje], function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json({
                        ok: true,
                        status: 200
                    });
                }
            });
        };
        this.delete = function(req, res) {
            var id = req.params.id;
            var query = "\n            DELETE FROM Mensaje WHERE idMensaje = ?;\n        ";
            mysql_1.default.sendQuery(query, id, function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json({
                        ok: true,
                        status: 200,
                    });
                }
            });
        };
    }
    MensajeController.getInstance = function() {
        return this._instance || (this._instance = new this());
    };
    return MensajeController;
}());
exports.default = MensajeController;