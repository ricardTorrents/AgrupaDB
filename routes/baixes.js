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

    db.query('SELECT * FROM baixes').then(function(result){
        var response=result.rows
        res.send(response)

    }).catch(function(err){
        console.log(err);
	})
	
    
})

router.get('/filtreCognom/:cognom', function(req,res){
	var cognoms = req.params.cognom+'%';

    db.query('SELECT * FROM baixes WHERE cognoms LIKE $1 OR lower(cognoms) LIKE $1 OR upper(cognoms) LIKE $1', [cognoms]).then(function(result){
        var response=result.rows
        res.send(response)

    }).catch(function(err){
        console.log(err);
	})
	
    
})

router.get('/filtreDNI/:dni', function(req,res){
	var DNI = req.params.dni+'%';

    db.query('SELECT * FROM baixes WHERE dni LIKE $1 OR lower(dni) LIKE $1 OR upper(dni) LIKE $1', [DNI]).then(function(result){
        var response=result.rows
        res.send(response)

    }).catch(function(err){
        console.log(err);
	})
	
    
})

router.get('/filtreNom/:nom', function(req,res){
	var nom = req.params.nom+'%';

    db.query('SELECT * FROM baixes WHERE nom LIKE $1 OR lower(nom) LIKE $1 OR upper(nom) LIKE $1', [nom]).then(function(result){
        var response=result.rows
        res.send(response)

    }).catch(function(err){
        console.log(err);
	})
	
    
})

router.get('/filtreAny/:any', function(req,res){
    console.log("Filtre ANY")
	var any = parseInt(req.params.any);
    var data = new Date(any,1,1);
    var datafi = new Date(any+1,1,1)
    console.log("g")
    console.log(datafi)
    db.query('SELECT * FROM baixes WHERE data >= $1 AND data < $2', [data, datafi]).then(function(result){
        var response=result.rows
        res.send(response)

    }).catch(function(err){
        console.log(err);
	})
	
    
})
module.exports=router