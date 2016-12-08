var express = require("express");
var multer = require("multer");
var app = express();

var storage = multer.diskStorage({
	destination: function(req, file, callback){
		callback(null, './uploads');
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname.split('.')[0].trim() + Date.now() + "." + file.originalname.split('.').pop().trim());
	}
});


var upload = multer({storage: storage}).single('userFile');

app.get('/', function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post('/api/files', function(req, res){
	upload(req,res, function(err){
		if(err){
			return res.end("Error Uploading file");
		}
		else{
			res.end("File uploaded sucessfully.");
    		console.log("One File Uploaded");

		}
	});
	compile(req, res, function(err){
		if(err){
			return res.end("Compilation error!");
		}
		res.end("Output is:");
	});
});


app.listen(3000, function(){
	console.log("Server hosts on port: 3000");
});

