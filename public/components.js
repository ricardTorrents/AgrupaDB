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
    el: '#vueComponent',
    mounted: function () {
        document.getElementById("caps").innerHTML=" <div id='header' class='row'><div class='col-md-2'><div class='col-md-1' title='Socis' style='cursor:pointer;'><i class='fas fa-user '></i> </div> <div class='col-md-1'  title='Socis' style='cursor:pointer;'><i class='fas fa-music '></i> </div> </div><div class='col-md-8'><img src='/images/agrupa.png'/> </div><div class='col-md-2'> <div  title='Socis' style='cursor:pointer;'><i class='fas fa-bars'></i></div></div></div>"
    }
   
  })
 })
