"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var asignacion_auxiliar_controller_1 = __importDefault(require("./../controller/asignacion-auxiliar.controller"));
var asignacionAuxiliar = express_1.Router();
asignacionAuxiliar.get('/asignacion-auxiliar', asignacion_auxiliar_controller_1.default.getInstance().getAll);
asignacionAuxiliar.get('/asignacion-auxiliar/:id', asignacion_auxiliar_controller_1.default.getInstance().getSingle);
asignacionAuxiliar.get('/asignacion-auxiliar/view/:id', asignacion_auxiliar_controller_1.default.getInstance().getMyCourses);
asignacionAuxiliar.get('/asignacion-auxiliar/est/:id', asignacion_auxiliar_controller_1.default.getInstance().getMyCoursesEst);
asignacionAuxiliar.get('/asignacion-auxiliar/alumnos/:id', asignacion_auxiliar_controller_1.default.getInstance().getMyStudents);
asignacionAuxiliar.post('/asignacion-auxiliar', asignacion_auxiliar_controller_1.default.getInstance().create);
asignacionAuxiliar.put('/asignacion-auxiliar/:id', asignacion_auxiliar_controller_1.default.getInstance().update);
asignacionAuxiliar.delete('/asignacion-auxiliar/:id', asignacion_auxiliar_controller_1.default.getInstance().delete);
exports.default = asignacionAuxiliar;