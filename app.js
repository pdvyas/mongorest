var express = require('express')
var app = express.createServer();
var mongo = require('mongoskin');
var host = 'localhost';
var port = '27017';
app.use(express.bodyParser());
app.get('/databases/:database/collections/:collection',function(req,res) {
	mongo.db(host+':'+port+'/'+req.params.database)
	.collection(req.params.collection)
	.find()
	.toArray(function(err,items) {
		if(err) 
		{
			console.log(err)
			res.send(502);
		}
		else 
		{
			res.send(JSON.stringify(items))
		}
	});
});

app.post('/databases/:database/collections/:collection',function(req,res) {
	var body = req.body;
	mongo.db(host+':'+port+'/'+req.params.database)
	.collection(req.params.collection)
	.insertAll(body,function(err, obj) {
		if(err)
		{
			console.log(err);
			res.send(502);
		}
	});
});

app.listen(3000);
