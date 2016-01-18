var express 	= require('express');
const fs 		= require('fs');
var bodyParser 	= require('body-parser');
var router 		= express.Router();
const path 		= require("path");


//top level response
router.get('/', function (req, res) {
	res.end('Welcome to the Very Fancy Note Keeper');
});


//get list of resources
router.get('/notes', function (req, res) {
	var inpath = './data';
	var outfiles = [];
	fs.readdir(inpath, function (err, files) {
		if (err) {
			throw err;
		} else {
			for (var i = 0; i < files.length; i++) {
				outfiles[i] = path.basename(files[i], 'json');
			}
			res.send(' Select from the following available files: ', outfiles);
		};
	});
});


//get specific resource
router.get('/notes/:noteid', function (req, res) {
	var file = req.params.noteid + '.json';
	console.log('file name is', file);
	fs.readFile('./data/' + file, 'utf-8', function(err, data) {
		if (err) {res.send('Requested resource not available.  ')};
	res.send('Requested file contents are: ', data);
	});
});


//post new resource
router.post('/*', function (req, res) {
	var inpath 			= './data';
	var outfiles 		= [];
	var nextFileName	= '';
	var nextFileNumber 	= '';
	var newFilePath 	= '';
	fs.readdir(inpath, function (err, files) {
		if (err) {
			throw err;
		} else {
			var nextFileNumber = files.length; //! not valid if managing deletions
			if (nextFileNumber <10 ){
				nextFileName = "0"+ nextFileNumber.toString() + "_data.json";
			} else {
				nextFileName = nextFileNumber.toString() + "_data.json";
			}
			req.on('data', function (data) {
				var dataWrite = data.toString();
				newFilePath = './data/' + nextFileName;
				fs.writeFile(newFilePath, dataWrite, 'utf-8',
					req.on('end', function () {
						res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
						res.write('*** wrote new file *** ');
						res.end();
					}));
			});
		};
	});
});


module.exports = router;