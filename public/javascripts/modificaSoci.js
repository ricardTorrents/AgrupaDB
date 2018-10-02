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
		el: '#vueModificaSoci',
		
		data:{
            url:'',
			baseUrl:'1',
            soci:'',
            edat:'',
            lEspera:[],
            lballs:[],
            lballs1:[],
            lballs2:[],
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
                this.num=(location.search).substr(1)
                console.log(this.num)
              
               
               axios.get(self.baseUrl +'socis/'+self.num).then(function(response){
                   self.soci=response.data[0]
                   d=new Date(self.soci.data_naixement)
                   let avui= new Date()
			        let naixement=new Date(self.soci.data_naixement)
			        self.edat=avui.getFullYear()-naixement.getFullYear()
                   console.log(d.getMonth())
                  let mes=(parseInt(d.getMonth())+parseInt(1))
                  if(mes<10){
                      mes='0'+mes
                  }
                  let dia=parseInt(d.getDate())
                  if(dia<10){
                      dia='0'+dia
                  }
                  self.soci.data_naixement=d.getFullYear()+'-'+mes+'-'+dia
                  console.log(self.soci.data_naixement)
                  if(self.soci.sexe=='D'){
                      document.getElementById("d").checked="checked"
                  }else{
                    document.getElementById("h").checked="checked"
                  }
                  console.log(self.soci.data_naixement)
                   
               }).then(function(){
                    self.carregaBalls()
               }).catch(function (error) {
                console.log(error.message)
          })

            },

            /**
             * Obte la informacio dels diferents balls de la BD per crear els checkboxes per la afegir el soci a la llista d'espera .
             */
			carregaBalls:function(){
				let self=this
					console.log(self.baseUrl +'balls')
					axios.get(self.baseUrl +'balls').then(function(response){
						let b=response.data
						console.log(b)
						b.forEach(function(ball,index){
                            if((ball.edat_minima<self.edat)&&(ball.edat_maxima>self.edat)){
                            self.lballs.push(ball)
                            if(index%2==0){
                                self.lballs1.push(ball)
                            }else{
                                self.lballs2.push(ball)
                            }
                        }
						})
						
					}).then(function(){
                        self.carregaLlistaEspera()
					}).catch(function (error) {
		 				 console.log(error.message)
					})
            },
            /**
             * Carrega la informacio de la llsita d'espera asociada al soci que s'esta modificant.
             */
            carregaLlistaEspera:function(){
                let self=this
                axios.get(self.baseUrl +'llistaEspera/'+self.soci.dni).then(function(response){
                    let lE=response.data
                    lE.forEach(function(l){
                        document.getElementById(l.codi_ball).checked=true
                        document.getElementById(l.codi_ball).disabled=true
                    })
                }).then(function(){
                    self.lballs.forEach(function(ball){
                        if(document.getElementById(l.codi_ball).checked!=true){
                            let avui= new Date()
                    
                    
                            let naixement=new Date(document.getElementById("sociDataNaixement").value)
                            let sexe=s;
                            let edat=parseInt(avui.getFullYear())-parseInt(naixement.getFullYear())
                            if(((self.soci.sexe!=ball.sexe)||(ball.sexe!='M'))&&(ball.edat_maxima<edat)){
                                document.getElementById(ball.codi_ball).checked=true
                                document.getElementById(ball.codi_ball).disabled=true
                            }
                        }
                    })
                }).catch(function (error) {
                    console.log(error.message)
                 })
            },
            /**
             * Cancela la modificacio de socis i retorna a la pagina de socis
             */
            cancela:function(){
                location.replace(this.url+'/socis?'+this.num)
            
            },
            /**
             * Realitza un Update del soci a la base de dades, tambe crea nous registres en la llista d'espera si es necessari.
            */
            modificaSoci:function(){
               let self=this
               let s=''
               if(document.getElementById("d").checked){
                    s="D"
                }else{
                    s="H"
                 }
               axios.put(self.baseUrl+'socis/'+self.soci.numerosoci,{
                    nom:document.getElementById("sociNom").value,
                    cognoms:document.getElementById("sociCognoms").value,
                    dni:document.getElementById("sociDni").value,
                    data_naixement:new Date(document.getElementById("sociDataNaixement").value),
                    email:document.getElementById("sociEmail").value,
                    adreça:document.getElementById("sociAdreça").value,
                    telefon:document.getElementById("sociTelefon").value,
                    telefon2:document.getElementById("sociTelefon2").value,
                    sexe:s,
                    ciutat:document.getElementById("sociCiutat").value,
                    numerosoci:self.soci.numerosoci
                
                }).then(function(response,body){
                    let i=0
                    console.log(self.lballs.length)
                    console.log(self.lballs)
                   
                    while(i<self.lballs.length){
                        let check=document.getElementById(self.lballs[i].codi_ball)
                        console.log(check.checked)
                        console.log(check.disabled)
                        if((check.checked==true)&&(check.disabled==false)){
            
                            axios.post(self.baseUrl+'llistaEspera',{
                                dni:self.soci.dni,
                                codi_ball:self.lballs[i].codi_ball
                            }).then(function(response,body){
                                location.replace(self.url+'/socis?'+self.num)
                            }).catch(function (error) {
                                console.log(error.message)
            
                             })

                        }
                        i=i+1
                    }
                

                }).catch(function (error) {
                    console.log(error.message)

                 })
               
                
            },
            /**
             * Elimina el soci, mostra un popup de confirmació
             */
            elimina:function(){
                let motiu=prompt("Estas segur d'eliminar a "+this.soci.nom+" "+this.soci.cognoms+"?, en cas afirmatiu entri un motiu.","")
                if(motiu!=null){
                    let self=this
                    let num=(location.search).substr(1)
                    console.log(num)
                    axios.delete(self.baseUrl +'socis/'+num,{
                    
                    }).then(function(response){
                        axios.post(self.baseUrl+'baixes/',{
                            nom:self.soci.nom,
                            cognoms:self.soci.cognoms,
                            dni:self.soci.dni,
                            motiu:motiu,
                            data:new Date()
                        }).then(function(response){
                            location.replace(self.url+'/socis')
                        }).catch(function (error) {
                            console.log(error.message)
        
                         })
                            
                    }).catch(function (error) {
                        console.log(error.message)
    
                     })
                }else{
                    console.log("cancelat")
                }

            }

        }
    
    })
})