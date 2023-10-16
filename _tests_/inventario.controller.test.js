
/**
 * Módulo de pruebas para InventarioController.
 * 
 * Este módulo realiza pruebas en la función exportarInventarioPorIdExcel del InventarioController,
 * asegurándose de que maneje correctamente la generación y el envío de archivos Excel basados en el inventario,
 * y que maneje los errores adecuadamente.
 * 
 * @module inventarioControllerTest
 */

const { exportarInventarioPorIdExcel } = require('../controllers/inventario.controller');
const inventarioService = require('../services/inventario.service');
const httpMocks = require('node-mocks-http');

describe('exportarInventarioPorIdExcel', () => {
  let req, res, next;
  let mockInventario;

  beforeEach(() => {

     /**
     * Configuración inicial común para cada caso de prueba.
     * 
     * Crea objetos simulados para la solicitud (req), la respuesta (res) y el siguiente middleware (next),
     * y define un inventario simulado para usar en las pruebas.
     */

    req = httpMocks.createRequest({
      method: 'GET',
      url: '/inventario/exportar/:id',
      params: {
        id: '1', // puedes cambiar esto para probar diferentes IDs de almacén
      },
    });
    res = httpMocks.createResponse();
    next = jest.fn();

    mockInventario = [
        // ... datos del inventario simulados
      {
        id_inventario: 1,
        id_producto: 1,
        id_almacen: 1,
        cantidad: 100,
        producto: {
          id_producto: 1,
          nombre: "cuchara",
          id_tamanio: 1,
          medida: "1",
          precio_venta: "100.00",
          precio_trueque: "210.00",
          id_categoria: 2,
          nombre_corto: "cra",
          suspendido: false,
          Tamanio: {
            id_tamanio: 1,
            descripcion: "Mini"
          }
        }
      },
      // ... otros objetos de inventario
    ];

    jest.spyOn(inventarioService, 'buscarInventarioPorAlmacen').mockResolvedValue(mockInventario);
  });

  afterEach(() => {

    /**
     * Limpieza después de cada prueba.
     * 
     * Restaura todos los mocks para asegurarse de que no haya interferencias entre las pruebas.
     */

    jest.restoreAllMocks();
  });

  it('debería crear y enviar un archivo Excel con el inventario', async () => {
    /**
     * Prueba la funcionalidad de creación y envío de archivos Excel.
     * 
     * Verifica si la función responde con el estado correcto, los encabezados adecuados y el contenido del archivo Excel.
     */
    await exportarInventarioPorIdExcel(req, res, next);

    // Verificaciones sobre los headers y el status de la respuesta

    expect(res.statusCode).toBe(200);
    expect(res.getHeader('Content-Type')).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    expect(res.getHeader('Content-Disposition')).toContain('attachment; filename=inventario-1.xlsx');

  });

  it('debería manejar errores y enviar una respuesta adecuada', async () => {
    /**
     * Prueba el manejo de errores de la función exportarInventarioPorIdExcel.
     * 
     * Este caso de prueba verifica si la función maneja adecuadamente los errores que pueden ocurrir
     * durante la operación de búsqueda del inventario. Se simula un escenario en el que la búsqueda del
     * inventario arroja un error, y se comprueba si la función responde con el código de estado adecuado
     * y el mensaje de error correcto.
     */

    // Simula un error en el servicio de búsqueda de inventario
    jest.spyOn(inventarioService, 'buscarInventarioPorAlmacen').mockRejectedValue(new Error('Error simulado'));

    // Llama a la función con la solicitud simulada, la respuesta y el siguiente middleware
    await exportarInventarioPorIdExcel(req, res, next);

    // Realiza las aserciones necesarias para verificar que la función maneja el error como se espera

    // Verifica si el código de estado de la respuesta es 500, lo que indica un error interno del servidor
    expect(res.statusCode).toBe(500);

    // Verifica si el cuerpo de la respuesta contiene el mensaje de error correcto
    expect(res._getData()).toEqual('Error al exportar el inventario a Excel: Error simulado');
  });

});
