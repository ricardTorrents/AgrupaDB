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
			numSoci:'',
			total:'',
			filter:false
			
		},
		mounted: function () {
			this.baseUrl='http://'+location.host+'/api/'
			this.url='http://'+location.host
			this.totalSocis()
			this.carregaBalls()
			
			
		},
		methods: {
			totalSocis:function(){
				let self=this
				
				axios.get(self.baseUrl +'socis/total').then(function(response){
					
					self.total=parseInt(response.data)
				}).catch(function (error) {
					console.log(error.message)
			  })
			},
			carregaBalls:function(){
				let self=this
					
					axios.get(self.baseUrl +'balls').then(function(response){
						let b=response.data
						
						b.forEach(function(ball){
						
							self.lballs.push(ball)
						})
						
					}).then(function(){
						
						self.numSoci=(location.search).substr(1)
						console.log(self.numSoci)
						self.carregaSocis(self.numSoci)
					}).catch(function (error) {
		 				 console.log(error.message)
					})
			},
			carregaSocis:function(num){
				
					if(num<=0){
						num=1
						this.numSoci=1
					}
					
					let self=this
				
					self.lsocis=[]
					
					axios.get(self.baseUrl +'socis/paginacio/'+num).then(function(response){
						let s=response.data
						let actual= new Date()
						actual=actual.getFullYear()
						s.forEach(function(soci){
							if(soci.datapagament!=null){
								let d=new Date(soci.datapagament)
								let mes=parseInt(d.getMonth())+1
								soci.datapagament=d.getFullYear()+'-'+mes+'-'+d.getDate()
								
								if(parseInt(d.getFullYear())>=parseInt(actual)){
									
									soci.pagat=true
								}else{
									soci.pagat=false
								}
							}else{
								soci.pagat=false
								soci.datapagament="No ha pagat mai"
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
			EliminarFiltre:function(){
				this.filter=false
				document.getElementById("missatgeError").innerHTML=""
				this.carregaSocis(this.numSoci)
				
			},
			filtre:function(){
				this.filter=true
				let valor=document.getElementById("campText").value
				let tipus=document.getElementById("seleccionaFiltre").value
				let urlTipus="filtreDni"
				console.log(valor)
				console.log(tipus)
				if(tipus=="Cognom"){
					urlTipus="filtreCognom"
				}
				if(tipus=="Nom"){
					urlTipus="filtreNom"
				}
				let self=this
			
				
				self.lsocis=[]
				axios.get(self.baseUrl +'socis/'+urlTipus+'/'+valor).then(function(response){
					let s=response.data
					let actual= new Date()
					actual=actual.getFullYear()
					
					s.forEach(function(soci){
						if(soci.datapagament!=null){
							let d=new Date(soci.datapagament)
							let mes=parseInt(d.getMonth())+1
							soci.datapagament=d.getFullYear()+'-'+mes+'-'+d.getDate()
							
							if(parseInt(d.getFullYear())>=parseInt(actual)){
								
								soci.pagat=true
							}else{
								soci.pagat=false
							}
						}else{
							soci.pagat=false
							soci.datapagament="No ha pagat mai"
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
					if(s.length==0){
						document.getElementById("missatgeError").innerHTML="No hi ha coincidencies"
					}else{
						
						document.getElementById("missatgeError").innerHTML=""
						self.sociSeleccionat=self.lsocis[0]
					}
					
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
					let d=new Date()
					let mes=parseInt(d.getMonth())+1
					self.sociSeleccionat.datapagament=d.getFullYear()+'-'+mes+'-'+d.getDate()
					self.lsocis.forEach(function(soci){
						if(soci.numerosoci==self.sociSeleccionat.numerosoci){
							soci.pagat=true
							soci.datapagament=self.sociSeleccionat.datapagament
						}
					})

					
				}).catch(function (error) {
					console.log(error.message)
				 })
			},
			nouSoci:function(){
				location.replace(this.url+'/nouSoci')
			},
			paginaAnterior:function(){
				this.numSoci=parseInt(this.numSoci)-20
				
				this.carregaSocis(this.numSoci)
			},
			paginaSeguent:function(){
				
				this.numSoci=parseInt(this.numSoci)+20
				
				if(this.numSoci>=this.total){
					this.numSoci=this.numSoci-20
				}else{
					this.carregaSocis(this.numSoci)
				}
				
			
			},
			modificasoci:function(){
				location.replace(this.url+'/modificaSoci?'+this.sociSeleccionat.numerosoci)
			},
			pagImpresio:function(){
				location.replace(this.url+'/imprimeixSocis')
			}
		
		}
	})
})
