const tokenService = require('../services/token');

module.exports = {
    verificarUsuario: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send(
                {
                    message: 'No token'
                }
            );
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol === 'Administrador' || response.rol === 'Gestor') {
            next();
        } else {
            return res.status(403).send(
                {
                    message: 'No autorizado'
                }
            );
        }
    },
    verificarAdministrador: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send(
                {
                    message: 'No token'
                }
            );
        }
        const response = await tokenService.decode(req.headers.token);
        if (response.rol == 'Administrador') {
            next();
        } else {
            return res.status(403).send(
                {
                    message: 'No autorizado'
                }
            );
        }
    },
}