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
		el: '#vueBallsLEspera',
		
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
			this.carregaDades()
			
			
		},
		methods: {
			/**
			 * Carrega els Balls de la Base de dades 
			 */
			carregaDades:function(){
				let self=this
				let codi=(location.search).substr(1)
			   
				
				axios.get(self.baseUrl +'balls/'+codi).then(function(response){
				   self.ballSeleccionat=response.data[0]
				   
				  
					
				}).then(function(){
					self.carregaSocis()
				}).catch(function (error) {
				 console.log(error.message)
				   })
			},
			
			/**
			 * Mostra el detall del ball seleccionat, tambe mostra els balladors i els socis en llista d'espera.
			 */
            carregaBalladors:function(){
			
				let self=this
				self.lballadors=[]
				
				axios.get(self.baseUrl+'balladors/'+self.ballSeleccionat.codi_ball).then(function(response){
					let balladors=response.data
					console.log(balladors.length)
					
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
					console.log(self.lEspera)
					let index =0
					let j=0
					let menors=[]
					self.lEspera.forEach(function(l){
						trobat=false
						i=0
						
						console.log(index)
						
						while((i<self.lsocis.length)&&(trobat==false)){
							if(self.lsocis[i].dni==l.dni){
								trobat=true
								l.nom=self.lsocis[i].nom+" "+self.lsocis[i].cognoms
								l.telefon=self.lsocis[i].telefon
								l.telefon2=self.lsocis[i].telefon2
								console.log(self.ballSeleccionat.edat_minima)
								console.log(self.lsocis[i].edat<self.ballSeleccionat.edat_minima)
								if(self.lsocis[i].edat<self.ballSeleccionat.edat_minima){
									menors[j]=index
									j=j+1
								}
							}else{
								i=i+1
							}
						}
						
						d=new Date(l.data)
						mes=parseInt(d.getMonth())+1
						l.data=d.getFullYear()+'-'+mes+'-'+d.getDate()
						console.log(l.data)
						
						index=index+1
						
						})
						menors.forEach(function(m){
							self.lEspera.splice(m,1)
						})
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
							
							self.lsocis.push(soci)
						})
						self.sociSeleccionat=self.lsocis[0]
					}).then(function(){
						self.carregaBalladors()
					}).catch(function (error) {
		 				 console.log(error.message)
					})
			},
			
			/**
			 * Redirigeix a la pagina afegir ball
			 */
			
			/**
			 * Redirigeix a la pagina d'inici
			 */
			retornaInici:function(){
				location.replace(this.url+'/balls')
			},
			/**
			 * Redirigeix a la pagina de modifica ball
			 */
			introdueixalBall(soci){
				let self=this
				console.log(soci.dni)
				axios.post(self.baseUrl+'balladors/',{
					dni:soci.dni,
					codi_ball:self.ballSeleccionat.codi_ball
				}).then(function(){
					axios.post(self.baseUrl+'llistaEspera/elimina',{
						dni:soci.dni,
						codi_ball:self.ballSeleccionat.codi_ball,
						posicio:soci.posicio
					}).then(function(){
						let codi=(location.search).substr(1)
							console.log(codi)
							location.replace('http://localhost:3000/balladors?'+codi)
					}).catch(function (error) {
						console.log(error.message)
					})
				}).catch(function (error) {
					console.log(error.message)
				})
			},
			eliminaLlistaEspera(soci){
				let self=this
				axios.post(self.baseUrl+'llistaEspera/elimina',{
					dni:soci.dni,
					codi_ball:self.ballSeleccionat.codi_ball,
					posicio:soci.posicio
				}).then(function(){
					let codi=(location.search).substr(1)
						console.log(codi)
						location.replace('http://localhost:3000/balladors?'+codi)
				}).catch(function (error) {
					console.log(error.message)
				})
			},
			posaAlFinal(soci){
				let self=this
				axios.post(self.baseUrl+'llistaEspera/elimina',{
					dni:soci.dni,
					codi_ball:self.ballSeleccionat.codi_ball,
					posicio:soci.posicio
			   }).then(function(){
					axios.post(self.baseUrl+'llistaEspera',{
						dni:soci.dni,
						codi_ball:self.ballSeleccionat.codi_ball
					}).then(function(response,body){
						let codi=(location.search).substr(1)
						console.log(codi)
						location.replace('http://localhost:3000/balladors?'+codi)
					}).catch(function (error) {
						console.log(error.message)

					})
			   }).catch(function (error) {
					 console.log(error.message)
			   })
			}
			
		}
	})
})