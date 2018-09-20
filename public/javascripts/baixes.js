/**
 * Javascript pagina Balls
 */

window.addEventListener('load', function () {
    window.onresize = function () {
        if (window.innerWidth <= 990) {
            document.getElementsByTagName("body")[0].style.overflowX = "hidden"
            document.getElementsByTagName("body")[0].style.overflowX = "hidden"
        } else {
            document.getElementsByTagName("body")[0].style.overflow = "hidden"
            window.scrollTo(0, 0);
        }
    }

    new Vue({
        el: '#vueBaixes',

        data: {
            baseUrl: '',
            baixes: [],
            url:''
        },

        mounted: function () {
            this.baseUrl = 'http://' + location.host + '/api/'
            this.url='http://'+location.host
            this.carregaDades()

        },

        methods: {
            carregaDades: function () {
                let self = this
                axios.get(self.baseUrl + 'baixes').then(function (response) {
                    let b = response.data

                    b.forEach(function (baixa) {
                        d=new Date(baixa.data)
						mes=parseInt(d.getMonth())+1
						baixa.data=d.getFullYear()+'-'+mes+'-'+d.getDate()
                        self.baixes.push(baixa)
                    })
                }).catch(function (error) {
                    console.log(error.message)
                })
            },
            retornaInici:function(){
				location.replace(this.url+'/inici')
            },
            filtre:function(){
                let self = this
                let tipusFiltre=document.getElementById('selector').value
                let valor=document.getElementById('camptext').value
                let tipus="filtreDNI"
                if (tipusFiltre=="Cognom"){
                    tipus="filtreCognom"
                }
                if (tipusFiltre=="Nom"){
                    tipus="filtreNom"
                }
                if (tipusFiltre=="Any"){
                    tipus="filtreAny"
                }
                self.baixes=[]
                axios.get(self.baseUrl + 'baixes/'+tipus+'/'+valor).then(function (response) {
                    let b = response.data

                    b.forEach(function (baixa) {
                        d=new Date(baixa.data)
						mes=parseInt(d.getMonth())+1
						baixa.data=d.getFullYear()+'-'+mes+'-'+d.getDate()
                        self.baixes.push(baixa)
                    })
                }).catch(function (error) {
                    console.log(error.message)
                })
            },
            EliminarFiltre:function(){
				//this.filter=false
                //document.getElementById("missatgeError").innerHTML=""
                this.baixes=[]
				this.carregaDades()
				
			},
        }
    })
})