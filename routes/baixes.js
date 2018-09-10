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
 * Elimina un soci i actualitza els numeros de socis de la resta de socis.
 */
router.post('/',function(req,res){
	
	db.query('INSERT INTO baixes(nom,cognoms,dni,motiu,data) values($1,$2,$3,$4,$5)',[req.body.nom,req.body.cognoms,req.body.dni,req.body.motiu,req.body.data]).then(function(result){
		
	}).catch(function(err){
		console.log(err);
	})
	res.send("200ok")
})

router.get('/', function(req,res){

    db.query('SELECT * FROM baixes').then(function(req,res){
        var response=result.rows
        res.send(response)

    }).catch(function(err){
        console.log(err);
	})
	
    
})
module.exports=router