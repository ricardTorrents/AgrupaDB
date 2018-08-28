/**
 * Funcions per la accedir a la taula socis
 */
express = require('express');
bodyParser=require('body-parser')
router=express.Router();

router.use(bodyParser.json())
router.use(function timeLog(req,res,next){
	console.log('Time: ',Date.now())
	next()
})
/**
 * Obte tots els socis 
 */
router.get('/',function(req,res){
	db.query("SELECT * FROM soci ORDER BY numeroSoci").then(function(result){
		console.log(result.rowCount)
		var response=[]
		result.rows.forEach(function(row){
			var avui= new Date()
			var naixement=new Date(row.data_naixement)
			row.edat=avui.getFullYear()-naixement.getFullYear();

			response.push(row)
		
		})
		res.send(response)
	}).catch(function(err){
		console.log(err);
	})
	
});
/**
 * Obte un soci segons el seu numero de soci
 */
router.get('/:numerosoci',function(req,res){
	numerosoci=req.params.numerosoci
	
	db.query('SELECT * FROM soci WHERE soci.numerosoci=$1',[numerosoci]).then(function(result){
		console.log(result.rows[0].dni)
		res.send(result.rows)
	}).catch(function(err){
		console.log(err);
	})
});
/**
 * Modifica un soci apartir del seu numerodesoci
 */
router.put('/:numerosoci',function(req,res){
	console.log(req.body)
	numerosoci=req.params.numerosoci
	
	
	db.query('UPDATE soci SET nom=$1,cognoms=$2,data_naixement=$3,email=$4,adreça=$5,sexe=$6,telefon=$7,telefon2=$8,ciutat=$9 WHERE numerosoci=$10',[req.body.nom,req.body.cognoms,req.body.data_naixement,req.body.email,req.body.adreça,req.body.sexe,req.body.telefon,req.body.telefon2,req.body.ciutat,numerosoci]).then(function(result){
		res.send("200OK")
	}).catch(function(err){
		console.log(err);
	})
	
})
/**
 * Insereix un nou soci
 */
router.post('/',function(req,res){
	console.log(req.body.data_naixement)
	
	db.query('INSERT INTO soci(dni,nom,cognoms,data_naixement,adreça,ciutat,email,telefon,telefon2,sexe) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[req.body.dni,req.body.nom,req.body.cognoms,req.body.data_naixement,req.body.adreça,req.body.ciutat,req.body.email,req.body.telefon,req.body.telefon2,req.body.sexe]).then(function(result){
		console.log(result)
	}).catch(function(err){
		console.log(err);
	})
	res.send("200ok")
})
/**
 * Elimina un soci i actualitza els numeros de socis de la resta de socis.
 */
router.post('/baixes/',function(req,res){
	
	db.query('INSERT INTO baixes(nom,cognoms,dni,motiu,data) values($1,$2,$3,$4,$5)',[req.body.nom,req.body.cognoms,req.body.dni,req.body.motiu,req.body.data]).then(function(result){
		
	}).catch(function(err){
		console.log(err);
	})
	res.send("200ok")
})
router.delete('/:numerosoci',function(req,res){
	var numerosoci=parseInt(req.params.numerosoci)
		
		db.query("SELECT count(*) from soci").then(function(result){
			var socis=result.rows[0].count
			
			db.query("DELETE FROM soci WHERE numerosoci=$1",[numerosoci]).then(function(){
				 n=numerosoci+1
				 
				while(n<=socis){
					
					db.query("UPDATE soci SET numerosoci=numerosoci-1 WHERE numerosoci=$1",[n]).then(function(){
						
					}).catch(function(err){
						console.log(err);
						res.send("error UPDATE")
					})

					n=n+1;
				}
				
			}).then(function(){
				var s=parseInt(socis)
				console.log(s)
				console.log("g")
				db.query("ALTER SEQUENCE soci_numerosoci_seq RESTART WITH "+s).then(function(){
					
				}).then(function(){
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
