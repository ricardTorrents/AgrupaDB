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
			
			
			total:'',
			filter:false,
			noBallExtern:false
			
		},
		mounted: function () {
			this.baseUrl='http://'+location.host+'/api/'
			this.url='http://'+location.host
			this.carregaBallExtern()
			
			
		},
		methods: {
            carregaBallExtern:function(){
				let self=this
				
				axios.get(self.baseUrl +'ballsExterns').then(function(response){
					
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
			modificaBallExtern:function(){
				let self=this
				if(self.noBallExtern==false){
					location.replace(self.url+'/modificaballsExterns?'+this.ballExternSeleccionat.nom)
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