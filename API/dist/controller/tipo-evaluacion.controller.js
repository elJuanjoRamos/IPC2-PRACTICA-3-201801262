"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var TipoEvaluacionController = /** @class */ (function() {
    function TipoEvaluacionController() {

        this.getAll = function(req, res) {
            var id = req.params.id;
            console.log(id)
            var query = "\n CALL SP_GETPreguntas(" + id + ") \n";
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    console.log()
                    res.json(data);
                }
            });
        };

        this.getAllR = function(req, res) {
            var id = req.params.id;
            console.log(id)
            var query = "\n CALL SP_GETPreguntas2(" + id + ") \n";
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    console.log()
                    res.json(data);
                }
            });
        };
        this.getMisEv = function(req, res) {
            var id = req.params.id;
            console.log(id)
            var query = "\n CALL SP_EvaluacionesRealizadas(" + id + ") \n";
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    console.log()
                    res.json(data);
                }
            });
        };

        this.createVF = function(req, res) {
            var query = "\n  CALL SP_CreateEvaluacionVF(?, ?, ?);\n        ";
            var body = {
                idDetalleEvaluacion: req.body.idDetalleEvaluacion,
                pregunta: req.body.pregunta,
                respuesta: req.body.respuesta
            };
            mysql_1.default.sendQuery(query, [body.idDetalleEvaluacion, body.pregunta, body.respuesta], function(err, data) {
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
        this.createEval = function(req, res) {
            var query = "\n INSERT INTO EvaluacionAlumno(idEvaluacion, idUsuario, punteo) values(?, ?, ?);\n        ";
            var body = {
                idEvaluacion: req.body.idEvaluacion,
                idUsuario: req.body.idUsuario,
                punteo: req.body.punteo
            };
            mysql_1.default.sendQuery(query, [body.idEvaluacion, body.idUsuario, body.punteo], function(err, data) {
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
        this.deleteVF = function(req, res) {
            var id = req.params.id;
            var query = "\n     SP_EliminarEvaluacionVF(?);\n        ";
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
        this.createSM = function(req, res) {
            var query = "\n  CALL SP_CreateEvaluacionSM(?, ?, ?,?, ?, ?);\n        ";
            var body = {
                idDetalleEvaluacion: req.body.idDetalleEvaluacion,
                pregunta: req.body.pregunta,
                respuesta1: req.body.respuesta1,
                respuesta2: req.body.respuesta2,
                respuesta3: req.body.respuesta3,
                correcta: req.body.correcta
            };
            mysql_1.default.sendQuery(query, [body.idDetalleEvaluacion, body.pregunta, body.respuesta1, body.respuesta2, body.respuesta3, body.correcta], function(err, data) {
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
        this.deleteSM = function(req, res) {
            var id = req.params.id;
            var query = "\n     SP_EliminarEvaluacionSM(?);\n        ";
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
    TipoEvaluacionController.getInstance = function() {
        return this._instance || (this._instance = new this());
    };
    return TipoEvaluacionController;
}());
exports.default = TipoEvaluacionController;