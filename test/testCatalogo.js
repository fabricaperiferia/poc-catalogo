"use strict"

 var request = require('supertest')

 var request = request("http://localhost:3000")

 describe('/catalogue', function() {
     describe('GET', function(){
         it('Se ejecuta el servicio de listar catalogo', function(done){
              request.get('')
              .set('Accept', 'application/json')
                 .expect(200, done);
         });
         it('Se ejecuta el servicio de catalogo por filtro', function(done){
              request.get('','gel')
              .set('Accept', 'application/json')
                 .expect(200, done);
         });
         it('Se ejecuta el servicio de catalogo por filtro Esperando a que falle', function(done){
            request.get('/',{filter:3123})
              //  .expect('Content-Type', /json/)
               .expect(400, done);
       });
     });
 });