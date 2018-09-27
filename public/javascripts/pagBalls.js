/**
 * Javascript pagina Balls
 */

window.addEventListener('load',function(){
	window.onresize=function() {
	if(window.innerWidth <=990){
		document.getElementsByTagName("body")[0].style.overflowX ="hidden"
		document.getElementsByTagName("body")[0].style.overflowX ="hidden"
	}else{
	 document.getElementsByTagName("body")[0].style.overflow ="hidden"
	 window.scrollTo(0,0);
	}
	}
	

	new Vue({
		el: '#vuepagBalls',
		
		data:{
			baseUrl:'',
			
			ballSeleccionat:'',
			url:'',
			filter:false,
			lballs:[],
			
			
		},
		mounted: function () {
			this.baseUrl='http://'+location.host+'/api/'
			this.url='http://'+location.host
			this.carregaBalls()
			
			
		},
		methods: {
			/**
			 * Carrega els Balls de la Base de dades 
			 */
			carregaBalls:function(){
				let self=this
					console.log(self.baseUrl +'balls')
					axios.get(self.baseUrl +'balls').then(function(response){
						self.lballs=response.data
						self.ballSeleccionat=self.lballs[0]
						
					}).then(function(){
						self.carregaSocis()
					}).catch(function (error) {
		 				 console.log(error.message)
					})
			},
			/**
			 * Mostra el detall del ball seleccionat, tambe mostra els balladors i els socis en llista d'espera.
			 */
            mostraDetallBall:function(ball){
				this.ballSeleccionat=ball;
				
			},
		
			
			
			/**
			 * Redirigeix a la pagina afegir ball
			 */
			nouBall:function(){
				location.replace(this.url+"/nouBall")
			},
			/**
			 * Redirigeix a la pagina d'inici
			 */
			retornaInici:function(){
				location.replace(this.url+'/inici')
			},
			/**
			 * Redirigeix a la pagina de modifica ball
			 */
			modificaball:function(){
				location.replace(this.url+'/modificaball?'+this.ballSeleccionat.codi_ball)
			},
			balladors:function(){
				location.replace(this.url+'/balladors?'+this.ballSeleccionat.codi_ball)
			},
			
		}
	})
})