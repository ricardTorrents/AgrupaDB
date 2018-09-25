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
		el: '#vueInsertaBallExtern',
		
		data:{
            url:'',
			baseUrl:'1',
            ballExtern:'',
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
              
               axios.post(self.baseUrl+'ballsExterns',{
                    nom:document.getElementById("ballExternNom").value,
                    nparticipants:document.getElementById("ballExternNparticipants").value,
                   
                    email:document.getElementById("ballExternEmail").value,
                    
                    telefon:document.getElementById("ballExternTelefon").value,
                    telefon2:document.getElementById("ballExternTelefon2").value,
                   
                    poblacio:document.getElementById("ballExternPoblacio").value,
                   
                 
                
                }).then(function(response,body){
                    
                          
                    location.replace(self.url+'/ballsExterns'+self.num)
                }).catch(function (error) {
                    console.log(error.message)
            
                })

                 
               
                
            },
            cancela:function(){

                location.replace(this.url+'/ballsExterns')
            },

        }
    
    })
})