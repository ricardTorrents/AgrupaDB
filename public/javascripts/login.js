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
		el: '#vueLogin',
		
		data:{
			baseUrl:'',
            url:'',
           

			
		},
		mounted: function () {
			this.url='http://'+location.host
            this.baseUrl='http://'+location.host+'/'
           
        },
        methods:{
            login:function(){
                let self=this
                axios.put(self.baseUrl+'usuaris',{
					usuari:document.getElementById("usuari").value,
					contrasenya:document.getElementById("contrasenya").value
					
				}).then(function(response){
					console.log(response)
					if(response.data=="Correcte"){
						document.getElementById("missatgeError").innerHTML=""
						location.replace(self.url+'/socis')
					}else{
						document.getElementById("missatgeError").innerHTML="Dades incorrectes"
					}
				}).catch(function (error) {
					console.log(error.message)
				})
            }
        }
    })
})