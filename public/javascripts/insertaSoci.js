
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
		el: '#vueinsertaSocis',
		
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
             * Cancela afegir un nou soci i retorna a la pagina de socis
             */
            cancela:function(){
                location.replace(this.url+'/socis')
            
            },
            /**
             * Afegeix un nou Soci a la base de dades 
             */
            afegeixSoci:function(){
                let self=this
               let s=''
               if(document.getElementById("d").checked){
                    s="D"
                }else{
                    s="H"
				 }
				 console.log(document.getElementById("sociDataNaixement").value)
               axios.post(self.baseUrl+'socis/',{
				   
                    nom:document.getElementById("sociNom").value,
                    cognoms:document.getElementById("sociCognoms").value,
                    dni:document.getElementById("sociDni").value,
                    data_naixement:document.getElementById("sociDataNaixement").value,
					email:document.getElementById("sociEmail").value,
					ciutat:document.getElementById("sociCiutat").value,
                    adreça:document.getElementById("sociAdreça").value,
                    telefon:document.getElementById("sociTelefon").value,
                    telefon2:document.getElementById("sociTelefon2").value,
                    sexe:s,
                  
				
                }).then(function(response){
                    
				location.replace(self.url+'/socis')
            

                }).catch(function (error) {
                    console.log(error.message)

                 })
            }
        }
    
    })
})