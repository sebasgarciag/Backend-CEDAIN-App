import http from 'k6/http';
import { check, sleep } from 'k6';

const API_URL = "https://backend-cedain-app-xcfpf63vha-uc.a.run.app";

export const options = {
    scenarios: {
      getEntradas: {  //Test Case 1
        executor: 'constant-vus',
        exec: 'getEntradas',
        vus: 30,
        duration: '30s',
      }
    }
  }

  export function getEntradas() {
    const response = http.get(`${API_URL}/entradas/`);
    check(
      response, {"GET entradas status code is 200": (r) => r.status == 200}
    );
    sleep(0.5);
  }