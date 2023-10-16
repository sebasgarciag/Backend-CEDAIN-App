const request = require('supertest');
const server = require('../app');

describe("usuario Controller Tests", () => {
    test("Obtener todos los usuarios", async () => {
        return request(server)
            .get('/usuarios')
            .send().expect(200);
    });

    test("Crear Usuario", async () => {
        const nombre = new Date().getTime().toString();;
        const apellido_paterno = "Rodriguez";
        const apellido_materno = "Hernandez";
        const tipo= "Almacenista";
        const correo = new Date().getTime().toString() + "@gmail.com";
        const password = "12456";

        return request(server)
            .post('/usuarios/newUsuario')
            .send({
                nombre: nombre,
                apellido_paterno: apellido_paterno,
                apellido_materno: apellido_materno,
                tipo: tipo,
                correo: correo,
                password: password
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id_usuario).toEqual(expect.any(Number));
                expect(res.body.nombre).toEqual(nombre);
                expect(res.body.apellido_paterno).toEqual(apellido_paterno);
                expect(res.body.apellido_materno).toEqual(apellido_materno);
                expect(res.body.tipo).toEqual(tipo);
                expect(res.body.correo).toEqual(correo);
                expect(res.body.password).toEqual(password);

                
            });
    });

    test("Obtener Usuario por ID", async () => {
        const nombre = new Date().getTime().toString();;
        const apellido_paterno = "Rodriguez";
        const apellido_materno = "Hernandez";
        const tipo = "Almacenista";
        const correo = new Date().getTime().toString() + "@gmail.com";
        const password = "12456";


        return request(server)
            .post('/usuarios/newUsuario')
            .send({
                nombre: nombre,
                apellido_paterno: apellido_paterno,
                apellido_materno: apellido_materno,
                tipo: tipo,
                correo: correo,
                password: password
            })
            .expect(201)
            .then((res) => {
                const newID = res.body.id_usuario;
                return request(server)
                    .get('/usuarios/' + newID)
                    .expect(200)

            });
    });

    test("Editar Usuario", async () => {
        const nombre = new Date().getTime().toString();;
        const apellido_paterno = "Rodriguez";
        const apellido_materno = "Hernandez";
        const tipo = "Almacenista";
        const correo = new Date().getTime().toString() + "@gmail.com";
        const password = "12456";

                
                return request(server)
                    .put('/usuarios/' + 1)
                    .send({
                        nombre: nombre,
                        apellido_paterno: apellido_paterno,
                        apellido_materno: apellido_materno,
                        tipo: tipo,
                        correo: correo,
                        password: password
                    })
                    .expect(200)

            });
    });

    test("Obtener usuario que no existe", async () => {
        return request(server)
            .get('/usuarios/' + 999999999999)
            .send()
            .expect(404);
    });


