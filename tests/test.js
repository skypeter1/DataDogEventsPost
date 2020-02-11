var request = require('supertest');
var myApp = require('../app');
var assert =  require('assert');

describe('App module Test',function(){
    it('should start the express server',function(done){
        myApp.on('server', done);
        myApp.emit('server');
    })
})