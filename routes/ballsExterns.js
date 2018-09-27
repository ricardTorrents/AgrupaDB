/**
 * Funcions per la accedir a la taula musics
 */
express = require('express');
bodyParser=require('body-parser')
router=express.Router();

router.use(bodyParser.json())
router.use(function timeLog(req,res,next){
	console.log("Consulta Balls Externs")
	next()
})

router.get('/',function(req,res){
	db.query("SELECT * FROM ballsExterns").then(function(result){
        res.send(result.rows)
    }).catch(function(err){
		console.log(err);
	})
})
router.get('/:numero',function(req,res){
	var numero = req.params.numero
	
	db.query("SELECT * FROM ballsExterns WHERE numero=$1",[numero]).then(function(result){
        res.send(result.rows)
    }).catch(function(err){
		console.log(err);
	})
})

router.get('/filtreNom/:nom',function(req,res){
	var nom = req.params.nom+'%'

	db.query("SELECT * FROM ballsExterns WHERE nom LIKE $1 OR lower(nom) LIKE $1 OR upper(nom)  LIKE $1", [nom]).then(function(result){
        res.send(result.rows)
    }).catch(function(err){
		console.log(err);
	})
})
router.get('/filtrePoblacio/:poblacio',function(req,res){
	var poblacio = req.params.poblacio+'%'

	db.query("SELECT * FROM ballsExterns WHERE poblacio LIKE $1 OR lower(poblacio) LIKE $1 OR upper(poblacio)  LIKE $1", [poblacio]).then(function(result){
        res.send(result.rows)
    }).catch(function(err){
		console.log(err);
	})
})



/**
 * Modifica un music 
 */
router.put('/',function(req,res){

	db.query('UPDATE ballsExterns SET nom=$1,nparticipants=$2,telefon=$3,telefon2=$4,email=$5,poblacio=$6 WHERE numero=$7',[req.body.nom,req.body.nparticipants,req.body.telefon,req.body.telefon2,req.body.email,req.body.poblacio,req.body.numero]).then(function(result){
		res.send("200OK")
	}).catch(function(err){
		console.log(err);
	})
	
})

/**
 * Inserta un music 
 */
router.post('/',function(req,res){

	db.query('INSERT INTO ballsExterns (nom,nparticipants,telefon,telefon2,email,poblacio) VALUES($1,$2,$3,$4,$5,$6)',[req.body.nom,req.body.nparticipants,req.body.telefon,req.body.telefon2,req.body.email,req.body.poblacio]).then(function(result){
		res.send("200OK")
	}).catch(function(err){
		console.log(err);
	})
})

router.delete('/:numero', function(req,res){
	var codi=parseInt(req.params.numero)
		
		db.query("SELECT count(*) from ballsExterns").then(function(result){
			var balls=result.rows[0].count
			
			db.query("DELETE FROM ballsExterns WHERE numero=$1",[codi]).then(function(){
				 c=codi+1
				 
				while(c<=balls){
					
					db.query("UPDATE ballsExterns SET numero=numero-1 WHERE numero=$1",[c]).then(function(){
						
					}).catch(function(err){
						console.log(err);
						res.send("error UPDATE")
					})

					c=c+1;
				}
				
			}).then(function(){
				var b=parseInt(balls)
				
				db.query("ALTER SEQUENCE ballsExterns_numero_seq RESTART WITH "+b).then(function(){
					res.send("200ok")
				}).catch(function(err){
					console.log(err);
					res.send("error UPDATE")
				})
			}).catch(function(err){
				console.log(err);
				res.send("error UPDATE")
			})
		}).catch(function(err){
			console.log(err);
			res.send("error UPDATE")
		})
})
module.exports=router