"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var ActividadController = /** @class */ (function() {
    function ActividadController() {
        this.getAll = function(req, res) {
            var query = "\n   CALL SP_GetActividades(?)   \n  ";
            var body = {
                idActividad: req.params.id
            };
            mysql_1.default.getQuery(query, body.idActividad, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data[0]);
                }
            });
        };
        this.getMisActiv = function(req, res) {
            var body = {
                idActividad: req.params.id
            };
            var query = "\n CALL SP_GetActiv(" + body.idActividad + ")   \n  ";

            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data[0]);
                }
            });
        };
        this.getSingle = function(req, res) {
            var query = "\n SELECT * FROM ACTIVIDAD WHERE idActividad = ?; \n        ";
            var body = {
                idActividad: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idActividad, function(err, data) {
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
        this.getMyActivity = function(req, res) {
            var query = "\n    SELECT * FROM Actividad WHERE idAsignacionAuxiliar = ?\n        ";
            var body = {
                id: req.params.id
            };
            mysql_1.default.sendQuery(query, body.id, function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    res.json(data);
                }
            });
        };
        this.create = function(req, res) {
            console.log('data');
            var query = "\n            CALL SP_CreateActividad(?, ?, ?, ?, ?, ?);\n        ";
            var body = {
                idAsignacion: req.body.idAsignacionAuxiliar,
                nombre: req.body.nombre,
                horaLimite: req.body.horaLimite,
                fechaLimite: req.body.fechaLimite,
                ponderacion: req.body.ponderacion,
                conArchivo: req.body.conArchivo
            };
            console.log(body)
            mysql_1.default.sendQuery(query, [body.idAsignacion, body.nombre, body.horaLimite, body.fechaLimite,
                body.ponderacion, body.conArchivo
            ], function(err, data) {
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
        this.createMiActividad = function(req, res) {

            var query = "\n CALL SP_EntregarActividad(?,?,?,?)\n        ";
            var body = {
                idAlumno: req.body.idUsuario,
                idActividad: req.body.idActividad,
                entregada: req.body.entregada,
                calificacion: req.body.ponderacion
            };
            console.log(body)
            mysql_1.default.sendQuery(query, [body.idAlumno, body.idActividad, body.entregada, body.calificacion], function(err, data) {
                if (err) {
                    res.json({
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
        this.update = function(req, res) {
            var body = {
                idActividad: req.body.idActividad,
                idAsignacion: req.body.idAsignacionAuxiliar,
                nombre: req.body.nombre,
                horaLimite: req.body.horaLimite,
                fechaLimite: req.body.fechaLimite,
                ponderacion: req.body.ponderacion,
                conArchivo: req.body.conArchivo
            };
            var query = "\n      CALL SP_ActualizarActividad(?,?, ?, ?, ?, ?, ?);   \n        ";
            mysql_1.default.sendQuery(query, [body.idActividad, body.idAsignacion, body.nombre, body.horaLimite, body.fechaLimite,
                body.ponderacion, body.conArchivo
            ], function(err, data) {
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
            var query = "\n CALL SP_EliminarActividad(?);\n        ";
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
    ActividadController.getInstance = function() {
        return this._instance || (this._instance = new this());
    };
    return ActividadController;
}());
exports.default = ActividadController;