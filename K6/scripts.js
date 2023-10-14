import http from 'k6/http';
import { check, sleep } from 'k6';

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
        }
    }
}
//Functions
//Entradas
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