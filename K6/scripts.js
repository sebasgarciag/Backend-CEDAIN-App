import http from 'k6/http';
import { check, sleep } from 'k6';

//const API_URL = "https://backend-cedain-app-xcfpf63vha-uc.a.run.app";
const API_URL = "http://localhost:8080";
const runTime = '10s';

export const options = {
  
    scenarios: {
        //POSTS
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

        // //GETS
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


    }
  }

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
      response, {"POST crearEntrada status code is 201": (r) => r.status == 201}
    );
  
    sleep(0.5);
  }

  export function crearEntradaDetalles() {
    
    const id_entrada = 20;
    const id_producto = 1;
    const cantidad = 1;
    const precio_unitario = 100;
  
    const data = { id_entrada, id_producto, cantidad, precio_unitario };
  
    const response = http.post(`${API_URL}/entradas/entradas-detalles`, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  
    check(
      response, {"POST crearEntradaDetalle status code is 201": (r) => r.status == 201}
    );
  
    sleep(0.5);
  }

  export function getEntradas() {
    const response = http.get(`${API_URL}/entradas/`);
    check(
      response, {"GET entradas status code is 200": (r) => r.status == 200}
    );
    sleep(0.5);
  }

  export function getEntradasID() {
    var id = Math.floor(Math.random() * (200 - 20 + 1)) + 120; //Check this range is actually on DB
    const response = http.get(`${API_URL}/entradas/${id}`);
    check(
      response, {"GET entradas por ID status code is 200": (r) => r.status == 200}
    );
    sleep(0.5);
  }

  export function getEntradasUsuario() {
    var id = 1;
    const response = http.get(`${API_URL}/entradas/entradas-usuario/${id}`);
    check(
      response, {"GET entradas usuario status code is 200": (r) => r.status == 200}
    );
    sleep(0.5);
  }

  export function getEntradaDetalles() {
    var id = 20; //Check this range is actually on DB
    const response = http.get(`${API_URL}/entradas/entrada-detalles/${id}`);
    check(
      response, {"GET ENTRADAS DETALLES status code is 200": (r) => r.status == 200}
    );
    sleep(0.5);
  }