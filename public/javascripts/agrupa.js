/* 
Javascript Pagina Principal */

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
		el: '#vue',
		
		data:{
			url:'',
			usuari:''
			
			
		},
		mounted: function () {
			
			this.inicial()
			this.obteUsuari()
		},
		methods: {
			inicial:function(){
				
				this.url='http://'+location.host
				console.log(this.url)
			},
			/**
			 * Carrega Pagina Socis
			 */
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
			/**
			 * Carrega Pagina Balls
			 */
			mostraPagBalls:function(){
				
				location.replace(this.url+'/balls')
			},
			mostraBaixes:function(){

				location.replace(this.url+'/baixes')
			}
			
		}
	})
})
