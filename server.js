var config=require("./config.json");
var express=require("express");
var path=require('path');
var app=express();
var sass=require('node-sass-middleware');
var routes=require('./routes/routes');
var pg=require('pg-promise-simple');
var bodyParser=require('body-parser')
var connString="postgres://torrents:agrupa@localhost:5432/agrupacio";
var session=require('express-session')
var cookie=require("cookie-parser")
/**
 * Estableix connexio amb la base de dades 
 */
pg.connect(connString).then(function(connection){
	global.db=connection.client;
}).then(function(){
	console.log("Connectat!\n")
}).catch(function(e){
	console.error('No es pot connectar a la BD',e);
	return;
});

routes.create(app)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(session({
	secret:'token',
	
	resave:true,
	saveUninitialized:true
}))
app.use(cookie('token'))
app.use(sass({
	src: path.join(__dirname,'public'),
	dest:path.join(__dirname,'public'),
	debug:false,
	outputStyle:'compressed'
}))
app.use(express.static(path.join(__dirname, 'public')));
app.put('/usuaris',function(req,res){
	
	  db.query('SELECT count(*) FROM usuaris WHERE usuari=$1 AND contrasenya=$2',[req.body.usuari,req.body.contrasenya]).then(function(result){
		  
		  if(result.rows[0].count==1){
			  req.session.user=req.body.usuari
			  req.session.auth=true
			  res.send("Correcte")
			  
		  }else{
			  res.send("Incorrecte")
		  }
		  
	  }).catch(function(err){
		  console.log(err);
	  })
	  
  })
  app.put('/canviaContrasenya',function(req,res){
	console.log(req.session)
	 var usuari=req.session.user
	  db.query('SELECT count(*) FROM usuaris WHERE usuari=$1 AND contrasenya=$2',[usuari,req.body.contrasenya]).then(function(result){
		  
		  if(result.rows[0].count==1){
			  db.query('UPDATE usuaris SET contrasenya=$1 WHERE usuari=$2',[req.body.novacontrasenya,usuari]).then(function(result){
				res.send("Correcte")
			}).catch(function(err){
				console.log(err);
			})
  
		  }else{
			  res.send("Incorrecte")
		  }
		  
	  }).catch(function(err){
		  console.log(err);
	  })
})  
  app.put('/tancaSessio',function(req,res){
		req.session.auth=false
		res.send("Sessio tancada")
	
	
	
})
  app.get('/usuari',function(req,res){
	res.send(req.session.user)
  })
app.get('/inici',function(req,res){
	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/inici.html');
	}
});
app.get('/contrasenya',function(req,res){
	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/canviaContrasenya.html');
	}
});
app.get('',function(req,res){
	
	res.sendFile(__dirname+'/public/index.html');
	
});
app.get('/prova',function(req,res){
	
	res.sendFile(__dirname+'/public/prova.html');
	
});
app.get('/socis',function(req,res){
	

	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/pagSocis.html');
	}
	
});
app.get('/nouSoci',function(req,res){
	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/insertaSoci.html');
	}
	
});
app.get('/modificaSoci',function(req,res){
	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/modificaSoci.html');
	}
	
});
app.get('/balls',function(req,res){
	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/pagBalls.html');
	}
	
});
app.get('/nouBall',function(req,res){
	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/insertaballs.html');
	}
	
});
app.get('/modificaball',function(req,res){
	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/modificaBall.html');
	}
	
});
app.get('/balladors',function(req,res){
	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/pagBalladors.html');
	}
	
});
app.get('/baixes',function(req,res){
	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/baixes.html');
	}
	
});

app.get('/musics',function(req,res){
	

	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/musics.html');
	}
	
});
app.get('/modificaMusic',function(req,res){
	

	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/modificaMusic.html');
	}
	
});
app.get('/insertaMusic',function(req,res){
	

	if(req.session.auth!=true){
		res.sendFile(__dirname+'/public/index.html');
	}else{
		res.sendFile(__dirname+'/public/pages/insertaMusic.html');
	}
	
});
/** 
 * inicialitza el servidor escoltant en el port 3000
 */
app.listen(config.express.port);
console.log("ServerInit\n");
