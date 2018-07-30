var config=require("./config.json");
var express=require("express");
var path=require('path');
var app=express();
var sass=require('node-sass-middleware');
var routes=require('./routes/routes');
var pg=require('pg-promise-simple');
var bodyParser=require('body-parser')
var connString="postgres://torrents:agrupa@localhost:5432/agrupacio";
pg.connect(connString).then(function(connection){
	global.db=connection.client;
}).then(function(){
	console.log("Connectat!")
}).catch(function(e){
	console.error('No es pot connectar a la BD',e);
	return;
});

routes.create(app)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use(sass({
	src: path.join(__dirname,'public'),
	dest:path.join(__dirname,'public'),
	debug:true,
	outputStyle:'compressed'
}))
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',function(req,res){
	res.sendfile(__dirname+'/public/index.html');
});
app.get('/socis',function(req,res){
	res.sendfile(__dirname+'/public/pages/pagSocis.html');
});
app.get('/nouSoci',function(req,res){
	res.sendfile(__dirname+'/public/pages/insertaSoci.html');
});
app.get('/modificaSoci',function(req,res){
	res.sendfile(__dirname+'/public/pages/modificaSoci.html');
});
app.get('/balls',function(req,res){
	res.sendfile(__dirname+'/public/pages/pagBalls.html');
});
app.get('/nouBall',function(req,res){
	res.sendfile(__dirname+'/public/pages/insertaballs.html');
});
app.get('/modificaball',function(req,res){
	res.sendfile(__dirname+'/public/pages/modificaBall.html');
});

app.listen(config.express.port);
console.log("ServerInit");
