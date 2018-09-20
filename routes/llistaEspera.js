/**
 * Funcions per la taula LlistaEspera
 */
express = require('express');
bodyParser=require('body-parser')
router=express.Router();

router.use(bodyParser.json())
router.use(function timeLog(req,res,next){
	console.log("Consulta LlistaEspera");
	next()
})
/**
 * Obte tots els registres de la llsita d'espera per un soci en concret
 */
router.get('/:dni',function(req,res){
	dni=req.params.dni
	
	db.query('SELECT * FROM llistaEspera WHERE llistaEspera.dni=$1',[dni]).then(function(result){
		
		res.send(result.rows)
	}).catch(function(err){
		console.log(err);
	})
})
/**
 * Obte tots els registres de la llsita d'espera per un ball en concret
 */
router.get('/ball/:codi_ball',function(req,res){
	codi=req.params.codi_ball
	
	db.query('SELECT * FROM llistaEspera WHERE llistaEspera.codi_ball=$1',[codi]).then(function(result){
		
		res.send(result.rows)
	}).catch(function(err){
		console.log(err);
	})
});
/**
 * Modifica  un registre en la taula 
 */
router.put('/',function(req,res){
	
	db.query('UPDATE llistaEspera SET dni=$1,codi_ball=$2,data=$3,posicio=$4',[req.body.dni,req.body.codi_ball,req.body.data,req.body.posicio]).then(function(result){
		res.send("200OK")
	}).catch(function(err){
		console.log(err);
	})
	
})
/**
 * Insereix un nou registre en la taula 
 */
router.post('/',function(req,res){
	
    d=new Date()
   
    db.query('SELECT count(*) FROM llistaEspera WHERE codi_ball=$1',[req.body.codi_ball]).then(function(result){
        posicio=parseInt(result.rows[0].count)+1
        db.query('INSERT INTO llistaEspera(dni,codi_ball,data,posicio) values($1,$2,$3,$4)',[req.body.dni,req.body.codi_ball,d,posicio]).then(function(result){
            
        }).then(function(){
            res.send("200ok")
        }).catch(function(err){
            console.log(err);
        })
    })
	

})
/**
 * Elimina un registre de la taula i actualitza les posicions de la resta.
 */
router.post('/elimina',function(req,res){
		var i=parseInt(req.body.posicio) 
	
		db.query('DELETE FROM llistaEspera WHERE dni=$1 and codi_ball=$2',[req.body.dni,req.body.codi_ball]).then(function(){
			
		
		}).then(function(){
			db.query('UPDATE llistaEspera SET posicio=posicio-1 WHERE posicio>$1 AND codi_ball=$2',[i,req.body.codi_ball]).then(function(result){
				console.log(result)
				
			}).then(function(){
				res.send("200ok")
			}).catch(function(err){
				
				console.log("errorUpdate")
				console.log(err);
			})
			
		}).catch(function(err){
			console.log("errorDlete")
			console.log(err);
		})
        
    
	

})
module.exports=router