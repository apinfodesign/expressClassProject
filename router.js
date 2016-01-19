var express 	= require('express');
const fs 		= require('fs');
var router 		= express.Router();
const path 		= require("path");


//top level response
router.get('/', function (req, res) {
	res.type('text/plain');
 	res.end('Welcome to the Very Fancy Note Keeper');
});


//get list of resources
router.get('/notes', function (req, res) {
	var inpath = './data';
	var outfiles = [];
	var fileString='';

	fs.readdir(inpath, function (err, files) {
		if (err) {
			throw err;
		} else {
			for (var i = 0; i < files.length; i++) {
				outfiles[i] = path.basename(files[i], '.json');
				fileString = fileString + ' ' + outfiles[i] ;
			}
			res.json(outfiles);
		};
	});
});

//get specific resource
router.get('/notes/:noteid', function (req, res) {
	res.type('json');
	var file = req.params.noteid + '.json';
	console.log('file name is', file);

	fs.createReadStream('./data/' + file).pipe(res)
});

//post new resource
router.post('/', function (req, res) {
	var inpath 			= './data/';
	var outfiles 		= [];
	var nextFileName	= '';
	var nextFileNumber 	= '';
	var newFilePath 	= '';
	console.log('posting.......', req.body);

	fs.readdir(inpath, function (err, files) {
		if (err) {
			throw err;
		} else {
			var nextFileNumber = files.length; //! not valid if managing deletions
			if (nextFileNumber <10 ){
				nextFileName = inpath + "0"+ nextFileNumber.toString() + "_data.json";
			} else {
				nextFileName = inpath + nextFileNumber.toString() + "_data.json";
			}
			fs.writeFile(nextFileName, JSON.stringify(req.body), 'utf-8', function(err){
				res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
				res.write('Submission successful.');
				res.end();
			})
		};
	});
});

module.exports = router;