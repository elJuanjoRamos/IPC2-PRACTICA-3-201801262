"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var AsignacionAuxiliarController = /** @class */ (function() {
    function AsignacionAuxiliarController() {
        this.getAll = function(req, res) {
            var query = "\n SELECT idAsignacionAuxiliar, Usuario.idUsuario, Usuario.nombre, Usuario.apellido, semestre, anio, horaInicio, \n            horaFin, Curso.nombre as 'curso', Curso.codigo, seccion.nombre as 'seccion' FROM AsignacionAuxiliar\n            INNER JOIN Usuario ON AsignacionAuxiliar.idUsuario = Usuario.idUsuario\n            INNER JOIN DetalleCurso ON AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso\n            INNER JOIN Curso on DetalleCurso.idCurso = Curso.idCurso\n            INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion\n            ORDER BY Usuario.idUsuario;\n        ";
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };
        this.getSingle = function(req, res) {
            var query = "\n     select concat(Usuario.nombre, ' ' ,Usuario.apellido) as aux, Curso.nombre, Curso.codigo, Curso.estado, DetalleCurso.horaInicio, DetalleCurso.horaFin, Seccion.nombre as seccion FROM AsignacionAuxiliar       \n INNER JOIN Usuario ON AsignacionAuxiliar.idUsuario = Usuario.idUsuario\n INNER JOIN DetalleCurso ON AsignacionAuxiliar.idDetalleCurso = AsignacionAuxiliar.idDetalleCurso \n INNER JOIN Curso ON DetalleCurso.idCurso = Curso.idCurso \n  INNER JOIN Seccion ON DetalleCurso.idSeccion = Seccion.idSeccion \n WHERE idAsignacionAuxiliar = ?          ";
            var body = {
                idCurso: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idCurso, function(err, data) {
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
        this.getMyCourses = function(req, res) {
            var query = "\n     SELECT idAsignacionAuxiliar, Curso.nombre, Curso.codigo, DetalleCurso.horaInicio, DetalleCurso.horaFin, Seccion.nombre as s FROM AsignacionAuxiliar \n INNER JOIN DetalleCurso ON AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso  \n INNER JOIN Curso ON DetalleCurso.idCurso = Curso.idCurso \n  INNER JOIN Seccion ON DetalleCurso.idSeccion = Seccion.idSeccion \n WHERE AsignacionAuxiliar.idUsuario = ?          ";
            var body = {
                idCurso: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idCurso, function(err, data) {
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
        this.getMyCoursesEst = function(req, res) {
            var query = "\n     SELECT AsignacionEstudiante.idAsignacionAuxiliar, Curso.nombre, Curso.codigo, DetalleCurso.horaInicio, DetalleCurso.horaFin, Seccion.nombre as s FROM AsignacionEstudiante \n INNER JOIN AsignacionAuxiliar ON AsignacionEstudiante.idAsignacionAuxiliar = AsignacionAuxiliar.idAsignacionAuxiliar \n INNER JOIN DetalleCurso ON AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso  \n INNER JOIN Curso ON DetalleCurso.idCurso = Curso.idCurso \n  INNER JOIN Seccion ON DetalleCurso.idSeccion = Seccion.idSeccion \n WHERE AsignacionEstudiante.idUsuario = ?          ";
            var body = {
                idCurso: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idCurso, function(err, data) {
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
        this.getMyStudents = function(req, res) {
            var query = "\n   SELECT Usuario.idUsuario, concat(Usuario.nombre, ' ' , Usuario.apellido) as estudiante, Usuario.carnet FROM AsignacionEstudiante         \n    INNER JOIN Usuario on AsignacionEstudiante.idUsuario = Usuario.idUsuario  \n WHERE AsignacionEstudiante.idAsignacionAuxiliar = ?          ";
            var body = {
                idCurso: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idCurso, function(err, data) {
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
        this.getMyAux = function(req, res) {
            var query = "\n   SELECT Usuario.idUsuario, concat(Usuario.nombre, ' ' , Usuario.apellido) as auxiliar, Usuario.carnet FROM AsignacionAuxiliar         \n INNER JOIN AsignacionAuxiliar ON AsignacionEstudiante.idAsignacionAuxiliar = AsignacionAuxiliar.idAsignacionAuxiliar  \n  INNER JOIN Usuario on AsignacionEstudiante.idUsuario = Usuario.idUsuario  \n WHERE AsignacionEstudiante.idUsuario = ?          ";
            var body = {
                idCurso: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idCurso, function(err, data) {
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
            var query = "\n            CALL SP_CreateAsignacionAuxiliar(?, ?);\n        ";
            var body = {
                idUsuario: req.body.idUsuario,
                idDetalleCurso: req.body.idDetalleCurso
            };

            mysql_1.default.sendQuery(query, [body.idUsuario, body.idDetalleCurso], function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    if (JSON.parse(JSON.stringify(data[0]))[0]._existe == 0) {
                        res.json({
                            ok: true,
                            status: 200
                        });
                    } else {
                        res.json({
                            ok: false,
                            status: 400,
                            error: "Ya existe un registro"
                        });
                    }
                }
            });
        };
        this.update = function(req, res) {
            var body = {
                idUsuario: req.body.idUsuario,
                idDetalleCurso: req.body.idDetalleCurso,
                idAsignacionAuxiliar: req.params.id,
            };
            var query = "\n            CALL SP_UpdateAsignacionAuxiliar(?, ?, ?)\n        ";
            mysql_1.default.sendQuery(query, [body.idUsuario, body.idDetalleCurso, body.idAsignacionAuxiliar], function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    if (JSON.parse(JSON.stringify(data[0]))[0]._existe == 0) {
                        res.json({
                            ok: true,
                            status: 200
                        });
                    } else {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: "Ya existe un registro"
                        });
                    }
                }
            });
        };
        this.delete = function(req, res) {
            var id = req.params.id;
            var query = "\n            DELETE FROM AsignacionAuxiliar WHERE idAsignacionAuxiliar = ?\n        ";
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
    AsignacionAuxiliarController.getInstance = function() {
        return this._instance || (this._instance = new this());
    };
    return AsignacionAuxiliarController;
}());
exports.default = AsignacionAuxiliarController;