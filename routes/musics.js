/**
 * Funcions per la accedir a la taula musics
 */
express = require('express');
bodyParser=require('body-parser')
router=express.Router();

router.use(bodyParser.json())
router.use(function timeLog(req,res,next){
	console.log("Consulta Musics")
	next()
})

router.get('/',function(req,res){
	db.query("SELECT * FROM musics").then(function(result){
        res.send(result.rows)
    }).catch(function(err){
		console.log(err);
	})
})
router.get('/paginacio/:numero',function(req,res){
	var numero=req.params.numero
	var numerofi=numero+20
	db.query("SELECT * FROM musics where numero>=$1 AND numero<$2",[numero,numerofi]).then(function(result){
        res.send(result.rows)
    }).catch(function(err){
		console.log(err);
	})
})
router.get('/total',function(req,res){
	
	db.query("SELECT count(*) FROM musics").then(function(result){
		
		
		res.send(result.rows[0].count)
	}).catch(function(err){
		console.log(err);
	})
	
	})
router.get('/:numero',function(req,res){
	var numero = req.params.numero
	
	db.query("SELECT * FROM musics WHERE numero=$1",[numero]).then(function(result){
        res.send(result.rows)
    }).catch(function(err){
		console.log(err);
	})
})

router.get('/filtreNom/:nom',function(req,res){
	var nom = req.params.nom+'%'

	db.query("SELECT * FROM musics WHERE nom LIKE $1 OR lower(nom) LIKE $1 OR upper(nom)  LIKE $1", [nom]).then(function(result){
        res.send(result.rows)
    }).catch(function(err){
		console.log(err);
	})
})

router.get('/filtreTipus/:tipus',function(req,res){
	var tipus = req.params.tipus

	db.query("SELECT * FROM musics WHERE tipus = $1", [tipus]).then(function(result){
        res.send(result.rows)
    }).catch(function(err){
		console.log(err);
	})
})

/**
 * Modifica un music 
 */
router.put('/',function(req,res){

	db.query('UPDATE musics SET nom=$1,nparticipants=$2,telefon=$3,telefon2=$4,email=$5,poblacio=$6,tipus=$7 where numero=$8',[req.body.nom,req.body.nparticipants,req.body.telefon,req.body.telefon2,req.body.email,req.body.poblacio,req.body.tipus,req.body.numero]).then(function(result){
		res.send("200OK")
	}).catch(function(err){
		console.log(err);
	})
	
})

/**
 * Inserta un music 
 */
router.post('/',function(req,res){

	db.query('INSERT INTO musics (nom,nparticipants,telefon,telefon2,email,poblacio,tipus) VALUES($1,$2,$3,$4,$5,$6,$7)',[req.body.nom,req.body.nparticipants,req.body.telefon,req.body.telefon2,req.body.email,req.body.poblacio,req.body.tipus]).then(function(result){
		res.send("200OK")
	}).catch(function(err){
		console.log(err);
	})
})

router.delete('/:numero', function(req,res){
	
var codi=parseInt(req.params.numero)
		
		db.query("SELECT count(*) from musics").then(function(result){
			var balls=result.rows[0].count
			
			db.query("DELETE FROM musics WHERE numero=$1",[codi]).then(function(){
				 c=codi+1
				 
				while(c<=balls){
					
					db.query("UPDATE musics SET numero=numero-1 WHERE numero=$1",[c]).then(function(){
						
					}).catch(function(err){
						console.log(err);
						res.send("error UPDATE")
					})

					c=c+1;
				}
				
			}).then(function(){
				var b=parseInt(balls)
				
				db.query("ALTER SEQUENCE musics_numero_seq RESTART WITH "+b).then(function(){
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