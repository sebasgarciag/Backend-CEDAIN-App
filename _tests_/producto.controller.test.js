const request = require('supertest');
const server = require('../app');

describe("Producto Controller Tests", () => {
    test("Obtener todos los productos", async () => {
        return request(server)
            .get('/productos')
            .send().expect(200);
    });

    test("Crear Producto", async () => {
        const nombre = new Date().getTime().toString();;
        const medida = "David";
        const precioVenta = 1;
        const precioTrueque = 1;
        const nombreCorto = "Corto";
        const tamanio = 1;
        const categoria = 1;
        const suspendido = 0;

        return request(server)
            .post('/productos')
            .send({ nombre: nombre, 
                    medida: medida, 
                    precio_venta: precioVenta, 
                    precio_trueque: precioTrueque, 
                    nombre_corto: nombreCorto, 
                    id_tamanio: tamanio, 
                    id_categoria: categoria,
                    suspendido: suspendido})
            .expect(201)
            .then((res) => {
                expect(res.body.id_producto).toEqual(expect.any(Number));
                expect(res.body.nombre).toEqual(nombre);
                expect(res.body.medida).toEqual(medida);
                expect(res.body.precio_venta).toEqual(precioVenta);
                expect(res.body.precio_trueque).toEqual(precioTrueque);
                expect(res.body.nombre_corto).toEqual(nombreCorto);
                expect(res.body.id_tamanio).toEqual(tamanio);
                expect(res.body.id_categoria).toEqual(categoria);
            });
    });

    test("Obtener producto por ID", async () => {
        const nombre = new Date().getTime().toString();;
        const medida = "David";
        const precioVenta = 1;
        const precioTrueque = 1;
        const nombreCorto = "Corto";
        const tamanio = 1;
        const categoria = 1;
        const suspendido = 0;


        return request(server)
            .post('/productos')
            .send({ nombre: nombre, 
                medida: medida, 
                precio_venta: precioVenta, 
                precio_trueque: precioTrueque, 
                nombre_corto: nombreCorto, 
                id_tamanio: tamanio, 
                id_categoria: categoria,
                suspendido: suspendido})
            .expect(201)
            .then((res) => {
                const newID = res.body.id_producto;
                return request(server)
                    .get('/productos/'+newID)
                    .expect(200)

            });
    });

    test("Editar producto", async () => {
        const nombre = new Date().getTime().toString();;
        const medida = "David";
        const precioVenta = 1;
        const precioTrueque = 1;
        const nombreCorto = "Corto";
        const tamanio = 1;
        const categoria = 1;
        const suspendido = 0;


        return request(server)
            .post('/productos')
            .send({ nombre: nombre, 
                medida: medida, 
                precio_venta: precioVenta, 
                precio_trueque: precioTrueque, 
                nombre_corto: nombreCorto, 
                id_tamanio: tamanio, 
                id_categoria: categoria,
                suspendido: suspendido})
            .expect(201)
            .then((res) => {
                const newID = res.body.id_producto;
                return request(server)
                    .put('/productos/'+newID)
                    .send({ nombre: nombre, 
                        medida: medida, 
                        precio_venta: precioVenta, 
                        precio_trueque: precioTrueque, 
                        nombre_corto: nombreCorto, 
                        id_tamanio: tamanio, 
                        id_categoria: categoria,
                        suspendido: suspendido})
                    .expect(200)

            });
    });

    test("Obtener producto que no existe", async () => {
        return request(server)
            .get('/productos/' + 999999999999)
            .send()
           .expect(204);
    });


})