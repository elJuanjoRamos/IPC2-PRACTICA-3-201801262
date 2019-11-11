-- USE DATABASE
USE Practica3;

-- INSERTAR TIPOS DE USUARIO
INSERT INTO RolUsuario(nombre, descripcion) VALUES ('Administrador', 'Administrador de la pagina web.');
INSERT INTO RolUsuario(nombre, descripcion) VALUES ('Usuario', 'Usuario final de la aplicacion.');

-- INSERTAR USUARIOS
INSERT INTO Usuario(username, password, nombre, apellido, idRolUsuario) VALUES ("admin","admin", "Administrador", "Adminitrador", 1);
INSERT INTO Usuario(username, password, nombre, apellido, idRolUsuario) VALUES ("user","user", "Usuario", "Usuario", 2);

