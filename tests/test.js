var request = require('supertest');
var myApp = require('../app');
var assert =  require('assert');

describe('App module Test',function(){
    it('should start the express server',function(done){
        myApp.on('server', done);
        myApp.emit('server');
    })

    it('should 404 without routes', function(done){
        request(myApp)
        .get('/')
        .expect(404, done);
    })

    it('server and router should be callable', function(){
        assert.equal(typeof myApp, 'function','app module is not able to init');
        assert.equal(typeof myApp._router, 'function','the app does not have a router init yet');
      })  
})

describe('Integration with Loggly',function(){
    it('should receive events from Loggly HTTP Endpoint',function(done){
        request(myApp)
        .post("/loggly")
        .expect(200,done);
    })
})