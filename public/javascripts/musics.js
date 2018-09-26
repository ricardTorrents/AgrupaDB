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
			noMusics:false
			
		},
		mounted: function () {
			this.baseUrl='http://'+location.host+'/api/'
			this.url='http://'+location.host
			this.carrregaMusics()
			
			
		},
		methods: {
            carrregaMusics:function(){
				let self=this
				
				axios.get(self.baseUrl +'musics').then(function(response){
					
                    self.lmusics=(response.data)
                    
				}).then(function(){
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
			modificaMusic:function(){
				let self=this
				if(self.noMusics==false){
					location.replace(self.url+'/modificaMusic?'+this.musicSeleccionat.nom)
				}
				
			},
			tancaFiltre:function(){
				console.log("g")
				this.filter=false
				this.carrregaMusics()
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