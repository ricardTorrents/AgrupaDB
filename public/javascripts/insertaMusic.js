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
		el: '#vueInsertaMusic',
		
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
			
        },
        methods:{
            
            /**
             * Realitza un Update del soci a la base de dades, tambe crea nous registres en la llista d'espera si es necessari.
            */
            inserta:function(){
               let self=this
              
               axios.post(self.baseUrl+'musics',{
                    nom:document.getElementById("musicNom").value,
                    nparticipants:document.getElementById("musicnParticipants").value,
                   
                    email:document.getElementById("musicEmail").value,
                    
                    telefon:document.getElementById("musicTelefon").value,
                    telefon2:document.getElementById("musicTelefon2").value,
                   
                    poblacio:document.getElementById("musicPoblacio").value,
                    tipus:document.getElementById("musicTipus").value
                 
                
                }).then(function(response,body){
                    
                          
                    location.replace(self.url+'/musics?1')
                }).catch(function (error) {
                    console.log(error.message)
            
                })

                 
               
                
            },
            cancela:function(){

                location.replace(this.url+'/musics?1')
            },

        }
    
    })
})