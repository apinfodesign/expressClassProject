var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;
var fs = require('fs');

var app = require('../app');

var expect = chai.expect;
var dataPath = '../data';

chai.use(chaiHttp);


describe('basic Expess server... ', function() {

    var text1 = 'Welcome to the Very Fancy Note Keeper';
    var data= = './data';

    //it('responds w welcome message on / path', function(done) {
    //    chai.request(app)
    //        .get('/')
    //        .end(function(err, res){
    //            expect(err).to.be.null;
    //            //expect(res).to.be.text;
    //            // assert.equal(res.text, text1);
    //
    //            console.log(' testing / get ');
    //            done();
    //        });
    //});

    //it('on /notes, returns list of files in data directory', function(done) {
    //    chai.request(server)
    //        .get('/notes')
    //        .end(function(err, res) {
    //            expect(err).to.be.null;
    //            expect(res).to.have.status(200);
    //            expect(res).to.be.text;
    //
    //            fs.readdir(data, function(err, listOfFiles){
    //                expect(err).to.be.null;
    //
    //
    //            })
    //            console.log('*********res is: ', res.text);
    //            done();
    //        });
    //});


    //
    //it('accepts name in JSON format on /greet', function(done) {
    //    chai.request(server)
    //        .post('/greet')
    //        .send({"name": "rudolph"})
    //        .end(function(err, res) {
    //            expect(err).to.be.null;
    //            expect(res).to.have.status(200);
    //            expect(res).to.be.text;
    //            var greeting = res.body.toString();
    //            // console.log(res, ' is res');
    //            done();
    //        });
    //});
});