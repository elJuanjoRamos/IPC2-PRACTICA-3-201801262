"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var evaluacion_controller_1 = __importDefault(require("./../controller/evaluacion.controller"));
var evaluacion = express_1.Router();
evaluacion.get('/evaluaciones/:id', evaluacion_controller_1.default.getInstance().getAll);
evaluacion.get('/ev/:id', evaluacion_controller_1.default.getInstance().getAllEvCourse);
evaluacion.get('/evaluacion/:id', evaluacion_controller_1.default.getInstance().getSingle);
evaluacion.post('/evaluacion', evaluacion_controller_1.default.getInstance().create);
evaluacion.put('/evaluacion/:id', evaluacion_controller_1.default.getInstance().update);
evaluacion.delete('/evaluacion/:id', evaluacion_controller_1.default.getInstance().delete);
//DetalleEvaluacion
evaluacion.get('/det-evaluacion/', evaluacion_controller_1.default.getInstance().getAllDetails);
evaluacion.get('/det-evaluacion/:id', evaluacion_controller_1.default.getInstance().getSingleDetail);
evaluacion.post('/det-evaluacion', evaluacion_controller_1.default.getInstance().createDetail);
evaluacion.put('/det-evaluacion/:id', evaluacion_controller_1.default.getInstance().updateDetail);
evaluacion.delete('/det-evaluacion/:id', evaluacion_controller_1.default.getInstance().deleteDetail);



exports.default = evaluacion;