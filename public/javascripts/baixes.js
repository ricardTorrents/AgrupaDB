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
        },

        mounted: function () {
            this.baseUrl = 'http://' + location.host + '/api/'

        },

        methods: {
            carregaDades: function () {
                let self = this
                axios.get(self.baseUrl + 'baixes').then(function (response) {
                    let b = response.data

                    b.forEach(function (baixa) {
                        self.baixes.push(baixa)
                    })
                }).catch(function (error) {
                    console.log(error.message)
                })
            }
        }
    })
})