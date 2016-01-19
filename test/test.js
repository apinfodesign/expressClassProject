var chai        = require('chai');
var chaiHttp    = require('chai-http');
var assert      = chai.assert;
var fs          = require('fs');
const path 		= require("path");
var app         = require('../app');
var expect      = chai.expect;
var rimraf      = require('rimraf');
var mkdirp      = require('mkdirp');
chai.use(chaiHttp);

var dataPath    = './data';
var fileString='';
var testResourceName = '00_data';  //mimics user supplied name
var testingResources = [{name: 'building'}, {name: 'portland'}, {name: 'music'}];

describe('basic Express server... ', function() {
    var welcomeMessage = 'Welcome to the Very Fancy Note Keeper';

    var data  = path.join( __dirname,'../data');

    //destroy existing data directory, create new one
    before(function(done){
        rimraf( data, function(err){
            if (err) return done(err);
            mkdirp(data, done );
        })
    });


    it('responds w welcome message on root path', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res.text).to.equal(welcomeMessage);
                done();
            });
        });


    it('returns 0 length list when new', function(done){
        chai.request(app)
            .get('/notes')
            .end(function(err, res){
                expect(err).to.be.null;
                fs.readdir(data, function(err, files) {
                    assert.equal(files.length, 0)
                    done();
                });
            });
        });


    it('adds one file resource to empty dir', function(done) {
        var testResource = testingResources[0];
        chai.request(app)
            .post('/')
            .send(testResource)
            .end(function(err, res){
                expect(err).to.be.null;
                chai.request(app)
                    .get('/notes/00_data')
                    .end(function(err, res){
                        assert.equal( res.body.name, "building");
                        done();
                    });
            });
        });

    it('should return list of ONE file when GET /notes', function(done) {
        chai.request(app)
            .get('/notes')
            .end(function(err, res){
                expect(err).to.be.null;
                fs.readdir(dataPath, function(err, files) {
                    expect(err).to.be.null;
                    //go read current contents of data folder
                    for (var i = 0; i < files.length; i++) {
                        files[i] = path.basename(files[i], '.json');
                    }
                    assert.deepEqual( res.body , files);
                    done();
                });
            });
        });


    it('adds a second  file', function(done) {
        chai.request(app)
            .post('/')
            .send(testingResources[1])
            .end(function(err, res){
            done();
            });
        });


    it('adds a third file', function(done) {
        chai.request(app)
            .post('/')
            .send(testingResources[2])
            .end(function(err, res){
            done();
            });
        });


    it('should return list of THREE files when GET /notes', function(done) {
        chai.request(app)
            .get('/notes')
            .end(function(err, res){
                expect(err).to.be.null;
                fs.readdir(dataPath, function(err, files) {
                    expect(err).to.be.null;
                    //go read current contents of data folder
                    for (var i = 0; i < files.length; i++) {
                        files[i] = path.basename(files[i], '.json');
                    }
                    assert.deepEqual( res.body , files);
                    console.log(files, ' is returned list of files');
                    done();
                });
            });
    });


    it('returns contents of file when resource is named', function(done) {
        var testResourceName = '00_data';  //mimics user supplied name
        chai.request(app)
            .get( '/notes/'+ testResourceName )
            .end(function(err, res){
                if(err) return done(err);
                var filePath = "./data/" + testResourceName + ".json";
                fs.readFile(filePath, function(err, data) {
                    expect(err).to.be.null;
                    var comp = JSON.parse(data.toString());
                    assert.deepEqual(res.body, comp);
                    done();
                });
            });
        });


});