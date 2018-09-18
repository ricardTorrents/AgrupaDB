/**
 * Funcions per la taula Balladors
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
 * Funcio Get, obte tots els balladors per un ball en concret.
 */
router.get('/:codi_ball',function(req,res){
	codi_ball=req.params.codi_ball
	
	db.query('SELECT * FROM balladors WHERE balladors.codi_ball=$1',[codi_ball]).then(function(result){
		
		res.send(result.rows)
	}).catch(function(err){
		console.log(err);
	})
});
router.post('/elimina',function(req,res){
	console.log(req.body)
	 db.query('DELETE FROM balladors WHERE dni=$1 AND codi_ball=$2',[req.body.dni,req.body.codi_ball]).then(function(result){
		db.query('UPDATE soci SET codi_ball=NULL WHERE dni=$1',[req.body.dni]).then(function(result){
				res.send("200ok")
			}).catch(function(err){
				console.log(err);
			})
        
       
	}).catch(function(err){
		console.log(err);
	})
	

})
router.post('/eliminaAlternatiu',function(req,res){
	console.log(req.body)
	 db.query('DELETE FROM balladors WHERE dni=$1 AND codi_ball=$2',[req.body.dni,req.body.codi_ball]).then(function(result){
		db.query('UPDATE soci SET codi_ball2=NULL WHERE dni=$1',[req.body.dni]).then(function(result){
				res.send("200ok")
			}).catch(function(err){
				console.log(err);
			})
        
       
	}).catch(function(err){
		console.log(err);
	})
	

})
router.post('/',function(req,res){
	console.log(req.body)
	 db.query('DELETE FROM balladors WHERE dni=$1',[req.body.dni]).then(function(result){

		db.query('INSERT INTO balladors(dni,codi_ball) values($1,$2)',[req.body.dni,req.body.codi_ball]).then(function(result){
            console.log(result)
        }).then(function(){
			db.query('UPDATE soci SET codi_ball=$1 WHERE dni=$2',[req.body.codi_ball,req.body.dni]).then(function(result){
				res.send("200ok")
			}).catch(function(err){
				console.log(err);
			})
            
        }).catch(function(err){
            console.log(err);
        })
       
	}).catch(function(err){
		console.log(err);
	})
	

})
router.post('/ballAlternatiu',function(req,res){
	db.query('INSERT INTO balladors(dni,codi_ball) values($1,$2)',[req.body.dni,req.body.codi_ball]).then(function(result){
		console.log(result)
	}).then(function(){
		db.query('UPDATE soci SET codi_ball2=$1 WHERE dni=$2',[req.body.codi_ball,req.body.dni]).then(function(result){
			res.send("200ok")
		}).catch(function(err){
			console.log(err);
		})
		
	}).catch(function(err){
		console.log(err);
	})
})
module.exports=router