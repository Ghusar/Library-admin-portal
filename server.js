var express = require("express");
var bodyParser     =         require("body-parser");
var http = express();
var fs = require("fs");


var urlencodedParser = bodyParser.urlencoded({ extended: false });
http.use(bodyParser.json());

http.use(express.static(__dirname));

http.get("/list",function(req,res){
	//console.log(req);
	var content = fs.readFileSync(__dirname+"/Books.json");
	content = JSON.parse(content);
	//console.log(content);
	res.json(content);
});


http.post("/add",function(req,res){
	var title = req.body.Title;
	var author = req.body.Author;
	var status = req.body.status;
	//console.log(title+author+status);
	var content = fs.readFileSync(__dirname+"/Books.json");
	content = JSON.parse(content);
	content.push({
		"Title":title,
		"Author":author,
		"status":status
	});
	//content = content.toString();
	//console.log(content);
	fs.writeFileSync(__dirname+"/Books.json",JSON.stringify(content));
	res.json(content);
});



http.delete("/list/:id",function(req,res){
	var  id = req.params.id;
	//console.log(id);

	var content = fs.readFileSync(__dirname+"/Books.json");

	content = JSON.parse(content);

	content.splice(id,1);

	fs.writeFileSync(__dirname+"/Books.json",JSON.stringify(content));
	res.json(content);
});


http.put('/edit',function(req,res){
	//console.log("aaaaagaayaaaaaaaaa");
	var title = req.body.Title;
	var author = req.body.Author;
	var status = req.body.status;

	//console.log(title);
	var id = req.body.id;

	var content = fs.readFileSync(__dirname+"/Books.json");

	content = JSON.parse(content);

	content[id].Title = title;
	content[id].Author=author;
	content[id].status = status;

	fs.writeFileSync(__dirname+"/Books.json",JSON.stringify(content));
	res.json(content);


});


http.post('/list/:id',function(req,res){
	var id = req.params.id;

	var content = fs.readFileSync(__dirname+"/Books.json");

	content = JSON.parse(content);

	content[id].status = "issued";
		fs.writeFileSync(__dirname+"/Books.json",JSON.stringify(content));
	res.json(content);
});

http.get("/",function(req,res){
	res.sendfile("index.html");		
});


http.listen(8080);