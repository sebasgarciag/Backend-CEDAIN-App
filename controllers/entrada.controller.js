const entradaService = require('../services/entrada.service');
const { validationResult } = require('express-validator');
const ExcelJS = require('exceljs');

/** 
 * Procesa el request POST para guardar una entrada
 * 
 * @param {Request} req.body - Contiene la informacion de una nueva entrada (JSON)
 * @param {Response} res - Response que en caso exitoso retornara la persona creada con status 201, 
 * o regresara error 400 en caso de que una de los datos sea invalida
 * @throws {Error} en caso de error en base de datos
 */
exports.postCrear = async function (req, res) {
    let result = validationResult(req);
    req.body.fecha = getCurrentDate();

    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result }); //if routes.js sends error, controller catches and sends error #.
    }

    try {
        let entrada = req.body;     //todo lo que viene en el json payload
        let entradaCreada = await entradaService.crear(entrada); 
        return res.status(201).json(entradaCreada);
    }
    catch (error) { //En caso de error relacionado a la base de datos, enter here.
        console.error("Error al intentar crear entrada: ", error);
        return res.status(500).json({ success: false, message: "Error durante proceso de crear entrada" });
    }
};


/**
 * This is a helper function needed by the above POST function 'postCrear'.
 * What it does is provide current date to it.
 * 
 * @function
 * @returns {Object} Current date.
 */
function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // months are zero-indexed in JS
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}



/**
 * Controla la creacion de "entradas-detalles".
 *
 * @async
 * @function
 * @param {Object} req - Contiene los datos enviados en JASON desde routes.
 * @param {Object} res - En caso de una creacion lograda, regresa el objeto con los datos.
 * @returns {Object} JSON con detalles de productos, o mensaje de error.
 * @throws 500 si hay un error en la creacion o en la base de datos.
 */
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


/**
 * Controla el GET de "" o "entradas?date=YYYY-MM-DD"
 *
 * @async
 * @function
 * @param {Object} req - Contiene nada o la fecha la cual se buscan las entrdas.
 * @param {Object} res - Regresa entradas. Todas, o por fecha especificada.
 * @returns {Object} JSON con detalles de productos, o mensaje de error.
 * @throws 500 si hay un error en la creacion o en la base de datos.
 */
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
            return res.json(entradaPorFecha).status(200);
        }
        catch (error) {
            console.error("Error en entradasPorFecha.service.js: ", error);
            return res.status(500).json({ success: false, message: "Error durante getPorFecha." }); //This message can be seen by the user. We don't specify errors to the user.
            
        }
    }
};


/**
 * Controla el GET por id dado.
 *
 * @async
 * @function
 * @param {Object} req - Contiene el ID por el cual se buscan las entradas.
 * @param {Object} res - Regresa entrada.
 * @returns {Object} JSON con detalles de esa entrada, o mensaje de error.
 * @throws 500 si hay un error en la busqueda.
 */
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


/**
 * Controla el GET de /entradas-usuario/:id"
 *
 * @async
 * @function
 * @param {Object} req - id del usuario del cual se quieren ver las entradas.
 * @param {Object} res - Regresa entradas.
 * @returns {Object} JSONs de cada entrada hecha por el usuario (id).
 * @throws 500 si hay un error en busqueda.
 */
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
//se iba a quitar.
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


/**
 * Controla el GET de /entrada-detalles/:idEntrada
 *
 * @async
 * @function
 * @param {Object} req - Contiene ID de la entrada la cual se busca ver los detalles (productos).
 * @param {Object} res - Regresa detalles.
 * @returns {Object} JSON con detalles de productos, o mensaje de error.
 * @throws 500 si hay un error.
 */
exports.getDetallesPorId = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idEntrada = req.params.idEntrada;
        let entradaDetalles = await entradaService.detallesPorId(idEntrada);

        if (entradaDetalles !== undefined) {
            if (entradaDetalles.length > 0) {
                res.status(200).json(entradaDetalles);
            } else {
                res.status(204).send(); // Send a "no content" response
            }
        } else {
            res.status(204).json({ success: false });
        }        
    }
};

/**
 * Controla la exportación de la entrada y sus detalles a un archivo Excel.
 *
 * @async
 * @function
 * @param {Object} req - Contiene el ID de la entrada que se desea exportar.
 * @param {Object} res - Regresa un archivo Excel con la entrada y sus detalles.
 * @returns {Object} Archivo Excel con la entrada y sus detalles, o mensaje de error.
 * @throws 500 si hay un error durante el proceso de exportación o si no se encuentra la entrada.
 * 
 * Controla el GET de la ruta: http://localhost:8080/entradas/exportar/:id
 */
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





