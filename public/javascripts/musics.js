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
		el: '#vueMusics',
		
		data:{
			url:'',
			baseUrl:'http://localhost:3000/api/',
			musicSeleccionat:'',
			musicBuit:{
				nom:"--",
				nparticipants:0,
				telefon:"--",
				telefon2:"--",
				poblacio:"---",
				email:"---",
				tipus:"indeterminat"

			},
			filtreTipus:false,
			lmusics:[],
			
			nomMusic:'',
			total:'',
			filter:false,
			noMusics:false,
			nUltima:'',
			pagActual:'',
			numini:'',
			ultimapagina:false,
			primerapagina:true,
			total:'',
			
		},
		mounted: function () {
			this.baseUrl='http://'+location.host+'/api/'
			this.url='http://'+location.host
			let numero=(location.search).substr(1)
			this.totalMusics()
			this.carrregaMusics(numero)
			
			
			
			
		},
		methods: {
			totalMusics:function(){
				let self=this
				
				axios.get(self.baseUrl +'musics/total').then(function(response){
					
					self.total=parseInt(response.data)
					
				}).then(function(){
					
					if(self.total<=20){
						console.log("hol")
						self.ultimapagina=true
					}
					self.nUltima=parseInt(self.total/21)+1
					console.log(self.ultimapagina)
				}).catch(function (error) {
					console.log(error.message)
			  })
			},
            carrregaMusics:function(numero){
				let self=this
				console.log(numero)
				self.numini=parseInt(numero)-(parseInt(numero)%20)+1
				self.pagActual=parseInt(parseInt(numero)/20)+1
				console.log(self.numini)
				let numeroArray=parseInt(numero)-self.numini
				
				axios.get(self.baseUrl +'musics/paginacio/'+self.numini).then(function(response){
					
                    self.lmusics=(response.data)
                    
				}).then(function(){
					if(self.lmusics[0]==null){
						self.musicSeleccionat=self.musicBuit
						self.noMusics=true
						document.getElementById("missatgeError").innerHTML="No hi ha resultats"
					}else{
						document.getElementById("missatgeError").innerHTML=""
						self.musicSeleccionat=self.lmusics[numeroArray]
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
					self.lmusics=[]
					self.numero=n
					this.carrregaMusics(n)
					if(n+20>=this.total){
						this.ultimapagina=true
					}
				}

			},
			paginaAnterior:function(){
				let self=this
				let n=this.numini-20
				if(n>=1){
					this.lmusics=false
					self.lBallExtern=[]
					self.numero=n
					self.carrregaMusics(n)
					if(n-20<=0){
						self.primerapagina=true
					}
				}
			},
			modificaMusic:function(){
				let self=this
				if(self.noMusics==false){
					location.replace(self.url+'/modificaMusic?'+this.musicSeleccionat.numero)
				}
				
			},
			tancaFiltre:function(){
				console.log("g")
				this.filter=false
				let numero=(location.search).substr(1)
				this.carrregaMusics(numero)
			},
			filtre:function(){
					this.filter=true
					let valor=document.getElementById("campText").value
					let tipus=document.getElementById("seleccionaFiltre").value
					
				
					if(tipus=="Tipus"){
						urlTipus="filtreTipus"
						
					}
					if(tipus=="Nom"){
						urlTipus="filtreNom"
					}

					let self=this
					
					axios.get(self.baseUrl +'musics/'+urlTipus+'/'+valor).then(function(response){
					
						self.lmusics=(response.data)
						if(self.lmusics[0]==null){
							self.musicSeleccionat=self.musicBuit
							self.noMusics=true
							document.getElementById("missatgeError").innerHTML="No hi ha resultats"
						}else{
							document.getElementById("missatgeError").innerHTML=""
							self.musicSeleccionat=self.lmusics[0]
						}
						
						
					}).catch(function (error) {
						console.log(error.message)
				  })
				
			},
			comprovaTipus: function(){
				if(document.getElementById("seleccionaFiltre").value=="Tipus"){
					this.filtreTipus= true
				}else{
					this.filtreTipus= false
				}
			},
			insertaMusic:function(){
				console.log("hola")
				location.replace(this.url+'/insertaMusic')
			},
			
			seleccionaMusic:function(music){
				
				this.musicSeleccionat=music
			}
        }
    })
})