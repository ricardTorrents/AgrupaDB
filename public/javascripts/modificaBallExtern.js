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
		el: '#vueModificaBallExtern',
		
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
			this.carregaDades()
        },
        methods:{
            /**
             * Carrega les dades del soci en els diferents camps del formulari.
             */
            carregaDades:function(){
                let self=this
                this.nom=(location.search).substr(1)
                console.log(this.nom)
              
               
               axios.get(self.baseUrl +'ballsExterns/'+self.nom).then(function(response){
                   self.ballExtern=response.data[0]
                   console.log(response.data[0].poblacio)
                  
                  
                  
               }).catch(function (error) {
                console.log(error.message)
            })

            },

           
            
            cancela:function(){
                location.replace(this.url+'/ballsExterns'+this.num)
            
            },
            /**
             * Realitza un Update del soci a la base de dades, tambe crea nous registres en la llista d'espera si es necessari.
            */
            modificaBallExtern:function(){
               let self=this
              
               axios.put(self.baseUrl+'ballsExterns',{
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
            /**
             * Elimina el soci, mostra un popup de confirmació
             */
            elimina:function(){
                if(confirm("Estas segur d'eliminar el ball "+this.ballExtern.nom+"?")){
                
                    let self=this
                    let nom=(location.search).substr(1)
                    console.log(nom)
                    axios.delete(self.baseUrl +'ballsExterns/'+nom,{
                    
                    }).then(function(response){
                       
                            location.replace(self.url+'/ballsExterns')
                        }).catch(function (error) {
                            console.log(error.message)
        
                         })
                            
                    
                }else{
                    console.log("cancelat")
                }

            },
            cancelea:function(){

                location.replace(self.url+'/ballsExterns'+self.num)
            },

        }
    
    })
})