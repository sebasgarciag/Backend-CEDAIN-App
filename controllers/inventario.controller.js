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
        let idInventario = req.query.id_inventario;
        let cantidad = req.query.cantidad;
        let inventarioActualizado = await inventarioService.updateInventario(idInventario,cantidad);

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
 * @module InventarioController
 */

/**
 * Controlador para exportar datos de inventario de un almacén específico a un archivo Excel.
 * Este controlador genera un archivo Excel con los datos del inventario, aplica estilos 
 * al archivo y luego lo envía como una descarga al cliente que realizó la solicitud.
 * 
 * @async
 * @function exportarInventarioPorIdExcel
 * @param {object} req - Objeto de solicitud Express.
 * @param {object} req.params - Los parámetros de la URL de la solicitud.
 * @param {number} req.params.id - El ID del almacén cuyo inventario se exportará.
 * @param {object} res - Objeto de respuesta Express.
 * @returns {Promise<void>} Una promesa que indica el éxito o fracaso de la operación.
 * @throws {Error} Propaga cualquier error inesperado durante el procesamiento a la siguiente función middleware.
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

        /**
         * Definición de las columnas para la hoja de trabajo de Excel.
         * Cada objeto en el array define una columna en la hoja de trabajo, especificando el encabezado de la columna,
         * la clave correspondiente a la propiedad del objeto de datos, y el ancho de la columna.
         *
         * @type {Array}
         */

        worksheet.columns = [
            { header: 'ID Inventario', key: 'id_inventario', width: 15 },
            { header: 'ID Producto', key: 'id_producto', width: 15 },
            { header: 'ID Almacén', key: 'id_almacen', width: 15 },
            { header: 'Cantidad', key: 'cantidad', width: 10 },
            { header: 'Nombre Producto', key: 'nombre_producto', width: 30 },
            { header: 'Medida Producto', key: 'medida_producto', width: 15 },
            { header: 'Precio Venta', key: 'precio_venta', width: 15 },
            { header: 'Precio Trueque', key: 'precio_trueque', width: 15 },
            { header: 'Nombre Corto Producto', key: 'nombre_corto', width: 20 },
            { header: 'Suspendido', key: 'suspendido', width: 10 },
            { header: 'Tamaño Descripción', key: 'tamanio_descripcion', width: 20 }
        ];

        // Aplicar estilo a los encabezados de la hoja
        worksheet.getRow(1).eachCell((cell) => {
            Object.assign(cell.style, headerStyle);
        });

        // Obtener todos los datos del inventario para un almacén específico
        const inventarios = await inventarioService.buscarInventarioPorAlmacen(idAlmacen);

        // Procesar y añadir los datos del inventario a la hoja de Excel
        inventarios.forEach(inventario => {
            /**
             * Convertir el valor booleano de 'suspendido' a una cadena legible.
             * Si el producto no está definido o el estado 'suspendido' es null o undefined, 
             * se utiliza un valor por defecto de 'No disponible'.
             */
            let suspendidoStr = 'No disponible'; // valor por defecto si suspendido es null o undefined
            if (inventario.producto && inventario.producto.suspendido !== null && inventario.producto.suspendido !== undefined) {
                suspendidoStr = inventario.producto.suspendido ? 'Sí' : 'No';
            }
            
            /**
             * Crear un objeto con los valores de la fila actual.
             * Cada propiedad en el objeto corresponde a una columna en la hoja de Excel.
             * Si ciertos datos no están disponibles (por ejemplo, si 'producto' es null), 
             * los campos correspondientes se dejan en blanco.
             */


            let rowValues = {
                id_inventario: inventario.id_inventario,
                id_producto: inventario.id_producto,
                id_almacen: inventario.id_almacen,
                cantidad: inventario.cantidad,
                nombre_producto: inventario.producto ? inventario.producto.nombre : '',
                medida_producto: inventario.producto ? inventario.producto.medida : '',
                precio_venta: inventario.producto ? inventario.producto.precio_venta : '',
                precio_trueque: inventario.producto ? inventario.producto.precio_trueque : '',
                nombre_corto: inventario.producto ? inventario.producto.nombre_corto : '',
                tamanio_descripcion: inventario.producto && inventario.producto.Tamanio ? inventario.producto.Tamanio.descripcion : '',
                suspendido: suspendidoStr // usar la cadena convertida
            };
            worksheet.addRow(rowValues);
        });


        /**
         * Establecer el encabezado 'Content-Type' en la respuesta.
         * Esto informa al cliente que el contenido de la respuesta es un documento de Excel.
         */

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        /**
         * Establecer el encabezado 'Content-Disposition' en la respuesta con el nombre del archivo.
         * Esto indica al navegador que debe tratar la respuesta como un archivo que se va a descargar.
         * El archivo descargado tendrá el nombre proporcionado en 'filename'.
         */

        res.setHeader('Content-Disposition', 'attachment; filename=inventario-' + idAlmacen + '.xlsx');

         /**
         * Escribir los datos del libro de trabajo en la respuesta.
         * Esto envía el contenido del archivo Excel al cliente.
         */

        await workbook.xlsx.write(res);

        /**
         * Finalizar la respuesta.
         * Esto cierra la conexión y señala que la respuesta ha sido completamente enviada.
         */

        res.end();

    } catch (error) {

        /**
         * Enviar una respuesta de error con el código de estado 500.
         * El mensaje de error se construye utilizando información del error capturado.
         */

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
