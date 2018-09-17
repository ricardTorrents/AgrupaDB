 window.addEventListener('load',function(){
	document.getElementById("caps").innerHTML="<div id='header' class='row'><div class='col-md-2'><div class='separator'></div><div id='socis' class='col-md-1 ' v-on:click='mostraPagSocis' title='Socis' style='cursor:pointer;'><i class='fas fa-user '></i></div><div id='balls' class='col-md-1 ' title='Balls' v-on:click='mostraPagBalls' style='cursor:pointer;'><i class='fas fa-music '></i></div></div><div class='col-md-8'><img src='/images/agrupa.png' /></div><div class='col-md-2'><div class='separator'></div><div id='menu' title='menu' style='cursor:pointer;' class='dropdown-toogle' data-toggle='dropdown'><i class='fas fa-bars'></i></div><div id='dropdown' class='dropdown-menu'><div id=usuari class='dropdown-item'><i class='fas fa-user'></i>{{espai}}{{usuari}}</div><div class='dropdown-item' v-on:click='mostraBaixes' style='cursor:pointer;'>	Baixes</div><div class='dropdown-item' style='cursor:pointer;' v-on:click='canviaContrasenya'>Canviar Contrasenya</div><div class='dropdown-item' v-on:click='tencaSessio' style='cursor:pointer;'>Tancar Sessio	</div></div></div></div>"
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
	el: '#vueComponent',
	data:{
		url:'',
		usuari:'',
		espai:' '
		
	},
    mounted: function () {
		this.url='http://'+location.host
       
		this.obteUsuari()
	},
	methods:{
		obteUsuari:function(){
			let self=this
			axios.get(this.url+'/usuari').then(function(response){
				console.log(response.data)
				self.usuari=response.data

			}).catch(function (error) {
			 console.log(error.message)
	  		})
		},
		mostraPagSocis:function(){
	
			location.replace(this.url+'/socis')
		},
		mostraPagBalls:function(){
				
			location.replace(this.url+'/balls')
		},
		mostraBaixes:function(){

			location.replace(this.url+'/baixes')
		},
		canviaContrasenya:function(){

			location.replace(this.url+'/contrasenya')
		},
		tencaSessio:function(){
			let self=this
			axios.put(self.url+'/tancaSessio').then(function(response){
				location.replace(self.url+'/')
			}).catch(function (error) {
				console.log(error.message)
		  })
		}
	  }
   
  })
  
  
 })
