const entradaDetallesService = require('../services/entradaDetalles.service');
const { validationResult } = require('express-validator');


exports.getBuscarPorId = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idEntrada = req.params.id;
        let entradaDetalles = await entradaDetallesService.buscarPorId(idEntrada);

        if (entradaDetalles !== undefined) {
            res.json(entradaDetalles).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};
