"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var AsignacionEstudianteController = /** @class */ (function() {
    function AsignacionEstudianteController() {
        this.getAllCursos = function(req, res) {
            var query = "\n    SELECT idAsignacionAuxiliar, Usuario.nombre, Usuario.apellido, semestre, anio, horaInicio, \n            horaFin, Curso.nombre as 'curso', Curso.codigo, seccion.nombre as 'seccion' FROM AsignacionAuxiliar\n            INNER JOIN Usuario ON AsignacionAuxiliar.idUsuario = Usuario.idUsuario\n            INNER JOIN DetalleCurso ON AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso\n            INNER JOIN Curso on DetalleCurso.idCurso = Curso.idCurso\n            INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion;\n        ";
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };
        this.getAllSolicitud = function(req, res) {
            var query = "\n  CALL SP_GETSolicitudDesasig(); \n ";
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data[0]);
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

        this.create = function(req, res) {
            var query = "\n            CALL SP_CreateAsignacionEstudiante(?, ?);\n        ";
            var body = {
                idUsuario: req.body.idUsuario,
                idAsignacionAuxiliar: req.body.idAsignacionAuxiliar
            };
            mysql_1.default.sendQuery(query, [body.idAsignacionAuxiliar, body.idUsuario], function(err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                } else {
                    if (JSON.parse(JSON.stringify(data[0]))[0]._existe == 0 || JSON.parse(JSON.stringify(data[0]))[0]._tiempo == 0) {
                        res.json({
                            ok: true,
                            status: 200,
                            mensaje: "Asignacion completada con exito, puedes verla en la seccion 'Mis Cursos'"
                        });
                    } else {
                        var mensaje;
                        if (JSON.parse(JSON.stringify(data[0]))[0]._existe > 0) {
                            mensaje = "Ya tienes una asignacion con en ese curso";
                        } else if (JSON.parse(JSON.stringify(data[0]))[0]._tiempo > 0) {
                            mensaje = "Parece que la fecha de asignacion del curso ya expiro";
                        }
                        res.json({
                            ok: false,
                            status: 400,
                            error: mensaje
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
            var query = "\n  delete from AsignacionEstudiante where idAsignacionEstudiante = " + id;
            console.log(query)
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
        this.deleteSolicitud = function(req, res) {
            var id = req.params.id;
            var query = "\n            DELETE FROM SolicitudDesasignacion WHERE idAsignacionEstudiante = " + id;
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
    AsignacionEstudianteController.getInstance = function() {
        return this._instance || (this._instance = new this());
    };
    return AsignacionEstudianteController;
}());
exports.default = AsignacionEstudianteController;