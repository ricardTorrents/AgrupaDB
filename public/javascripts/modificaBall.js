/**
 * Javascript Pagina modifica Ball 
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
		el: '#vueModificaBall',
		
		data:{
            url:'',
			baseUrl:'',
			ball:''
			
		},
		mounted: function () {
            this.url='http://'+location.host
            this.baseUrl='http://'+location.host+'/api/'
			this.carregaDades()
        },
        methods:{
            /**
             * Carrega les dades del Ball en els diferents camps del formulari
             */
            carregaDades:function(){
               let self=this
               let codi=(location.search).substr(1)
              
               
               axios.get(self.baseUrl +'balls/'+codi).then(function(response){
                  self.ball=response.data[0]
                  
                  console.log(self.ball)
                  if(self.ball.sexe=='D'){
                      document.getElementById("d").checked="checked"
                  }else{
                      if(self.ball.sexe=='H'){
                         document.getElementById("h").checked="checked"
                 
                        }else{
                            document.getElementById("m").checked="checked"
                        }
                    }
                   
                   
               }).catch(function (error) {
                console.log(error.message)
          })

            },
            /**
             * Cancela la modificacio de les dades del ball i retorna a la pagian de balls
             */
            cancela:function(){
                location.replace(this.url+'/balls')
            
            },
            /**
             * Realitza un update del ball en la base de dades 
             */
            modificaBall:function(){
               let self=this
               let s=''
               if(document.getElementById("d").checked){
                    s="D"
                }else{
                    if(document.getElementById("h").checked){
                        s="H"
                    }else{
                        s="M"
                    }
                }
               axios.put(self.baseUrl+'balls/'+self.ball.codi_ball,{
                    nom:document.getElementById("ballNom").value,
                    numParticipants:document.getElementById("ballParticipants").value,
                    edat_minima:document.getElementById("ballEdatMinima").value,
                    edat_maxima:document.getElementById("ballEdatMaxima").value,
                    sexe:s,
                    codi_ball:self.ball.codi_ball
                
                }).then(function(response,body){
                    
                    location.replace(self.url+'/balls')

                }).catch(function (error) {
                    console.log(error.message)

                 })
               
                
            },
            /**
             * Elimina el Ball de la base de dades, mostra popup de confirmació.
             */
            elimina:function(){
                
                if(confirm("Estas segur d'eliminar el ball: "+this.ball.nom+"?")){
                    let self=this
                    let codi=(location.search).substr(1)
                    console.log(codi)
                    axios.delete(self.baseUrl +'balls/'+codi).then(function(response){
                        location.replace(self.url+'/balls')
                    }).catch(function (error) {
                        console.log(error.message)
    
                     })
                }

            }

        }
    
    })
})