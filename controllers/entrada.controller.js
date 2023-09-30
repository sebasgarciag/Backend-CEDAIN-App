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

exports.exportAllToExcel = async function (req, res) {
    console.log("Función exportAllToExcel llamada");  
    let entradas = await entradaService.buscarTodas();  // retorna todas las entradas

    if (!entradas || entradas.length === 0) {
        return res.status(404).json({ success: false, message: "No se encontraron entradas" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Entradas');

    worksheet.columns = [
        { header: 'ID Entrada', key: 'id_entrada', width: 15 },
        { header: 'Fecha', key: 'fecha', width: 15 },
        { header: 'Folio', key: 'folio', width: 10 },
        { header: 'Serie', key: 'serie', width: 10 },
        { header: 'Observaciones', key: 'observaciones', width: 30 },
        { header: 'ID Usuario', key: 'id_usuario', width: 15 },
        { header: 'ID Almacén', key: 'id_almacen', width: 15 },
        { header: 'Emisor', key: 'emisor', width: 20 },
        { header: 'ID Comunidad', key: 'id_comunidad', width: 15 },
        { header: 'ID Evento', key: 'id_evento', width: 15 },
        { header: 'Fecha de Creación', key: 'createdAt', width: 20 },
        { header: 'Fecha de Actualización', key: 'updatedAt', width: 20 },
        { header: 'Precio Trueque', key: 'Precio_trueque', width: 20 }
    ];
    
    entradas.forEach(entrada => {
        worksheet.addRow(entrada);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=Entradas.xlsx");
    workbook.xlsx.write(res).then(() => {
        res.status(200).end();
    });
};

exports.exportToExcel = async function (req, res) {
    console.log("Función exportToExcel por id llamada");
    
    let idEntrada = req.params.id;
    let entradaDetalles = await entradaService.detallesPorId(idEntrada);

    // Log para ver lo que devuelve entradaService.detallesPorId
    console.log("Detalles obtenidos:", entradaDetalles);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Entrada');

    // Definiendo las columnas para los detalles de entrada en el archivo Excel
    worksheet.columns = [
        { header: 'ID Detalle Entrada', key: 'id_entrada_detalle', width: 20 },
        { header: 'ID Entrada', key: 'id_entrada', width: 20 },
        { header: 'ID Producto', key: 'id_producto', width: 20 },
        { header: 'Cantidad', key: 'cantidad', width: 20 },
        { header: 'Precio Unitario', key: 'precio_unitario', width: 20 }
    ];

    // Agregando los datos de los detalles de entrada al archivo Excel
    if (entradaDetalles && entradaDetalles.length > 0) {
        entradaDetalles.forEach(detail => {
            worksheet.addRow(detail);
        });
    } else {
        console.warn("No se encontraron detalles para el ID:", idEntrada);
    }

    // Guardar el archivo Excel en memoria y enviarlo como respuesta
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=Entrada.xlsx");
    workbook.xlsx.write(res).then(() => {
        res.status(200).end();
    });
};