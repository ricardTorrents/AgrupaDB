
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
            url:'',
            lballs:[],
            lballs1:[],
            lballs2:[],
            soci:''

			
		},
		mounted: function () {
			this.url='http://'+location.host
            this.baseUrl='http://'+location.host+'/api/'
            this.carregaBalls()
        },
        methods:{
            /**
             * Cancela afegir un nou soci i retorna a la pagina de socis
             */
            carregaBalls:function(){
				let self=this
					console.log(self.baseUrl +'balls')
					axios.get(self.baseUrl +'balls').then(function(response){
						let b=response.data
						console.log(b)
						b.forEach(function(ball,index){
                            
                            self.lballs.push(ball)
                            if(index%2==0){
                                self.lballs1.push(ball)
                            }else{
                                self.lballs2.push(ball)
                            }
                        
						})
						
					}).then(function(){
                        
					}).catch(function (error) {
		 				 console.log(error.message)
					})
            },
            cancela:function(){
                location.replace(this.url+'/socis')
            
            },
            /**
             * Afegeix un nou Soci a la base de dades 
             */
            afegeixSoci:function(){
                let self=this
                let i=0;
               let s=''
               if(document.getElementById("d").checked){
                    s="D"
                }else{
                    s="H"
                 }
                 self.soci.nom=document.getElementById("sociNom").value
                 self.soci.nomcognoms=document.getElementById("sociCognoms").value
                 self.soci.nomdni=document.getElementById("sociDni").value
                 self.soci.nomdata_naixement=document.getElementById("sociDataNaixement").value
                 self.soci.nomemail=document.getElementById("sociEmail").value
                 self.soci.nomciutat=document.getElementById("sociCiutat").value
                 self.soci.nomadreça=document.getElementById("sociAdreça").value
                 self.soci.nomtelefon=document.getElementById("sociTelefon").value
                 self.soci.nomtelefon2=document.getElementById("sociTelefon2").value
                 self.soci.nomsexe=s
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
                    let avui= new Date()
                    console.log("llistaEsp")
                    console.log(self.soci.data_naixement)
                    let naixement=self.soci.data_naixement
                    console.log(naixement)
                    console.log(avui.getFullYear())
                    console.log(naixement.getFullYear())
                    let edat=parseInt(avui.getFullYear())-parseInt(naixement.getFullYear())
                    console.log(edat)
                    while(i<self.lballs.length){
                        console.log(self.soci.dni);
                        console.log(self.lballs.codi_ball);
                        if(self.lballs[i].edat_maxima>edat){
                            let check=document.getElementById(self.lballs[i].codi_ball)
                            console.log(check.checked)
                            console.log(check.disabled)
                            if((check.checked==true)&&(check.disabled==false)){
                               
                                axios.post(self.baseUrl+'llistaEspera',{
                                    dni:self.soci.dni,
                                    codi_ball:self.lballs[i].codi_ball
                                   
                                }).then(function(response,body){
                                    location.replace(self.url+'/socis')
                                }).catch(function (error) {
                                    console.log(error.message)
                
                                })

                            }
                        }
                        i=i+1
                    }
				    
            

                }).catch(function (error) {
                    console.log(error.message)

                 })
            }
        }
    
    })
})