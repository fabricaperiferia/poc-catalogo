"use strict"

 var request = require('supertest')

 var request = request("http://localhost:3000")

 describe('/catalogue', function() {
     describe('GET', function(){
         it('Se ejecuta el servicio de listar catalogo', function(done){
              request.get('')
              .set('Accept', 'application/json')
                 .expect(200, done)
         });
         it('Se ejecuta el servicio de catalogo por filtro', function(done){
              request.get('',function (req, res) {
                  console.log(res)
                res.send('dasdasdad');
              })
               .set('Accept', 'application/json')
                 .expect(200, done)
                 
         });
         it('Se ejecuta el servicio de catalogo por filtro y valida cuando el filtro llega vacio', function(done){
            request.get('',function (req, res) {
                console.log(res)
              res.send('dasdasdad');
            })
             .set('Accept', 'application/json')
               .expect(200, done)
               
       });
     });
 });