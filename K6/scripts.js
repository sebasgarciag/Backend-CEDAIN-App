import http from 'k6/http';
import { check, sleep } from 'k6';
// import { getProductosPorNombre } from '../controllers/producto.controller';

/**
 * Performance Tests (with K6)
 * Tests GETS and POSTS for: Entradas, Salidas
 */

//Tests can be conducted on the cloud's back end + DB, or on your local Back end + DB:
//const API_URL = "https://backend-cedain-app-xcfpf63vha-uc.a.run.app"; //Cloud's back end + DB <- DO NOT USE
const API_URL = "http://localhost:8080"; //Your local Back end + DB

//This variable controls how long each performance test takes.
//'30s' is advisable. 
const runTime = '10s';

export const options = {

    scenarios: {
        // Entradas POSTS
        postEntrada: {  //Test Case 1a
            executor: 'constant-vus',
            exec: 'crearEntrada',
            vus: 10,
            duration: runTime,
        },
        postEntradasDetalles: {
            executor: 'constant-vus',
            exec: 'crearEntradaDetalles',
            vus: 10,
            duration: runTime,
        },
        // Entradas GETS
        getEntradas: {  //Test Case 1b
            executor: 'constant-vus',
            exec: 'getEntradas',
            vus: 10,
            duration: runTime,
        },
        getEntradasID: {  //Test Case 1b
            executor: 'constant-vus',
            exec: 'getEntradasID',
            vus: 10,
            duration: runTime,
        },
        getEntradasUsuario: {  //Test Case 1b
            executor: 'constant-vus',
            exec: 'getEntradasUsuario',
            vus: 10,
            duration: runTime,
        },
        getEntradaDetalles: {  //Test Case 1b
            executor: 'constant-vus',
            exec: 'getEntradaDetalles',
            vus: 10,
            duration: runTime,
        },

        //Salidas POSTS
        //Salids GETS
        getEntradas: {
            executor: 'constant-vus',
            exec: 'getSalidas',
            vus: 10,
            duration: runTime,
        },
        getComunidades: {
            executor: 'constant-vus',
            exec: 'getComunidades',
            vus: 10,
            duration: runTime,
        },
        getEventos: {
            executor: 'constant-vus',
            exec: 'getEventos',
            vus: 10,
            duration: runTime,
        },
        getSalidaDetalles: {
            executor: 'constant-vus',
            exec: 'getSalidaDetalles',
            vus: 10,
            duration: runTime,
        },
        getSalidasUsuario: {
            executor: 'constant-vus',
            exec: 'getSalidasUsuario',
            vus: 10,
            duration: runTime,
        },
        //POST SALIDAS
        postCrearSalida: {
            executor: 'constant-vus',
            exec: 'postCrearSalida',
            vus: 10,
            duration: runTime,
        },
        postSalidasDetalles: {
            executor: 'constant-vus',
            exec: 'postSalidasDetalles',
            vus: 10,
            duration: runTime,
        },

        postProducto: {
            executor: 'constant-vus',
            exec: 'crearProducto',
            vus: 10,
            duration: runTime,
        },
        getProductos: {
            executor: 'constant-vus',
            exec: 'getProductos',
            vus: 10,
            duration: runTime,
        },
        getProductoId: {
            executor: 'constant-vus',
            exec: 'getProductoId',
            vus: 10,
            duration: runTime,
        },
        editarProducto: {
            executor: 'constant-vus',
            exec: 'editarProducto',
            vus: 10,
            duration: runTime,
        },
        getProductImage: {
            executor: 'constant-vus',
            exec: 'getProductoImage',
            vus: 10,
            duration: runTime,
        },


        // PUT Inventario
        putModificarInventario: {
            executor: 'constant-vus',
            exec: 'putEditarInventario',
            vus: 10
        },

        exportarInventario: {
            executor: 'constant-vus',
            exec: 'exportarInventarioExcel',
            vus: 10,
            duration: runTime,
        },
        buscarTodosProductos: {
            executor: 'constant-vus',
            exec: 'buscarTodosProductos',
            vus: 10,
            duration: runTime,
        },
        buscarInventarioPorAlmacen: {
            executor: 'constant-vus',
            exec: 'buscarInventarioPorAlmacen',
            vus: 10,
            duration: runTime,
            tags: { type: 'inventario' }
        },
        getProductosPorAlmacenExistenteTest: {
            executor: 'constant-vus',
            exec: 'getProductosPorAlmacenExistente',
            vus: 10,
            duration: runTime,
        },

        getProductosPorAlmacenInexistenteTest: {
            executor: 'constant-vus',
            exec: 'getProductosPorAlmacenInexistente',
            vus: 10,
            duration: runTime,
        },

        //Usuarios
        //Gets y Posts
        getUsuarios: {
            executor: 'constant-vus',
            exec: 'getUsuarios',
            vus: 10,
            duration: runTime,
        },
        getUsuarioId: {
            executor: 'constant-vus',
            exec: 'getUsuarioId',
            vus: 10,
            duration: runTime,
        },
        postCrearUsuario: {
            executor: 'constant-vus',
            exec: 'postCrearUsuario',
            vus: 10,
            duration: runTime,
        },
        postLogin: {
            executor: 'constant-vus',
            exec: 'postLogin',
            vus: 10,
            duration: runTime,
        },
        putEditarUsuario: {
            executor: 'constant-vus',
            exec: 'putEditarUsuario',
            vus: 10,
            duration: runTime,
        },

    }
}


