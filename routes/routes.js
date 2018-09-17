var socis=require('./socis')
var balls=require('./balls')
var balladors=require('./balladors')
var llistaEspera=require('./llistaEspera')
var baixes=require('./baixes')

/**
 * 
 * @param {} app 
 * Defineix el fitxer i la url per accedir a les funcions de la Api de cada taula de la base de dades
 */
exports.create=function(app){
	var baseAPI='/api'
	app.use(baseAPI+'/socis',socis)
	app.use(baseAPI+'/balls',balls)
	app.use(baseAPI+'/balladors',balladors)
	app.use(baseAPI+'/llistaEspera',llistaEspera)
	app.use(baseAPI+'/baixes',baixes)
	
	
}
