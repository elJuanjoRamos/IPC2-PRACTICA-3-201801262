"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var TicketController = /** @class */ (function() {
    function TicketController() {
        this.getAll = function(req, res) {

            var query = "\n   SELECT * FROM Ticket\n        ";
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };
        this.getMyTickets = function(req, res) {
            var id = req.params.id;
            var query = "\n SELECT * FROM Ticket WHERE idUsuario = " + id;
            mysql_1.default.getQuery(query, function(err, data) {
                if (err) {
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };

        this.create = function(req, res) {
            var query = "\n   CALL SP_CrearTicket(?, ?, ?)\n        ";
            var body = {
                idUsuario: req.body.idUsuario,
                asunto: req.body.asunto,
                cuerpo: req.body.cuerpo
            };
            mysql_1.default.sendQuery(query, [body.idUsuario, body.asunto, body.cuerpo], function(err, data) {
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
                enviado: req.body.enviado,
                recibido: req.body.recibido,
                enproceso: req.body.enproceso,
                terminado: req.body.terminado,
                idTicket: req.params.id,
            };
            var query = "\n CALL SP_ActualizarTicket(?,?,?,?)  \n ";
            mysql_1.default.sendQuery(query, [body.idTicket, body.recibido, body.enproceso, body.terminado], function(err, data) {
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
            var query = "\n CALL SP_EliminarTicket(?);\n        ";
            mysql_1.default.sendQuery(query, id, function(err, data) {
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
                            error: "Existen estudiantes asignados a este ticket, el ticket no puede eliminarse"
                        });
                    }
                }
            });
        };
    }
    TicketController.getInstance = function() {
        return this._instance || (this._instance = new this());
    };
    return TicketController;
}());
exports.default = TicketController;