//Functions
//Entradas
//Inventario


export function crearEntrada() {

    const serie = 11111;
    const observaciones = "k6 test";
    const id_usuario = 1; //try generating a random number between 1-(last user)
    const id_almacen = 1; //try generating a random number between 1-(last almacen)
    const emisor = "K6 test";
    const id_comunidad = 1; //try random numbers between x and y
    const id_evento = 1; //try random number

    const data = { serie, observaciones, id_usuario, id_almacen, emisor, id_comunidad, id_evento };
    //const data = { nombre: primerNombre, apellido: apellido };

    const response = http.post(`${API_URL}/entradas/entradas`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(
        response, { "POST crearEntrada status code is 201": (r) => r.status == 201 }
    );

    sleep(0.5);
}

export function crearEntradaDetalles() {

    const id_entrada = 20;
    const id_producto = 1;
    const cantidad = 1;
    const precio_unitario = 100;

    const data = [{ id_entrada, id_producto, cantidad, precio_unitario }];

    const response = http.post(`${API_URL}/entradas/entradas-detalles`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(
        response, { "POST crearEntradaDetalle status code is 201": (r) => r.status == 201 }
    );

    sleep(0.5);
}

export function getEntradas() {
    const response = http.get(`${API_URL}/entradas/`);
    check(
        response, { "GET entradas status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function getEntradasID() {
    var id = Math.floor(Math.random() * (200 - 120 + 1)) + 120; //Check this range is actually on DB
    const response = http.get(`${API_URL}/entradas/${id}`);
    check(
        response, { "GET entradas por ID status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function getEntradasUsuario() {
    var id = 1;
    const response = http.get(`${API_URL}/entradas/entradas-usuario/${id}`);
    check(
        response, { "GET entradas usuario status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function getEntradaDetalles() {
    var id = 20; //Check this range is actually on DB
    const response = http.get(`${API_URL}/entradas/entrada-detalles/${id}`);
    check(
        response, { "GET ENTRADAS DETALLES status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}
//Salidas
export function getSalidas() {
    const response = http.get(`${API_URL}/salidas`);
    check(
        response, { "GET todas las Salidas code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function getComunidades() {
    const response = http.get(`${API_URL}/salidas/comunidades`);
    check(
        response, { "GET All Comunidades status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function getEventos() {
    const response = http.get(`${API_URL}/salidas/eventos`);
    check(
        response, { "GET All Eventos status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function getSalidaDetalles() {
    var id = Math.floor(Math.random() * (5 - 1 + 1)) + 1; //Check this range is actually on DB
    const response = http.get(`${API_URL}/salidas/salida-detalles/${id}`);
    check(
        response, { "GET SALIDA DETALLES status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function getSalidasUsuario() {
    var id = 1;
    const response = http.get(`${API_URL}/salidas/salidas-usuario/${id}`);
    check(
        response, { "GET entradas usuario status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function postCrearSalida() {

    const serie = 11111;
    const observaciones = "k6 test";
    const id_usuario = Math.floor(Math.random() * (4 - 1 + 1)) + 1; //Check this range is actually on DB
    const id_almacen = 1;
    const emisor = "K6 test";
    const id_evento = Math.floor(Math.random() * (6 - 1 + 1)) + 1; //Check this range is actually on DB
    const receptor = "K6 Test";
    const fecha = "2011-01-01" //la fecha, al dia 13 de oct, se manda por el front end. should be done through backend

    const data = { serie, observaciones, id_usuario, id_almacen, emisor, id_evento, receptor, fecha };
    //const data = { nombre: primerNombre, apellido: apellido };

    const response = http.post(`${API_URL}/salidas`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(
        response, { "POST postCrearSalida status code is 201": (r) => r.status == 201 }
    );

    sleep(0.5);
}

export function postSalidasDetalles() {

    const id_salida = Math.floor(Math.random() * (7 - 1 + 1)) + 1; //Check this range is actually on DB
    const id_producto = Math.floor(Math.random() * (4 - 1 + 1)) + 1; //Check this range is actually on DB
    const cantidad = Math.floor(Math.random() * (100 - 1 + 1)) + 1; //Check this range is actually on DB
    const precio_unitario = Math.floor(Math.random() * (500 - 1 + 1)) + 1; //Check this range is actually on DB

    const data = [{ id_salida, id_producto, cantidad, precio_unitario }];

    const response = http.post(`${API_URL}/salidas/salidas-detalles`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(
        response, { "POST crearEntradaDetalle status code is 201": (r) => r.status == 201 }
    );

    sleep(0.5);
}


export function crearProducto() {
    const nombre = new Date().getTime().toString();
    const medida = "David";
    const precioVenta = 1;
    const precioTrueque = 1;
    const nombreCorto = "Corto";
    const tamanio = 1;
    const categoria = 1;
    const suspendido = 0;

    const data = {
        nombre,
        medida,
        precio_venta: precioVenta,
        precio_trueque: precioTrueque,
        nombre_corto: nombreCorto,
        id_tamanio: tamanio,
        id_categoria: categoria,
        suspendido,
    };

    const response = http.post(`${API_URL}/productos`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(
        response, { "POST crearProducto status code is 201": (r) => r.status == 201 }
    );

    sleep(0.5);
}

export function getProductos() {
    const response = http.get(`${API_URL}/productos`);
    check(
        response, { "GET productos status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function getProductoId() {
    let id = 1; // Rango adecuado para IDs de productos en tu base de datos.
    const response = http.get(`${API_URL}/productos/${id}`);
    check(
        response, { "GET productos por ID status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function editarProducto() {
    const id = 1;
    const nombre = new Date().getTime().toString();
    const medida = "David";
    const precioVenta = 1;
    const precioTrueque = 1;
    const nombreCorto = "Corto";
    const tamanio = 1;
    const categoria = 1;
    const suspendido = 0;

    const data = {
        nombre,
        medida,
        precio_venta: precioVenta,
        precio_trueque: precioTrueque,
        nombre_corto: nombreCorto,
        id_tamanio: tamanio,
        id_categoria: categoria,
        suspendido,
    };

    const response = http.put(`${API_URL}/productos/${id}`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(
        response, { "PUT editarProducto status code is 200": (r) => r.status == 200 }
    );

    sleep(0.5);
}

export function getProductoImage() {
    let idProducto = 1;
    const response = http.get(`${API_URL}/productos/${idProducto}/image`);
    check(
        response, { "GET producto imagen status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function putEditarInventario() {
    const id_inventario = Math.floor(Math.random() * 10)
    const cantidad = Math.floor(Math.random() * 100)

    const response = http.put(`${API_URL}/inventario?id_inventario=${id_inventario}&cantidad=${cantidad}`)
    check(
        response, { "PUT editarInventario status code is 200": (r) => r.status == 200 }
    );

    sleep(0.5);
}

export function exportarInventarioExcel() {
    let response = http.get(`${API_URL}/inventario/exportar-excel/1`);
    check(response, { "status code is 200": (r) => r.status === 200 });
    sleep(1);
}


export function getProductosPorAlmacenExistente() {
    const id_almacen = 1; // Reemplaza con el ID del almacén existente
    const response = http.get(`${API_URL}/productos?almacen=${id_almacen}`);
    check(
        response, { "GET productos por almacén existente status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function getProductosPorAlmacenInexistente() {
    const id_almacen = 9999; // Reemplaza con un ID de almacén que no exista
    const response = http.get(`${API_URL}/productos?almacen=${id_almacen}`);
    check(
        response, { "GET productos por almacén inexistente status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

//Usuarios

export function getUsuarios() {
    const response = http.get(`${API_URL}/usuarios/`);
    check(
        response, { "GET usuarios status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}


export function getUsuarioId() {
    let id = 1; // Rango adecuado para IDs de usuarios en tu base de datos.
    const response = http.get(`${API_URL}/usuarios/${id}`);
    check(
        response, { "GET usuarios por ID status code is 200": (r) => r.status == 200 }
    );
    sleep(0.5);
}

export function postCrearUsuario() {
    const nombre = new Date().getTime().toString();;
    const apellido_paterno = "Rodriguez";
    const apellido_materno = "Hernandez";
    const tipo = "Almacenista";
    const correo = new Date().getTime().toString() + "@gmail.com";
    const password = "12456";

    const data = {
        nombre: nombre,
        apellido_paterno: apellido_paterno,
        apellido_materno: apellido_materno,
        tipo: tipo,
        correo: correo,
        password: password
    };

    const response = http.post(`${API_URL}/usuarios/newUsuario`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(
        response, { "POST crearUsuario status code is 201": (r) => r.status == 201 }
    );

    sleep(0.5);
}


export function postLogin() {
    const correo = "kkperez@example.com";
    const password = "password123";

    const data = {

        correo: correo,
        password: password
    };

    const response = http.post(`${API_URL}/usuarios/login`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(
        response, { "POST login status code is 200": (r) => r.status == 200 }
    );

    sleep(0.5);
}

export function putEditarUsuario() {
    const nombre = new Date().getTime().toString();;
    const apellido_paterno = "Rodriguez";
    const apellido_materno = "Hernandez";
    const tipo = "Almacenista";
    const correo = "kkperez@example.com";
    const password = "password123";

    const id = 1; // Rango adecuado para IDs de usuarios en tu base de datos.

    const data = {
        nombre: nombre,
        apellido_paterno: apellido_paterno,
        apellido_materno: apellido_materno,
        tipo: tipo,
        correo: correo,
        password: password
    };

    const response = http.put(`${API_URL}/usuarios/${id}`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    check(
        response, { "POST login status code is 200": (r) => r.status == 200 }
    );

    sleep(0.5);
}


