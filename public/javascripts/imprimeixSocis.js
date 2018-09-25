
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
		el: '#vueImpresioSocis',
		
		data:{
            url:'',
            baseUrl:'',
			lsocis:[],
			total:[],
			inpagats:[],
			pagats:[],
			email:false,
            
			
		},
		mounted: function () {
			
			this.inicial()
			this.carregaDades()
		},
		methods: {
			inicial:function(){
				
                this.url='http://'+location.host
                this.baseUrl=this.url+'/api/'
				
			},
			comprovaTipus:function(){
				tipus=document.getElementById('tipusImpresio').value 
				if(tipus=="Llista Emails"){
					this.lsocis=this.total
					this.email=true
				}
				if(tipus=="Tots els Socis"){
					this.lsocis=this.total
					this.email=false
				}
				if(tipus=="Pagats"){
					this.lsocis=this.pagats
					this.email=false
				}
				if(tipus=="No Pagats"){
					this.lsocis=this.inpagats
					this.email=false
				}
			},
			/**
			 * Carrega Pagina Socis
			 */
            imprimeix:function(){
                document.getElementById('vueComponent').style.display="none"
				document.getElementById('boto').style.display="none"
				document.getElementById('botoCancela').style.display="none"
				document.getElementById('tipusImpresio').style.display="none"
                window.print()
                document.getElementById('vueComponent').style.display="inherit"
				document.getElementById('boto').style.display="inline"
				document.getElementById('botoCancela').style.display="inline"
				document.getElementById('tipusImpresio').style.display="inherit"
                
                
            },
			carregaDades:function(){
                let self=this
                
				axios.get(self.baseUrl +'socis/impresio').then(function(response){
					console.log(response.data)
					self.lsocis=response.data
					let actual= new Date()
					actual=actual.getFullYear()
					self.lsocis.forEach(function(s){
						d=new Date(s.datapagament)
						
						if(actual==d.getFullYear()){
							self.pagats.push(s)
						}else{
							self.inpagats.push(s)
						}
						self.total.push(s)
					});
					
				}).catch(function (error) {
				 console.log(error.message)
		   })
			},
			cancela:function(){
				location.replace(this.url+'/socis?1')
			}
			
			
		}
	})
})
