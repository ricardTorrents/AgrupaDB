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
		el: '#vueBallsExterns',
		
		data:{
			url:'',
			baseUrl:'http://localhost:3000/api/',
			ballExternSeleccionat:'',
			ballExternBuit:{
				nom:"--",
				nparticipants:0,
				telefon:"--",
				telefon2:"--",
				poblacio:"---",
				email:"---",
				

			},
			
			lBallExtern:[],
			numini:'',
			ultimapagina:false,
			primerapagina:true,
			total:'',
			filter:false,
			noBallExtern:false,
			nUltima:'',
			pagActual:''
			
		},
		mounted: function () {
			this.baseUrl='http://'+location.host+'/api/'
			this.url='http://'+location.host
			let numero=(location.search).substr(1)
			this.carregaBallExtern(numero)
			this.totalExterns()
			
			
			
		},
		methods: {
			totalExterns:function(){
				let self=this
				
				axios.get(self.baseUrl +'ballsExterns/total').then(function(response){
					
					self.total=parseInt(response.data)
					
				
				}).then(function(){
				
					if(self.total<=20){
						console.log("hol")
						self.ultimapagina=true
					}
					console.log(self.total)
					self.nUltima=parseInt(self.total/21)+1
					
				}).catch(function (error) {
					console.log(error.message)
			  })
			},
            carregaBallExtern:function(numero){
				let self=this
				console.log(numero)
				self.numini=parseInt(numero)-(parseInt(numero)%20)+1
				self.pagActual=parseInt(parseInt(numero)/20)+1
				console.log(self.numini)
				let numeroArray=parseInt(numero)-self.numini
				
								
				axios.get(self.baseUrl +'ballsExterns/paginacio/'+self.numini).then(function(response){
					
                    self.lBallExtern=(response.data)
                    if(self.lBallExtern[0]==null){
						self.ballExternSeleccionat=self.ballExternBuit
						self.noBallExtern=true
						document.getElementById("missatgeError").innerHTML="No hi ha resultats"
					}else{
						document.getElementById("missatgeError").innerHTML=""
						self.ballExternSeleccionat=self.lBallExtern[numeroArray]
					}
                    
				}).catch(function (error) {
					console.log(error.message)
			  })
			},
			paginaSeguent:function(){
				let self=this
				let n=this.numini+20
				if(n<=this.total){
					this.primerapagina=false
					self.lBallExtern=[]
					self.numero=n
					this.carregaBallExtern(n)
					if(n+20>=this.total){
						this.ultimapagina=true
					}
				}

			},
			paginaAnterior:function(){
				let self=this
				let n=this.numini-20
				if(n>=1){
					this.ultimapagina=false
					self.lBallExtern=[]
					self.numero=n
					self.carregaBallExtern(n)
					if(n-20<=0){
						self.primerapagina=true
					}
				}
			},
			modificaBallExtern:function(){
				let self=this
				if(self.noBallExtern==false){
					location.replace(self.url+'/modificaballsExterns?'+this.ballExternSeleccionat.numero)
				}
				
			},
			tancaFiltre:function(){
				console.log("g")
				this.filter=false
				this.carregaBallExtern()
			},
			filtre:function(){
					this.filter=true
					let valor=document.getElementById("campText").value
					let tipus=document.getElementById("seleccionaFiltre").value
					
				
					if(tipus=="Poblacio"){
						urlTipus="filtrePoblacio"
						
					}
					if(tipus=="Nom"){
						urlTipus="filtreNom"
					}

					let self=this
					axios.get(self.baseUrl +'ballsExterns/'+urlTipus+'/'+valor).then(function(response){
					
						self.lBallExtern=(response.data)
						if(self.lBallExtern[0]==null){
							self.ballExternSeleccionat=self.ballExternBuit
							self.noBallExtern=true
							document.getElementById("missatgeError").innerHTML="No hi ha resultats"
						}else{
							document.getElementById("missatgeError").innerHTML=""
							self.ballExternSeleccionat=self.lBallExtern[0]
						}
						
						
					}).catch(function (error) {
						console.log(error.message)
				  })
				
			},
			
			insertaBallExtern:function(){
				console.log("hola")
				location.replace(this.url+'/insertaBallExtern')
			},
			
			seleccionaBallExtern:function(ball){
				this.ballExternSeleccionat=ball
			}
        }
    })
})