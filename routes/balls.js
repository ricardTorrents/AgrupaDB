express = require('express');
bodyParser=require('body-parser')
router=express.Router();
router.use(bodyParser.json())
router.use(function timeLog(req,res,next){
	console.log('Time: ',Date.now())
	next()
})
router.get('/',function(req,res){
	db.query("SELECT * FROM ball ORDER BY codi_ball").then(function(result){
		console.log(result.rowCount)
		var response=result.rows
		res.send(response)
	}).catch(function(err){
		console.log(err);
	})
	
});
router.get('/:codi_ball',function(req,res){
	codi=req.params.codi_ball
	
	db.query('SELECT * FROM ball WHERE ball.codi_ball=$1',[codi]).then(function(result){
		res.send(result.rows)
	}).catch(function(err){
		console.log(err);
	})
});

router.put('/:codi_ball',function(req,res){
	
	codi=req.params.codi_ball	
	db.query('UPDATE ball SET nom=$1,sexe=$2,numParticipants=$3,edat_minima=$4,edat_maxima=$5 WHERE codi_ball=$6',[req.body.nom,req.body.sexe,req.body.numParticipants,req.body.edat_minima,req.body.edat_maxima,codi]).then(function(result){
		res.send("200OK")
	}).catch(function(err){
		console.log(err);
	})
	
})
router.post('/',function(req,res){
	
	
	db.query('INSERT INTO ball(nom,sexe,numParticipants,edat_minima,edat_maxima) values($1,$2,$3,$4,$5)',[req.body.nom,req.body.sexe,req.body.numParticipants,req.body.edat_minima,req.body.edat_maxima]).then(function(result){
		console.log(result)
	}).catch(function(err){
		console.log(err);
	})
	res.send("200ok")
})
router.delete('/:codi_ball',function(req,res){
	var codi=parseInt(req.params.codi_ball)
		console.log("codi: "+codi)
		db.query("SELECT count(*) from ball").then(function(result){
			var balls=result.rows[0].count
			console.log("total balls: "+balls)
			db.query("DELETE FROM ball WHERE codi_ball=$1",[codi]).then(function(){
				 c=codi+1
				 console.log("ball Modifcar codi: "+c)
				while(c<=balls){
					
					db.query("UPDATE ball SET codi_ball=codi_ball-1 WHERE codi_ball=$1",[c]).then(function(){
						
					}).catch(function(err){
						console.log(err);
						res.send("error UPDATE")
					})

					c=c+1;
				}
				
			}).then(function(){
				var b=parseInt(balls)
				
				db.query("ALTER SEQUENCE ball_codi_ball_seq RESTART WITH "+b).then(function(){
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
