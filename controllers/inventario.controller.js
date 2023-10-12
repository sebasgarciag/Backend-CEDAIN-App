const inventarioService = require('../services/inventario.service');
const { validationResult } = require('express-validator');
const ExcelJS = require('exceljs');

exports.getBuscarTodosProductos = async function (req, res) {
    
    //if undifined, traer todas. else traete las fechas
    let idAlmacen = req.query.idAlmacen;
    if(idAlmacen == undefined){
        let producto = await inventarioService.buscarTodosProductos();
        res.json(producto).status(200);
    }else{
        let inventarios = await inventarioService.buscarInventarioPorAlmacen(idAlmacen);

        if (inventarios !== undefined && inventarios.length > 0) {
            res.json(inventarios).status(200);
        } else {
            res.status(204).json({ success: false });
        } 
    }
};

exports.getBuscarPorAlmacen = async function (req, res) {
    console.log("Funcion de getBuscarPorAlmacen llamada")
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idAlmacen = req.params.id;
        let inventarios = await inventarioService.buscarInventarioPorAlmacen(idAlmacen);
        console.log("Detalles del inventario obtenidos: ", inventarios)

        if (inventarios !== undefined && inventarios.length > 0) {
            res.json(inventarios).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};


exports.postCrear = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } 
    else {
        let inventario = req.body; //todo lo que viene en el json cargo
        try{
            let inventarioCreado = await inventarioService.crear(inventario);
            res.json(inventarioCreado).status(201);
        }
        catch{
            res.json({Error:"Datos duplicados"}).status(400)
        }
    }    
};

exports.putProductos = async function (req,res){
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result }); //aqui manda los errores
    } else {
        let inventario = req.body;
        let idInventario = req.params.id;
        let inventarioActualizado = await inventarioService.updateInventario(idInventario,inventario);

        if (inventarioActualizado == true) {
            res.status(200).json({ success: true });
        } else {
            res.status(204).json({ success: false });
        }        

    }    
    
};

exports.putModificarInventario = async function (req, res){
    let result = validationResult(req);

    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result });
    } else {
        const inventario = req.body; // Puede ser un objeto o un arreglo de objetos.

        if (Array.isArray(inventario)) {
            // Si inventario es un arreglo de objetos, procesa cada producto por separado.
            for (const producto of inventario) {
                const idProducto = producto.id_producto;
                const idAlmacen = producto.id_almacen;

                const inventarioModificado = await inventarioService.actualizarExistencias(producto, idProducto, idAlmacen);

                if (inventarioModificado == false) {
                    return res.status(204).json({ success: false });
                }
            }

            // Si todos los productos se actualizaron correctamente, envía una respuesta exitosa.
            res.status(200).json({ success: true });
        } else {
            // Si inventario es un solo objeto, procesa ese producto.
            const idProducto = inventario.id_producto;
            const idAlmacen = inventario.id_almacen;

            const inventarioModificado = await inventarioService.actualizarExistencias(inventario, idProducto, idAlmacen);

            if (inventarioModificado == true) {
                res.status(200).json({ success: true });
            } else {
                res.status(204).json({ success: false });
            }
        }
    }
};

/**
 * Solicita la exportación de todos los datos del inventario para un ID específico.
 *
 * @async
 * @function
 * @param {string|number} invId - El ID del inventario para el cual se desea exportar los datos.
 * @returns {ArrayBuffer} - Retorna un ArrayBuffer con los datos del inventario exportados.
 * @throws {Error} - Lanza un error si no se reciben datos del inventario desde el servidor o si ocurre cualquier otro error.
 */

exports.exportarInventarioPorIdExcel = async function(req, res) {
    try {
        const idAlmacen = req.params.id;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Inventario');

        // Estilo para los encabezados
        const headerStyle = {
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFD5A6' }
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

        worksheet.columns = [
            { header: 'ID Inventario', key: 'id_inventario', width: 15 },
            { header: 'ID Producto', key: 'id_producto', width: 15 },
            { header: 'ID Almacén', key: 'id_almacen', width: 15 },
            { header: 'Cantidad', key: 'cantidad', width: 10 }
        ];

        // Aplicar estilo a los encabezados de la hoja
        worksheet.getRow(1).eachCell((cell) => {
            Object.assign(cell.style, headerStyle);
        });

        // Obtener todos los datos del inventario para un almacén específico
        const inventarios = await inventarioService.buscarInventarioPorAlmacen(idAlmacen);

        // Añadir los datos del inventario a la hoja
        inventarios.forEach(inventario => {
            worksheet.addRow(inventario.dataValues);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=inventario-' + idAlmacen + '.xlsx');
        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        res.status(500).send('Error al exportar el inventario a Excel: ' + error.message);
    }
};

/*

/**
 * Procesa el request GET para obtener una persona por medio de su id
 * @param {Request} req - Request 
 * @param {Response} res - Response Persona que pertenece al id proporcionado
 
exports.getBuscarPorAlm= async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idAlmacen = req.params.id;
        let inventario = await personaService.buscarPorId(idPersona);

        if (persona !== undefined) {
            res.json(persona).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};
*/
