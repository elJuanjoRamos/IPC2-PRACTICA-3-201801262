"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var actividad_controller_1 = __importDefault(require("./../controller/actividad.controller"));
var actividad = express_1.Router();
actividad.get('/actividad/:id', actividad_controller_1.default.getInstance().getSingle);
actividad.get('/actividad/miactividad/:id', actividad_controller_1.default.getInstance().getMyActivity);
actividad.get('/miactiv/:id', actividad_controller_1.default.getInstance().getMisActiv);
actividad.post('/actividad', actividad_controller_1.default.getInstance().create);
actividad.post('/miactividad', actividad_controller_1.default.getInstance().createMiActividad);
actividad.put('/actividad/:id', actividad_controller_1.default.getInstance().update);
actividad.delete('/actividad/:id', actividad_controller_1.default.getInstance().delete);
exports.default = actividad;