"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var asignacion_estudiante_controller_1 = __importDefault(require("./../controller/asignacion-estudiante.controller"));
var asignacionAuxiliar = express_1.Router();
asignacionAuxiliar.get('/asignacion-estudiante', asignacion_estudiante_controller_1.default.getInstance().getAllCursos);
asignacionAuxiliar.get('/solicitud-estudiante', asignacion_estudiante_controller_1.default.getInstance().getAllSolicitud);
asignacionAuxiliar.get('/asignacion-estudiante/:id', asignacion_estudiante_controller_1.default.getInstance().getSingle);
asignacionAuxiliar.post('/asignacion-estudiante', asignacion_estudiante_controller_1.default.getInstance().create);
asignacionAuxiliar.put('/asignacion-estudiante/:id', asignacion_estudiante_controller_1.default.getInstance().update);
asignacionAuxiliar.delete('/asignacion-estudiante/:id', asignacion_estudiante_controller_1.default.getInstance().delete);
asignacionAuxiliar.delete('/solicitud-estudiante/:id', asignacion_estudiante_controller_1.default.getInstance().deleteSolicitud);
exports.default = asignacionAuxiliar;