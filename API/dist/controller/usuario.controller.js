"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var UsuarioController = /** @class */ (function() {
    function UsuarioController() {
        this.getAll = function(req, res) {
            var query = "\n   CALL SP_GetUsuarios()   \n  ";
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data[0]);
                }
            });
        };

        this.getSingle = function(req, res) {
            var query = "\n            CALL SP_GetUsuario(?);\n        ";
            var body = {
                idUsuario: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idUsuario, function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json(data[0][0]);
                }
            });
        };
        this.create = function(req, res) {
            var query = "\n            CALL SP_CreateUsuario(?, ?, ?, ?, ?, ?, ?);\n        ";
            var body = {
                carnet: req.body.carnet,
                dpi: req.body.dpi,
                username: req.body.username,
                password: req.body.password,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                idTipoUsuario: req.body.idTipoUsuario,
            };
            mysql_1.default.sendQuery(query, [body.carnet, body.dpi, body.username, body.password, body.nombre, body.apellido, body.idTipoUsuario], function(err, data) {
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
        this.auth = function(req, res) {
            var query = "\n            CALL SP_Autenticar(?, ?);\n        ";
            var body = {
                username: req.body.username,
                password: req.body.password
            };
            mysql_1.default.sendQuery(query, [body.username, body.password], function(err, data) {
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
        this.update = function(req, res) {
            var data = {
                id: req.params.id,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                username: req.body.username,
                password: req.body.password,
                dpi: req.body.dpi,
                carnet: req.body.carnet,
            };
            var query = "\n            UPDATE Usuario SET nombre = ?, apellido = ?, username = ?,\n                password = ?, dpi = ?, carnet = ?\n                WHERE idUsuario = ?;\n        ";
            mysql_1.default.sendQuery(query, [data.nombre, data.apellido, data.username, data.password, data.dpi, data.carnet, data.id], function(err, data) {
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
            var query = "\n            DELETE FROM Usuario WHERE idUsuario = ?;\n        ";
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
    UsuarioController.getInstance = function() {
        return this._instance || (this._instance = new this());
    };
    return UsuarioController;
}());
exports.default = UsuarioController;