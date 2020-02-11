var request = require('supertest');
var myApp = require('../app');
var assert =  require('assert');

describe('App module Test',function(){
    it('should start the express server',function(done){
        myApp.app.on('server', done);
        myApp.app.emit('server');
    })

    it('should 404 without routes', function(done){
        request(myApp.app)
        .get('/')
        .expect(404, done);
    })

    it('server and router should be callable', function(){
        assert.equal(typeof myApp.app, 'function','app module is not able to init');
        assert.equal(typeof myApp.app._router, 'function','the app does not have a router init yet');
      })  

    it('should listen to port 80', function(){
        port = myApp.server.address().port;
        assert.equal(port, 8080 ,"The connection port should be 8080 instead of "+port);
      })
})

describe('Integration with Loggly',function(){
    it('should receive events from Loggly HTTP Endpoint',function(done){
        request(myApp.app)
        .post("/loggly")
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200,done);
    })
})