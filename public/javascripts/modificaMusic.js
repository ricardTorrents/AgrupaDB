/**
 * Javascript pagina modifica Socis
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
		el: '#vueModificaMusic',
		
		data:{
            url:'',
			baseUrl:'1',
            music:'',
            edat:'',
            num:''
			
		},
		mounted: function () {
            this.url='http://'+location.host
            this.baseUrl='http://'+location.host+'/api/'
			this.carregaDades()
        },
        methods:{
            /**
             * Carrega les dades del soci en els diferents camps del formulari.
             */
            carregaDades:function(){
                let self=this
                self.num=(location.search).substr(1)
                
              
               console.log(self.num)
               axios.get(self.baseUrl +'musics/'+self.num).then(function(response){
                   self.music=response.data[0]

                   console.log(response.data[0].poblacio)
                  
                  
                  
               }).catch(function (error) {
                console.log(error.message)
            })

            },

           
            
            cancela:function(){
                location.replace(this.url+'/musics?'+this.num)
            
            },
            /**
             * Realitza un Update del soci a la base de dades, tambe crea nous registres en la llista d'espera si es necessari.
            */
            modificaMusic:function(){
               let self=this
              
               axios.put(self.baseUrl+'musics',{
                    nom:document.getElementById("musicNom").value,
                    nparticipants:document.getElementById("musicnParticipants").value,
                   
                    email:document.getElementById("musicEmail").value,
                    
                    telefon:document.getElementById("musicTelefon").value,
                    telefon2:document.getElementById("musicTelefon2").value,
                   
                    poblacio:document.getElementById("musicPoblacio").value,
                    tipus:self.music.tipus,
                    numero:self.music.numero
                 
                
                }).then(function(response,body){
                    
                          
                    location.replace(self.url+'/musics?'+self.num)
                }).catch(function (error) {
                    console.log(error.message)
            
                })

                        
               
                
            },
            /**
             * Elimina el soci, mostra un popup de confirmació
             */
            elimina:function(){
                if(confirm("Estas segur d'eliminar als musics "+this.music.nom+"?")){
                
                    let self=this
                    let nom=(location.search).substr(1)
                    console.log(nom)
                    axios.delete(self.baseUrl +'musics/'+nom,{
                    
                    }).then(function(response){
                       
                            location.replace(self.url+'/musics')
                        }).catch(function (error) {
                            console.log(error.message)
        
                         })
                            
                    
                }else{
                    console.log("cancelat")
                }

            },
            
        }
    
    })
})