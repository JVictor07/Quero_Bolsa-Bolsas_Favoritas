fetch('db.json')
	.then(function (ObjetosDoJson) {
		return ObjetosDoJson.json()
	})//Retorna um objeto
	.then(function (ObjetosDoJson) {
        
        FazerListaDasFaculdades()
        function FazerListaDasFaculdades() {

            div = document.querySelector('div.faculdades')
            input = document.querySelector('div.faculdades input')
            label = document.querySelector('div.faculdades label')
            logo = document.querySelector('div.faculdades img')
            curso = document.querySelector('div.faculdades span#curso')
            formacao = document.querySelector('div.faculdades span#formacao')
            porcenbolsa = document.querySelector('div.faculdades span#bolsa')
            preco = document.querySelector('div.faculdades span#preco')

            for (i = 0; i < ObjetosDoJson.length; i++) {

                input.id = 'checkbox-facul' + i
                label.setAttribute("for", "checkbox-facul" + i)

                logo.src = ObjetosDoJson[i].university.logo_url
                curso.innerHTML = ObjetosDoJson[i].course.name
                formacao.innerHTML = ObjetosDoJson[i].course.level

                porcenbolsa.innerHTML = ObjetosDoJson[i].discount_percentage
                preco.innerHTML = ObjetosDoJson[i].price_with_discount

                div = document.firstElementChild.querySelector('div.faculdades')

                clonar_div_modelo = div.cloneNode(true)

                document.querySelector('section#resultados').appendChild(clonar_div_modelo)
                
            }
            document.firstElementChild.querySelector('div.faculdades').remove()//Eliminando o que foi usado como clone
        }

        AdicionarPosicaoDaFaculdadeNoJson()
        function AdicionarPosicaoDaFaculdadeNoJson() {
            faculdades = document.querySelectorAll('div.faculdades')
            for (i = 0; i < faculdades.length; i++) {
                faculdades[i].classList.add('PosicaoJson' + i)
            }
        }
})