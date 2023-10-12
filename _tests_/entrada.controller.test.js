const request = require('supertest');
const server = require('../app');

describe("Entrada Controller Tests", () => {
    test("Obtener todas las entradas", async () => {
        return request(server)
            .get('/entradas')
            .send().expect(200);
    });

    test("Crear Entrada", async () => {
        const date = new Date();
        const fecha = date.toISOString();
        const serie = date.getFullYear() + 'E';
        const observaciones = "Testing";
        const id_usuario = 1;
        const id_almacen = 1;
        const emisor = "Test";
        const id_evento = 2;
        const id_comunidad = 1;

        return request(server)
            .post('/entradas/entradas')
            .send({ fecha: fecha, 
                    serie: serie, 
                    observaciones: observaciones, 
                    id_usuario: id_usuario, 
                    id_almacen: id_almacen, 
                    emisor: emisor, 
                    id_evento: id_evento, 
                    id_comunidad: id_comunidad })
            .expect(200)
            .then((res) => {
                expect(res.body.id_entrada).toEqual(expect.any(Number));
                expect(res.body.fecha).toEqual(fecha);
                expect(res.body.serie).toEqual(serie);
                expect(res.body.observaciones).toEqual(observaciones);
                expect(res.body.id_usuario).toEqual(id_usuario);
                expect(res.body.id_almacen).toEqual(id_almacen);
                expect(res.body.emisor).toEqual(emisor);
                expect(res.body.id_evento).toEqual(id_evento);
                expect(res.body.id_comunidad).toEqual(id_comunidad);
            });
    });

    test("Obtener entrada por ID", async () => {
        const date = new Date();
        const fecha = date.toISOString();
        const serie = date.getFullYear() + 'E';
        const observaciones = "Testing";
        const id_usuario = 1;
        const id_almacen = 1;
        const emisor = "Test";
        const id_evento = 2;
        const id_comunidad = 1;

        return request(server)
            .post('/entradas/entradas')
            .send({ fecha: fecha, 
                    serie: serie, 
                    observaciones: observaciones, 
                    id_usuario: id_usuario, 
                    id_almacen: id_almacen, 
                    emisor: emisor, 
                    id_evento: id_evento, 
                    id_comunidad: id_comunidad })
            .expect(200)
            .then((res) => {
                const newID = res.body.id_entrada;
                return request(server)
                    .get('/entradas/'+newID)
                    .expect(200)

            });
    });

    test("Obtener entrada que no existe", async () => {
        return request(server)
            .get('/entradas/' + 999999999999)
            .send()
           .expect(204);
    });

    test("Crear Entrada con datos invalidos", async () => {
        const date = new Date();
        const fecha = date.toISOString();
        const serie = date.getFullYear() + 'E';
        const observaciones = "Testing";
        const emisor = "Test";

        return request(server)
            .post('/entradas/entradas')
            .send({ fecha: fecha, 
                    serie: serie, 
                    observaciones: observaciones, 
                    id_usuario: "", 
                    id_almacen: "", 
                    emisor: emisor, 
                    id_evento: "", 
                    id_comunidad: "" })
            .expect(400)
    });

    test("Obtener todas las entradas por almacenista", async () => {
        const id_usuario = 1;
        return request(server)
            .get('/entradas/entradas-usuario/' + id_usuario)
            .send().expect(200);
    });

    test("Crear detalles de entrada", async () => {
        const id_entrada = 21;
        const id_producto = 1;
        const cantidad = 20;
        const precio_unitario = 2.99;

        return request(server)
            .post('/entradas/entradas-detalles')
            .send([{
                    id_entrada: id_entrada, 
                    id_producto: id_producto, 
                    cantidad: cantidad, 
                    precio_unitario: precio_unitario
                   },
                   {
                    id_entrada: id_entrada, 
                    id_producto: id_producto, 
                    cantidad: cantidad, 
                    precio_unitario: precio_unitario
                   }])
            .expect(201)
            .then((res) => {
                const detalles = res.body;
                expect(Array.isArray(detalles)).toBe(true);

                detalles.forEach((item) => {
                    expect(item.id_entrada_detalle).toEqual(expect.any(Number));
                    expect(item.id_entrada).toEqual(id_entrada);
                    expect(item.id_producto).toEqual(id_producto);
                    expect(item.cantidad).toEqual(cantidad);
                    expect(item.precio_unitario).toEqual(precio_unitario);
                });
                
            });
    });

    test("Crear detalles de entrada con datos invalidos", async () => {
        const id_entrada = 30;

        return request(server)
            .post('/entradas/entradas-detalles')
            .send([{
                    id_entrada: id_entrada, 
                    id_producto: "", 
                    cantidad: "", 
                    precio_unitario: ""
                   },
                   {
                    id_entrada: id_entrada, 
                    id_producto: "", 
                    cantidad: "", 
                    precio_unitario: ""
                   }])
            .expect(400)
    });

    test("Obtener detalles de una entrada", async () => {
        const id_entrada = 24;
        const id_producto = 1;
        const cantidad = 20;
        const precio_unitario = 2.99;

        return request(server)
            .post('/entradas/entradas-detalles')
            .send([{
                        id_entrada: id_entrada, 
                        id_producto: id_producto, 
                        cantidad: cantidad, 
                        precio_unitario: precio_unitario
                    },
                    {
                        id_entrada: id_entrada, 
                        id_producto: id_producto, 
                        cantidad: cantidad, 
                        precio_unitario: precio_unitario
                    }])
            .expect(201)
            .then((res) => {
                return request(server)
                    .get('/entradas/entrada-detalles/' + id_entrada)
                    .send()
                    .expect(200);
            });
    });

    test("Obtener detalles de entrada que no existen", async () => {
        return request(server)
            .get('/entradas/entrada-detalles/' + 999999999999)
            .send()
           .expect(204);
    });


})