
/**
 * Javascript Incerir Balls 
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
		el: '#vueinsertaball',
		
		data:{
			baseUrl:'',
			url:''
			
		},
		mounted: function () {
			this.url='http://'+location.host
			this.baseUrl='http://'+location.host+'/api/'
        },
        methods:{
            /**
             * Retorna a la pagina de Balls i cancela el afegir un nou ball
             */
            cancela:function(){
                location.replace(this.url+'/balls')
            
            },
            /**
             * Insereix el nou ball a la base de dades 
             */
            afegeixBall:function(){
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
				 
               axios.post(self.baseUrl+'balls/',{
				   
                    nom:document.getElementById("ballNom").value,
                    numParticipants:document.getElementById("ballParticipants").value,
                    edat_minima:document.getElementById("ballEdatMinima").value,
                    edat_maxima:document.getElementById("ballEdatMaxima").value,
					sexe:s,
                  
				
                }).then(function(response){
                    
				location.replace(self.url+'/balls')
            

                }).catch(function (error) {
                    console.log(error.message)

                 })
            }
        }
    
    })
})