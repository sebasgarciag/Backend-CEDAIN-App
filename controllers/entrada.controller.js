const entradaService = require('../services/entrada.service');
const { validationResult } = require('express-validator');
const ExcelJS = require('exceljs');

/**
 * Procesa el request POST para guardar una persona
 * @param {Request} req - Request que contiene la informacion de una nueva persona
 * @param {Response} res - Response que en caso exitoso retornara la persona creada con status 201, o regresara error 400 en caso de que una de los datos sea invalida
 */
exports.postCrear = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result }); //if routes.js sends error, controller catches and sends error #.
    } 
    
    try {
        let entrada = req.body;     //todo lo que viene en el json payload
        let entradaCreada = await entradaService.crear(entrada); 
        return res.json(entradaCreada).status(201);
    }
    catch (error) { //En caso de error relacionado a la base de datos, enter here.
        console.error("Error al intentar crear entrada: ", error);
        return res.status(500).json({ success: false, message: "Error durante proceso de crear entrada" });
    }
};


exports.postEntradasDetalles = async function (req, res){
    let result = validationResult(req);
    
    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result }); //if routes.js sends error, controller catches and sends error #.
    } 
    
    try{
        let productosEntrada = req.body;
        let detallesCreados = await entradaService.crearEntradaDetalle(productosEntrada);
        return res.status(201).json(detallesCreados);
    }
    catch (error) { //unexpected error are cought here. Keeping the server from crashing.
        console.error("Error al intentar crear entrada: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

};


exports.getBuscarTodas = async function (req, res) {

    //if undifined, traer todas. else traer entradas en fecha dada.
    let date = req.query.date;
    console.log(date);
    if (date == undefined){
        let entrada = await entradaService.buscarTodas();
        res.json(entrada).status(200);
    }
    else {//mandar traer por fecha
        
        //This keeps the server from crashing if date is given in wrong format.
        try{
            let entradaPorFecha = await entradaService.entradasPorFecha(date);
            return res.json(entradaPorFecha).status(201);
        }
        catch (error) {
            console.error("Error en entradasPorFecha.service.js: ", error);
            return res.status(500).json({ success: false, message: "Error durante getPorFecha." }); //This message can be seen by the user. We don't specify errors to the user.
            
        }
        //let entradaPorFecha = await entradaService.entradasPorFecha(date);
        //return res.json(entradaPorFecha).status(201);
    }

};


exports.getBuscarPorId = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idEntrada = req.params.id;
        let entrada = await entradaService.buscarPorId(idEntrada);

        if (entrada !== undefined) {
            res.json(entrada).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};


exports.getEntradasPorUsuario = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idUsuario = req.params.id;
        let entrada = await entradaService.buscarEntradasDeUsuario(idUsuario);

        if (entrada !== undefined) {
            res.json(entrada).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};





//UPDATE EXISTING
exports.updateEntrada = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result }); //aqui manda los errores
    } else {
        let entrada = req.body;
        let idEntrada = req.params.id;
        let entradaActualizada = await entradaService.updateEntrada(idEntrada, entrada);

        if (entradaActualizada == true) {
            res.status(200).json({ success: true });
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
        let idEntrada = req.params.idEntrada;
        let entradaDetalles = await entradaService.detallesPorId(idEntrada);

        if (entradaDetalles !== undefined) {
            res.json(entradaDetalles).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};


exports.exportCombinedToExcel = async function (req, res) {
    let idEntrada = req.params.id;
    const workbook = new ExcelJS.Workbook();

    // Crear hoja 'Entrada'
    const worksheetEntrada = workbook.addWorksheet('Entrada');

    // Obtener los detalles de la entrada para exportarPorId
    let entrada = await entradaService.buscarPorId(idEntrada);
    if (!entrada) {
        return res.status(404).json({ success: false, message: "Entrada no encontrada" });
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

    // Añadir encabezados y datos para exportarPorId en hoja 'Entrada'
    worksheetEntrada.columns = [
        { header: 'ID Entrada', key: 'id_entrada' },
        { header: 'Fecha', key: 'fecha' },
        { header: 'Folio', key: 'folio' },
        { header: 'Serie', key: 'serie' },
        { header: 'Observaciones', key: 'observaciones' },
        { header: 'ID Usuario', key: 'id_usuario' },
        { header: 'ID Almacén', key: 'id_almacen' },
        { header: 'Emisor', key: 'emisor' },
        { header: 'ID Comunidad', key: 'id_comunidad' },
        { header: 'ID Evento', key: 'id_evento' },
        { header: 'Creado', key: 'createdAt' },
        { header: 'Actualizado', key: 'updatedAt' },
        { header: 'Precio Trueque', key: 'Precio_trueque' }
    ];
    worksheetEntrada.addRow(entrada);
    
    // Aplicar estilo a los encabezados de la hoja 'Entrada'
    worksheetEntrada.getRow(1).eachCell(cell => {
        Object.assign(cell, headerStyle);
    });

    // Crear hoja 'Detalles de la Entrada'
    const worksheetDetalles = workbook.addWorksheet('Detalles de la Entrada');

    // Añadir encabezados para exportToExcel en hoja 'Detalles de la Entrada'
    worksheetDetalles.columns = [
        { header: 'ID Detalle Entrada', key: 'id_entrada_detalle', width: 20 },
        { header: 'ID Entrada', key: 'id_entrada', width: 20 },
        { header: 'ID Producto', key: 'id_producto', width: 20 },
        { header: 'Cantidad', key: 'cantidad', width: 20 },
        { header: 'Precio Unitario', key: 'precio_unitario', width: 20 },
        { header: 'Nombre Producto', key: 'nombre_producto', width: 20 }
    ];

    // Aplicar estilo a los encabezados de la hoja 'Detalles de la Entrada'
    worksheetDetalles.getRow(1).eachCell(cell => {
        Object.assign(cell, headerStyle);
    });

    // Obtener los detalles de entrada para exportToExcel
    let entradaDetalles = await entradaService.detallesPorId(idEntrada);
    console.log("Detalles obtenidos:", entradaDetalles);

    if (entradaDetalles && entradaDetalles.length > 0) {
        entradaDetalles.forEach(detalle => {
            worksheetDetalles.addRow({
                id_entrada_detalle: detalle.dataValues.id_entrada_detalle,
                id_entrada: detalle.dataValues.id_entrada,
                id_producto: detalle.dataValues.id_producto,
                cantidad: detalle.dataValues.cantidad,
                precio_unitario: detalle.dataValues.precio_unitario,
                nombre_producto: detalle.dataValues.producto.dataValues.nombre
            });
        });
    } else {
        console.warn("No se encontraron detalles para el ID:", idEntrada);
    }

    // Enviar el archivo Excel como respuesta
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=Entrada.xlsx");
    workbook.xlsx.write(res).then(() => {
        res.status(200).end();
    });
};





