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
			sociSeleccionat:'',
			ballSeleccionat:'',
			url:'',
			lsocis:[],
			lballs:[],
			lballadors:[],
			lEspera:[]
			
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
						let b=response.data
						console.log(b)
						b.forEach(function(ball){
                            
							self.lballs.push(ball)
						})
						
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
				let self=this
				self.lballadors=[]
				
				axios.get(self.baseUrl+'balladors/'+ball.codi_ball).then(function(response){
					let balladors=response.data
					console.log(balladors.length)
					if(balladors.length==0){
						document.getElementById("balladors").style.display="none"
					}else{
						document.getElementById("balladors").style.display="inherit"
					}
					balladors.forEach(function(ballador){
						let trobat=false
						let i=0
						
						while((i<self.lsocis.length)&&(trobat==false)){
							
							if(self.lsocis[i].dni===ballador.dni){
								trobat=true
							}else{
								i=i+1
							}
						}
						if(trobat===true){
							self.lballadors.push(self.lsocis[i])
						}
						
					})
					
				}).then(function(){
					self.lEspera=[]
					axios.get(self.baseUrl +'llistaEspera/ball/'+self.ballSeleccionat.codi_ball).then(function(response){
					self.lEspera=response.data
					self.lEspera.forEach(function(l){
						trobat=false
						i=0
						while((i<self.lsocis.length)&&(trobat==false)){
							if(self.lsocis[i].dni==l.dni){
								trobat=true
								l.nom=self.lsocis[i].nom+" "+self.lsocis[i].cognoms
							}else{
								i=i+1
							}
						}
						d=new Date(l.data)
						mes=parseInt(d.getMonth())+1
						l.data=d.getFullYear()+'-'+mes+'-'+d.getDate()
						console.log(l.data)
						})
					}).then(function(){
						if(self.lEspera.length==0){
							document.getElementById('lespera').style.display="none"
						}else{
							document.getElementById('lespera').style.display="inherit"
						}
					}).catch(function (error) {
						console.log(error.message)
					 })
				}).catch(function (error) {
					console.log(error.message)
			  	})
			 
			},
			/**
			 * Carrega la informacio dels socis en un array
			 */
			carregaSocis:function(){
				let self=this
					console.log(self.baseUrl +'socis')
					axios.get(self.baseUrl +'socis').then(function(response){
						let s=response.data
						
						s.forEach(function(soci){
							if(soci.codi_ball!=null){
								
								soci.nomBall=self.lballs[soci.codi_ball-1].nom
							}else{
								soci.nomBall="No Ballador"
							}
							self.lsocis.push(soci)
						})
						self.sociSeleccionat=self.lsocis[0]
					}).then(function(){
						self.mostraDetallBall(self.lballs[0])
					}).catch(function (error) {
		 				 console.log(error.message)
					})
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