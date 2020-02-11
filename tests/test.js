var request = require('supertest');
var myApp = require('../app');
var assert =  require('assert');
var samplePayloadLoggly = {
      "alert_name" : "IndexOutOfBounds Exception",
      "edit_alert_link" : "https://sample.loggly.com/alerts/edit/8188",
      "source_group" : "N/A",
      "start_time" : "Mar 17 11:41:40",
      "end_time" : "Mar 17 11:46:40",
      "search_link" : "https://sample.loggly.com/search/?terms=&source_group=&savedsearchid=112323&from=2015-03...",
      "query" : "* ",
      "num_hits" : 225,
      "recent_hits" : [ ],
      "owner_username" : "sample",
      "owner_subdomain" : "sample",
      "owner_email" : "pm@loggly.com"
    }

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
        assert.equal(port, 8081 ,"The connection port should be 8080 instead of "+port);
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


describe('Integration with DataDog', function(){
    it('should POST events to DataDog',function(done){
        request(myApp.app)
        .post("/datadog")
        .expect(200,done)
    })
})