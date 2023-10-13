const salidaService = require('../services/salida.service');
const { validationResult } = require('express-validator');
const ExcelJS = require('exceljs');

exports.getBuscarTodas = async function (req, res) {
    let salida = await salidaService.buscarTodas();
    res.json(salida).status(200);
};


exports.postCrearSalida = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result }); //if routes.js sends error, controller catches and sends error #.
    } 
    
    try {
        let salida = req.body;     //todo lo que viene en el json payload
        let salidaCreada = await salidaService.crearSalida(salida); 
        return res.json(salidaCreada).status(201);
    }
    catch (error) { //En caso de error relacionado a la base de datos, enter here.
        console.error("Error al intentar crear salida: ", error);
        return res.status(500).json({ success: false, message: "Error durante proceso de crear salida" });
    }
};

exports.getBuscarTodasComunidades = async function (req, res) {
    let Comunidades = await salidaService.buscarTodasComunidades();
    res.json(Comunidades).status(200);
};
exports.getBuscarTodosEventos = async function (req, res) {
    let Eventos = await salidaService.buscarTodosEventos();
    res.json(Eventos).status(200);
};


exports.postSalidasDetalles = async function (req, res){
    let result = validationResult(req);

    console.log("======================");
    console.log("postSalidasDetalles");
    console.log("======================");
    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result }); //if routes.js sends error, controller catches and sends error #.
    } else {
        let productosSalida = req.body;
        let detallesCreados = await salidaService.crearSalidaDetalle(productosSalida);
        res.status(201).json(detallesCreados);
    } 

};

exports.getSalidasPorUsuario = async function (req, res) {
    let result = validationResult(req);
    
    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idUsuario = req.params.id;
        let salida = await salidaService.buscarSalidasDeUsuario(idUsuario);

        if (salida !== undefined) {
            res.json(salida).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};



exports.getDetallesPorId = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idSalida = req.params.idSalida;
        let salidaDetalles = await salidaService.detallesPorId(idSalida);

        if (salidaDetalles !== undefined) {
            if (salidaDetalles.length > 0) {
                res.json(salidaDetalles).status(200);
            } else {
                res.status(204).send(); // Send a "no content" response
            }
        } else {
            res.status(204).json({ success: false });
        }        
    }
};


exports.exportCombinedToExcel = async function (req, res) {
    let idSalida = req.params.id;
    const workbook = new ExcelJS.Workbook();

    // Crear hoja 'Salida'
    const worksheetSalida = workbook.addWorksheet('Salida');

    // Obtener los detalles de la salida para buscarPorId
    let salida = await salidaService.buscarPorId(idSalida);
    if (!salida) {
        return res.status(404).json({ success: false, message: "Salida no encontrada" });
    }

    // Estilo para los encabezados
    const headerStyle = {
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD5A6' }  // Color café clarito
        },
        font: {
            bold: true
        },
        border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }
    };

    // Añadir encabezados y datos para salida en hoja 'Salida'
    worksheetSalida.columns = [
        { header: 'ID Salida', key: 'id_salida' },
        { header: 'Fecha', key: 'fecha' },
        { header: 'Folio', key: 'folio' },
        { header: 'Facturar', key: 'facturar' },
        { header: 'Serie', key: 'serie' },
        { header: 'Observaciones', key: 'observaciones' },
        { header: 'ID Usuario', key: 'id_usuario' },
        { header: 'ID Evento', key: 'id_evento' },
        { header: 'ID Almacén', key: 'id_almacen' },
        { header: 'Receptor', key: 'receptor' },
        { header: 'ID Tipo Pago', key: 'id_tipo_pago' },
    ];
    worksheetSalida.addRow(salida);
    worksheetSalida.getRow(1).eachCell(cell => {
        Object.assign(cell, headerStyle);
    });

    // Crear hoja 'Detalles de la Salida'
    const worksheetDetalles = workbook.addWorksheet('Detalles de la Salida');
    worksheetDetalles.columns = [
        { header: 'ID Detalle Salida', key: 'id_salida_detalle' },
        { header: 'ID Salida', key: 'id_salida' },
        { header: 'ID Producto', key: 'id_producto' },
        { header: 'Cantidad', key: 'cantidad' },
        { header: 'Precio Unitario', key: 'precio_unitario' },
    ];
    worksheetDetalles.getRow(1).eachCell(cell => {
        Object.assign(cell, headerStyle);
    });

     // Obtener los detalles de salida
    let detallesSalida = await salidaService.detallesPorId(idSalida);
    console.log("Detalles obtenidos:", detallesSalida);

    if (detallesSalida && detallesSalida.length > 0) {
        detallesSalida.forEach(detalle => {
            worksheetDetalles.addRow({
                id_salida_detalle: detalle.dataValues.id_salida_detalle,
                id_salida: detalle.dataValues.id_salida,
                id_producto: detalle.dataValues.id_producto,
                cantidad: detalle.dataValues.cantidad,
                precio_unitario: detalle.dataValues.precio_unitario,
                nombre_producto: detalle.dataValues.producto.dataValues.nombre
            });
        });
    } else {
        console.warn("No se encontraron detalles para el ID:", idSalida);
    }

    // Enviar el archivo Excel como respuesta
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=Salida.xlsx");
    workbook.xlsx.write(res).then(() => {
        res.status(200).end();
    });
};