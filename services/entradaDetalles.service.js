const db = require('../models');

exports.buscarPorId = async function(idEntrada) { //RETURNS INFO FROM THE ID GIVEN ONLY
    let entradaDetalles;

    entradaDetalles = await db.EntradaDetalles.findAll({ //entre todas, busca la que tenga idEntrada igual
        where: {
            id_entrada: idEntrada
        }
    });

    if (entradaDetalles.length > 0) {
        entradaDetalles = entradas[0];
    }

    return entradaDetalles;
};