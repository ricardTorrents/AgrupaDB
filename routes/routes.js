var socis=require('./socis')
var balls=require('./balls')
var balladors=require('./balladors')
var llistaEspera=require('./llistaEspera')
exports.create=function(app){
	var baseAPI='/api'
	app.use(baseAPI+'/socis',socis)
	app.use(baseAPI+'/balls',balls)
	app.use(baseAPI+'/balladors',balladors)
	app.use(baseAPI+'/llistaEspera',llistaEspera)
}
