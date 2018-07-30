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
			url:''
			
			
			
		},
		mounted: function () {
			
			this.inicial()
			
		},
		methods: {
			inicial:function(){
				
				this.url='http://'+location.host
				
			},
			/**
			 * Carrega Pagina Socis
			 */
			mostraPagSocis:function(){
			
				location.replace(this.url+'/socis')
			},
			/**
			 * Carrega Pagina Balls
			 */
			mostraPagBalls:function(){
				
				location.replace(this.url+'/balls')
			},
			
		}
	})
})
