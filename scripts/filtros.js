fetch('db.json')
	.then(function (ObjetosDoJson) {
		return ObjetosDoJson.json()
	})//Retorna um objeto
	.then(function (ObjetosDoJson) {
		
		FiltrarPorCurso()
		function FiltrarPorCurso() {
			document.getElementById('selecione_curso').addEventListener("click", function (e) {

				nome_curso_selecionado = e.target.value
				console.log(nome_curso_selecionado)
				for (i = 0; i < ObjetosDoJson.length; i++) {

					if (nome_curso_selecionado != "") {
						if (nome_curso_selecionado == ObjetosDoJson[i].course.name) {
								document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul2')
							} else {
								document.querySelector('div.PosicaoJson' + i).classList.add('nao-mostrar-facul2')
							}
					}else{
						document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul2')
					}
				}
			})
		}

		FiltrarPorCidade()
		function FiltrarPorCidade() {
			document.getElementById('selecione_cidade').addEventListener("click", function (e) {
				
				nome_cidade_selecionada = e.target.value

				for (i = 0; i < ObjetosDoJson.length; i++) {

					if (nome_cidade_selecionada != "") {
						if (nome_cidade_selecionada == ObjetosDoJson[i].campus.city) {
								document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul1')
							}
						else{
								document.querySelector('div.PosicaoJson' + i).classList.add('nao-mostrar-facul1')
							}
					}else{
						document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul1')
					}
				}
			})
		}

		FiltrarPorCheckBox()
		function FiltrarPorCheckBox() {
			checkbox_distancia = document.getElementById('modalidade_distancia')
			checkbox_presencial = document.getElementById('modalidade_presencial')

			document.getElementById("tipo-curso").addEventListener("click", function (){

				var modalidade_selecionada
				//console.log(checkbox_presencial.checked)
				for (i = 0; i < ObjetosDoJson.length; i++) {

					if (checkbox_distancia.checked || checkbox_presencial.checked) {
						if(checkbox_distancia.checked && checkbox_presencial.checked || checkbox_distancia.checked == false && checkbox_presencial.checked == false){

							document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul3')
	
						}else if (checkbox_distancia.checked){
	
							modalidade_selecionada = "EaD"
								if (modalidade_selecionada != ObjetosDoJson[i].course.kind) {
									document.querySelector('div.PosicaoJson' + i).classList.add('nao-mostrar-facul3')
								}
								if (modalidade_selecionada == ObjetosDoJson[i].course.kind) {
									document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul3')
								}
	
						}else if (checkbox_presencial.checked){
	
							modalidade_selecionada = "Presencial"
								if (modalidade_selecionada != ObjetosDoJson[i].course.kind){
									document.querySelector('div.PosicaoJson' + i).classList.add('nao-mostrar-facul3')
								}
								if (modalidade_selecionada == ObjetosDoJson[i].course.kind) {
									document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul3')
								}
	
						}
					}else {
						document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul3')
					}
					
				}
			})
		}

		FiltrarPorRange()
		function FiltrarPorRange(){
			input_range = document.getElementById('range-pd-pagar')
			
			input_range.addEventListener("mouseup",function(){
				for(i=0; i < ObjetosDoJson.length; i++){
					console.log(input_range.value)
					if(input_range.value < ObjetosDoJson[i].price_with_discount){
						document.querySelector('div.PosicaoJson' + i).classList.add('nao-mostrar-facul4')
					}else{
						document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul4')
					}
				}
			})
		}
		
		OrdenarPorNomeDaFaculdade()
		function OrdenarPorNomeDaFaculdade() {

			CriarSpan()
			function CriarSpan() {
				//Criação de um span que ajudará na lógica de organização por ordem alfabética
				secao_lifaculdades = document.querySelector('section#resultados')
				primeiradiv = document.firstElementChild.querySelector('div.faculdades')
				span_criada = document.createElement('span')

				secao_lifaculdades.insertBefore(span_criada, primeiradiv)
			}

			Opcao_ordenar_por_facul = document.querySelector('select#Ordenar_por option') 

			if (Opcao_ordenar_por_facul.selected) {

				li_faculdades = document.querySelectorAll('section#resultados div.faculdades')
				
				arr_faculs = new Array

				for (i = 0; i < li_faculdades.length; i++) {

					facul = ObjetosDoJson[i].university.name
					arr_faculs.push(facul)
					arr_faculs.sort()

				}

				y = 0
				//Rotina que pesquisa o nome das universidades de cada div
				//E logo após, as organizam como a lista com os nome das faculdades em ordem alfabética 
				while (y < ObjetosDoJson.length) {
					for (i = 0; i < ObjetosDoJson.length; i++) {

						if(ObjetosDoJson[i].university.name == arr_faculs[y] ){
							div_dafacul = document.querySelector(`div.PosicaoJson${[i]}`)
							span_criado = document.querySelector('section#resultados > span')
							document.querySelector('section#resultados').insertBefore(div_dafacul, span_criado)
							
							y = y+1
						}
					}
				}
			}
		}
		
	})
	