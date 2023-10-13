import http from 'k6/http';
import { check, sleep } from 'k6';

//const API_URL = "https://backend-cedain-app-xcfpf63vha-uc.a.run.app";
const API_URL = "http://localhost:8080";


export const options = {
    scenarios: {
        //POSTS
        postEntrada: {  //Test Case 1a
            executor: 'constant-vus',
            exec: 'crearEntrada',
            vus: 10,
            duration: '30s',
          },






        //GETS
        getEntradas: {  //Test Case 1b
            executor: 'constant-vus',
            exec: 'getEntradas',
            vus: 10,
            duration: '30s',
        },


    }
  }

  export function getEntradas() {
    const response = http.get(`${API_URL}/entradas/`);
    check(
      response, {"GET entradas status code is 200": (r) => r.status == 200}
    );
    sleep(0.5);
  }

  export function crearEntrada() {
    const primerNombre = "Test";
    const apellido = new Date().getTime().toString();
  
    const data = { nombre: primerNombre, apellido: apellido };
  
    const response = http.post(`${API_URL}/personas/`, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  
    check(
      response, {"POST personas status code is 201": (r) => r.status == 201}
    );
  
    sleep(0.5);
  }