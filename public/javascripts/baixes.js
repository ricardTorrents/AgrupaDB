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
        }
    })
})