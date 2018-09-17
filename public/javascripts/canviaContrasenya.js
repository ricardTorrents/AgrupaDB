/**
 * Javascript de la pagina inserta socis
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
		el: '#vueContrasneya',
		
		data:{
			baseUrl:'',
            url:'',
           

			
		},
		mounted: function () {
			this.url='http://'+location.host
            this.baseUrl='http://'+location.host+'/'
           
        },
        methods:{
            canvia:function(){
                let self=this
                console.log(this.baseUrl+'canviaContrasenya')
                let nova=document.getElementById("NovaContrasenya").value
                let repeticio=document.getElementById("Repeticio").value
                let antiga=document.getElementById("contrasenya").value
                if(antiga==''||antiga==null){
                    document.getElementById("missatgeErrorRepeticio").innerHTML=""
                    document.getElementById("missatgeErrorNova").innerHTML=""
                    document.getElementById("missatgeErrorAntiga").innerHTML="Contrasenya antiga buida"
                }else{
                    if(nova==''||nova==null){
                        document.getElementById("missatgeErrorAntiga").innerHTML=""
                        document.getElementById("missatgeErrorRepeticio").innerHTML=""
                        document.getElementById("missatgeErrorNova").innerHTML="La nova Contrasenya esBuida"
                        
                    }else{
                        if(nova==repeticio){
                            document.getElementById("missatgeErrorAntiga").innerHTML=""
                            document.getElementById("missatgeErrorNova").innerHTML=""
                        
                            document.getElementById("missatgeErrorRepeticio").innerHTML=""
                  
                            axios.put(this.url+'/canviaContrasenya',{
                            
                                contrasenya:document.getElementById("contrasenya").value,
                                novacontrasenya:document.getElementById("NovaContrasenya").value
                                
                            }).then(function(response){
                                console.log(response)
                                if(response.data=="Correcte"){
                                    document.getElementById("missatgeError").innerHTML=""
                                    location.replace(self.url+'/socis')
                                }else{
                                    document.getElementById("missatgeErrorNova").innerHTML=""
                                    document.getElementById("missatgeErrorRepeticio").innerHTML=""
                                    document.getElementById("missatgeErrorAntiga").innerHTML="Contrasenya antiga incorrecte"
                                }
                            }).catch(function (error) {
                                console.log(error.message)
                            })
                        }else{
                            document.getElementById("missatgeErrorAntiga").innerHTML=""
                            document.getElementById("missatgeErrorNova").innerHTML=""
                            document.getElementById("missatgeErrorRepeticio").innerHTML="La nova Contrasenya no coincideix"
                        }
                   }
                }
            }
        }
    })
})