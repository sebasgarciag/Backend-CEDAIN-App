const request = require('supertest');
const server = require('../app');

describe("Salida Controller Tests", () => {
    test("Obtener todas las salidas", async () => {
        return request(server)
            .get('/salidas')
            .send().expect(200);
    });

    test("Crear Salida", async () => {
        const date = new Date();
        const fecha = date.toISOString();
        const facturar = 0;
        const serie = date.getFullYear() + 'S';
        const observaciones = "Testing";
        const id_usuario = 1;
        const id_almacen = 1;
        const receptor = "Test";
        const id_evento = 2;
        const id_tipo_pago = 1;

        return request(server)
            .post('/salidas')
            .send({ fecha: fecha, 
                    facturar: facturar,
                    serie: serie, 
                    observaciones: observaciones, 
                    id_usuario: id_usuario, 
                    id_evento: id_evento, 
                    id_almacen: id_almacen,
                    receptor: receptor,  
                    id_tipo_pago: id_tipo_pago })
            .expect(200)
            .then((res) => {
                expect(res.body.id_salida).toEqual(expect.any(Number));
                expect(res.body.fecha).toEqual(fecha);
                expect(res.body.serie).toEqual(serie);
                expect(res.body.observaciones).toEqual(observaciones);
                expect(res.body.id_usuario).toEqual(id_usuario);
                expect(res.body.id_evento).toEqual(id_evento);
                expect(res.body.id_almacen).toEqual(id_almacen);
                expect(res.body.receptor).toEqual(receptor);
                expect(res.body.id_tipo_pago).toEqual(id_tipo_pago);
            });
    });

    test("Crear Salida con datos invalidos", async () => {
        const date = new Date();
        const fecha = date.toISOString();
        const serie = date.getFullYear() + 'S';
        const observaciones = "Testing";
        const receptor = "Test";

        return request(server)
            .post('/salidas')
            .send({ fecha: fecha, 
                    serie: serie, 
                    observaciones: observaciones, 
                    id_usuario: "", 
                    id_evento: "",
                    id_almacen: "", 
                    receptor: receptor, 
                    id_tipo_pago: "" })
            .expect(400)
    });

    test("Obtener todas las salidas por almacenista", async () => {
        const id_usuario = 1;
        return request(server)
            .get('/salidas/salidas-usuario/' + id_usuario)
            .send().expect(200);
    });

    test("Crear detalles de salida", async () => {
        const id_salida = 5;
        const id_producto = 1;
        const cantidad = 20;
        const precio_unitario = 2.99;

        return request(server)
            .post('/salidas/salidas-detalles')
            .send([{
                    id_salida: id_salida, 
                    id_producto: id_producto, 
                    cantidad: cantidad, 
                    precio_unitario: precio_unitario
                   },
                   {
                    id_salida: id_salida, 
                    id_producto: id_producto, 
                    cantidad: cantidad, 
                    precio_unitario: precio_unitario
                   }])
            .expect(201)
            .then((res) => {
                const detalles = res.body;
                expect(Array.isArray(detalles)).toBe(true);

                detalles.forEach((item) => {
                    expect(item.id_salida_detalle).toEqual(expect.any(Number));
                    expect(item.id_salida).toEqual(id_salida);
                    expect(item.id_producto).toEqual(id_producto);
                    expect(item.cantidad).toEqual(cantidad);
                    expect(item.precio_unitario).toEqual(precio_unitario);
                });
                
            });
    });

    test("Crear detalles de salida con datos invalidos", async () => {
        const id_salida = 7;

        return request(server)
            .post('/salidas/salidas-detalles')
            .send([{
                    id_salida: id_salida, 
                    id_producto: "", 
                    cantidad: "", 
                    precio_unitario: ""
                   },
                   {
                    id_salida: id_salida, 
                    id_producto: "", 
                    cantidad: "", 
                    precio_unitario: ""
                   }])
            .expect(400)
    });

    test("Obtener detalles de una salida", async () => {
        const id_salida = 2;
        const id_producto = 1;
        const cantidad = 20;
        const precio_unitario = 2.99;

        return request(server)
            .post('/salidas/salidas-detalles')
            .send([{
                        id_salida: id_salida, 
                        id_producto: id_producto, 
                        cantidad: cantidad, 
                        precio_unitario: precio_unitario
                    },
                    {
                        id_salida: id_salida, 
                        id_producto: id_producto, 
                        cantidad: cantidad, 
                        precio_unitario: precio_unitario
                    }])
            .expect(201)
            .then((res) => {
                return request(server)
                    .get('/salidas/salida-detalles/' + id_salida)
                    .send()
                    .expect(200);
            });
    });

    test("Obtener detalles de salida que no existen", async () => {
        return request(server)
            .get('/salidas/salida-detalles/' + 999999999999)
            .send()
           .expect(204);
    });

    test("Obtener comunidades", async () => {
        return request(server)
            .get('/salidas/comunidades')
            .send()
           .expect(200);
    });

    test("Obtener eventos", async () => {
        return request(server)
            .get('/salidas/eventos')
            .send()
           .expect(200);
    });


})