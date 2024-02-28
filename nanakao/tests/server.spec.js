const request = require("supertest");
const server = require("../index");



describe("Operaciones CRUD de cafes", () => {
   
    it ("OBTENER UN STATUS 200", async () => {

         // obteniendo un status 200 en el test 

        const respuesta = await request(server).get("/cafes").send();
        const status = respuesta.statusCode;
        const {body} = respuesta;
        const producto = body
        expect(status).toBe(200);
        
        // obtieniendo un arreglo con minimo 1 objeto

        expect(Array.isArray(respuesta.body)).toBe(true);
        expect(respuesta.body.length).toBeGreaterThan(0); // Verifica que haya al menos un objeto en el arreglo
        expect(producto).toBeInstanceOf(Array); //verificaque sea un arreglo de objetos
    })        


    // revisando que al tener un producto con id inexistente devuelva un status 404
    it('debería devolver un código 404 si el café no existe', async () => {
        const idInexistente = 400;
        const response = await request(server)
          .delete(`/cafes/${idInexistente}`)
          .expect('Content-Type', /json/)
          .expect(404);
    
        expect(response.body).toEqual({ message: 'No se encontró ningún cafe con ese id' });
      });

      // agrega un producto satisfactoriamente devolviendo un 201 status

      it('agrega un nuevo café y devuelve un código 201', async () => {
        const id = Math.floor(Math.random() * 100);
        const newCafe = [{ id, nombre: "nuevo producto"}];
        const response = await request(server).post('/cafes').send(newCafe);
    
        expect(response.status).toBe(201);
        expect(response.body).toContainEqual(newCafe);
        
      });

      it('actualizacion de producto con distinto id', async () => {
        const idInexistente = 400;
    
        // Realiza la solicitud PUT a la ruta /cafes con el nuevo café
        const response = await request(server).put(`/cafes/${idInexistente}`);
    
        // Verifica que la respuesta tenga el status code 400
        expect(response.status).toBe(400);
      });




});
