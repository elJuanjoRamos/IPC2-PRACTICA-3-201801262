"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var EvaluacionController = /** @class */ (function() {
    function EvaluacionController() {
        this.getAll = function(req, res) {
            var body = {
                idAsignacionAuxiliar: req.params.id
            };
            var query = "CALL SP_get_Evaluaciones(?)";
            mysql_1.default.sendQuery(query, body.idAsignacionAuxiliar, function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    console.log(data)
                    res.json(data[0]);
                }
            });
        };
        this.getAllEvCourse = function(req, res) {
            var body = {
                idAsignacionAuxiliar: req.params.id
            };
            var query = "select Evaluacion.idEvaluacion, Evaluacion.nombre, ponderacion FROM DetalleEvaluacion \n INNER JOIN Evaluacion ON DetalleEvaluacion.idEvaluacion = Evaluacion.idEvaluacion WHERE Evaluacion.idAsignacionAuxiliar = ? AND DetalleEvaluacion.activado = 1  ";
            mysql_1.default.sendQuery(query, body.idAsignacionAuxiliar, function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    console.log(data)
                    res.json(data);
                }
            });
        };
        this.getSingle = function(req, res) {
            var query = "\n            SELECT * FROM Evaluacion WHERE idEvaluacion = ?\n        ";
            var body = {
                idEvaluacion: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idEvaluacion, function(err, data) {
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
        this.create = function(req, res) {
            var query = "\n  CALL SP_CrearEvaluacion(?,?)\n        ";
            var body = {
                nombre: req.body.nombre,
                id: req.body.idAsignacionAuxiliar
            };
            mysql_1.default.sendQuery(query, [body.nombre, body.id], function(err, data) {
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
        this.update = function(req, res) {
            var body = {
                nombre: req.body.nombre,
                idEvaluacion: req.params.id
            };
            var query = "\n  SP_ActualizarEvaluacion(?,?);\n ";
            mysql_1.default.sendQuery(query, [body.nombre, body.idEvaluacion], function(err, data) {
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
            var query = "\n CALL SP_EliminarEvaluacion(?);\n        ";
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

        ///////////////AQUI EMPIEZA DETALLEEVALUACION
        this.getAllDetails = function(req, res) {
            var query = "\n            SELECT * FROM DetalleEvaluacion\n        ";
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };
        this.getSingleDetail = function(req, res) {
            var query = "\n            SELECT * FROM DetalleEvaluacion WHERE idEvaluacion = ?\n        ";
            var body = {
                idEvaluacion: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idEvaluacion, function(err, data) {
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

        this.createDetail = function(req, res) {
            var body = {
                activado: req.body.habilitado,
                idEvaluacion: req.body.idEvaluacion,
                aleatorio: req.body.aleatorio,
                ponderacion: req.body.ponderacion
            };
            var query = "\n CALL SP_CreateDetalleEvaluacion(" + body.idEvaluacion + "," + body.activado + "," + body.aleatorio + "," + body.ponderacion + ");\n        ";
            mysql_1.default.sendQuery(query, function(err, data) {
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
        this.deleteDetail = function(req, res) {
            var id = req.params.id;
            var query = "\n  SP_EliminarDetalleEvaluacion(?);\n        ";
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
        this.updateDetail = function(req, res) {
            var body = {
                activado: req.body.habilitado,
                aleatorio: req.body.aleatorio,
                ponderacion: req.body.ponderacion,
                id: req.params.id,
            };
            var query = "\n CALL  SP_ActualizarDetalleEvaluacion(" + body.id + "," + body.activado + "," + body.aleatorio + "," + body.ponderacion + ");\n ";
            mysql_1.default.sendQuery(query, [body.id, body.activado, body.aleatorio, body.ponderacion], function(err, data) {
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
    }
    EvaluacionController.getInstance = function() {
        return this._instance || (this._instance = new this());
    };
    return EvaluacionController;
}());
exports.default = EvaluacionController;