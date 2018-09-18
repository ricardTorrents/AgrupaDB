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
		el: '#vueSocis',
		
		data:{
			url:'',
			baseUrl:'http://localhost:3000/api/',
			sociSeleccionat:'',
			ballSeleccionat:'',
			lsocis:[],
			lballs:[],
			lEspera:[],
			
		},
		mounted: function () {
			this.baseUrl='http://'+location.host+'/api/'
			this.url='http://'+location.host
			this.carregaBalls()
			
			
		},
		methods: {
			carregaBalls:function(){
				let self=this
					console.log(self.baseUrl +'balls')
					axios.get(self.baseUrl +'balls').then(function(response){
						let b=response.data
						
						b.forEach(function(ball){
						
							self.lballs.push(ball)
						})
						
					}).then(function(){
						self.carregaSocis()
					}).catch(function (error) {
		 				 console.log(error.message)
					})
			},
			carregaSocis:function(){
				let self=this
					console.log(self.baseUrl +'socis')
					axios.get(self.baseUrl +'socis').then(function(response){
						let s=response.data
						
						s.forEach(function(soci){
							
							if(soci.pagat==false){
								soci.cuota="No Pagada"
							}else{
								soci.cuota="Pagada"
							}

							if(soci.codi_ball!=null){
								
								soci.nomBall=self.lballs[soci.codi_ball-1].nom
							}else{
								soci.nomBall=null
								
							}
							if(soci.codi_ball2!=null){
								
								soci.nomBall2=self.lballs[soci.codi_ball2-1].nom
							}else{
								soci.nomBall2=null
								
							}
							
							self.lsocis.push(soci)
						})
						
						self.sociSeleccionat=self.lsocis[0]
					}).then(function(){
						axios.get(self.baseUrl +'llistaEspera/'+self.sociSeleccionat.dni).then(function(response){
							self.lEspera=response.data
							self.lEspera.forEach(function(l){
								trobat=false
								i=0
								
								while((i<self.lballs.length)&&(trobat==false)){
									if(self.lballs[i].codi_ball===l.codi_ball){
										trobat=true
										
										l.nom=self.lballs[i].nom
									}else{
										i=i+1
									}
								}
								d=new Date(l.data)
								mes=parseInt(d.getMonth())+1
								l.data=d.getFullYear()+'-'+mes+'-'+d.getDate()
								console.log(l.nom)
		
							})
						}).catch(function (error) {
							console.log(error.message)
					  })
					}).catch(function (error) {
		 				 console.log(error.message)
					})
			},
			
			mostraDetallSoci:function(soci){
				let self=this
				this.sociSeleccionat=soci
				self.lEspera=[]
				axios.get(self.baseUrl +'llistaEspera/'+self.sociSeleccionat.dni).then(function(response){
					self.lEspera=response.data
					self.lEspera.forEach(function(l){
						trobat=false
						i=0
						while((i<self.lballs.length)&&(trobat==false)){
							if(self.lballs[i].codi_ball==l.codi_ball){
								trobat=true
								l.nom=self.lballs[i].nom
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
				
			},
			pagat:function(){
				let self=this
				axios.put(self.baseUrl+'socis/pagat/'+self.sociSeleccionat.numerosoci,{
				}).then(function(){
					self.sociSeleccionat.pagat=true
					self.sociSeleccionat.cuota=true
					self.lsocis.forEach(function(soci){
						if(soci.numerosoci==self.sociSeleccionat.numerosoci){
							soci.pagat=true
							soci.cuota="Pagada"
						}
					})

					
				}).catch(function (error) {
					console.log(error.message)
				 })
			},
			nouSoci:function(){
				location.replace(this.url+'/nouSoci')
			},
			modificasoci:function(){
				location.replace(this.url+'/modificaSoci?'+this.sociSeleccionat.numerosoci)
			},
			retornaInici:function(){
				location.replace(this.url+'/inici')
			}
		}
	})
})
