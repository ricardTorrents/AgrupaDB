/**
 * Funcions per la taula Balladors
 */

express = require('express');

router=express.Router();

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


module.exports=router