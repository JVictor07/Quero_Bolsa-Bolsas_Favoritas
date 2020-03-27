fetch('db.json')
	.then(function (ObjetosDoJson) {
		return ObjetosDoJson.json()
	})//Retorna um objeto
	.then(function (ObjetosDoJson) {

		FiltrarPorCurso(), FiltrarPorCidade(), FiltrarPorCheckBox(), FiltrarPorRange(), OrdenarPorNomeDaFaculdade()

		function FiltrarPorCurso() {
			document.querySelector('select#selecione_curso').onchange = function (e) {

				nome_curso_selecionado = e.target.value

				for (i = 0; i < ObjetosDoJson.length; i++) {

					if (nome_curso_selecionado != "") {
						if (nome_curso_selecionado == ObjetosDoJson[i].course.name) {
							document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul2')
						} else {
							document.querySelector('div.PosicaoJson' + i).classList.add('nao-mostrar-facul2')
						}
					} else {
						document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul2')
					}

				}
			}
		}

		function FiltrarPorCidade() {
			document.querySelector('select#selecione_cidade').onchange = function (e) {

				nome_cidade_selecionada = e.target.value

				for (i = 0; i < ObjetosDoJson.length; i++) {
					if (nome_cidade_selecionada != "") {

						if (nome_cidade_selecionada == ObjetosDoJson[i].campus.city) {
							document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul1')
						} else {
							document.querySelector('div.PosicaoJson' + i).classList.add('nao-mostrar-facul1')
						}

					} else {
						document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul1')
					}
				}
			}
		}

		function FiltrarPorCheckBox() {

			checkbox_distancia = document.getElementById('modalidade_distancia')
			checkbox_presencial = document.getElementById('modalidade_presencial')

			document.getElementById("tipo-curso").addEventListener("click", function () {

				var modalidade_selecionada

				for (i = 0; i < ObjetosDoJson.length; i++) {

					if (checkbox_distancia.checked || checkbox_presencial.checked) {

						if (checkbox_distancia.checked && checkbox_presencial.checked) {

							document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul3')

						} else if (checkbox_distancia.checked) {

							modalidade_selecionada = "EaD"

							if (modalidade_selecionada != ObjetosDoJson[i].course.kind) {
								document.querySelector('div.PosicaoJson' + i).classList.add('nao-mostrar-facul3')
							}
							if (modalidade_selecionada == ObjetosDoJson[i].course.kind) {
								document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul3')
							}

						} else if (checkbox_presencial.checked) {

							modalidade_selecionada = "Presencial"

							if (modalidade_selecionada != ObjetosDoJson[i].course.kind) {
								document.querySelector('div.PosicaoJson' + i).classList.add('nao-mostrar-facul3')
							}
							if (modalidade_selecionada == ObjetosDoJson[i].course.kind) {
								document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul3')
							}
						}

					} else {
						document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul3')
					}

				}
			})
		}

		function FiltrarPorRange() {
			// Sempre que o valor da faculdade for maior que o valor selecionado pelo range, ela será removida.
			input_range = document.getElementById('range-pd-pagar')
			input_range.onchange = function (e) {
				for (i = 0; i < ObjetosDoJson.length; i++) {

					if (input_range.value < ObjetosDoJson[i].price_with_discount) {
						document.querySelector('div.PosicaoJson' + i).classList.add('nao-mostrar-facul4')
					} else {
						document.querySelector('div.PosicaoJson' + i).classList.remove('nao-mostrar-facul4')
					}

				}
			}
		}

		function OrdenarPorNomeDaFaculdade() {

			CriarSpan(), OrganizarListaOrdemAlfabetica(), CriarElementosComNomesOrganizados()

			function CriarSpan() {
				//Cria um span que ajudará na lógica de organização por ordem alfabética
				secao_lifaculdades = document.querySelector('section#resultados')
				primeiradiv = document.firstElementChild.querySelector('div.faculdades')
				span_criada = document.createElement('span')

				secao_lifaculdades.insertBefore(span_criada, primeiradiv)
			}

			function OrganizarListaOrdemAlfabetica() {
				//Se a opção "Ordenar por nome da faculdade" estiver selecionado,
				//Cria uma lista com os nomes das faculdades ordenados por ordem alfabética
				//Essa lista servirá para comparação na função abaixo.

				Opcao_ordenar_por_facul = document.querySelector('select#Ordenar_por option')

				if (Opcao_ordenar_por_facul.selected) {

					arr_faculs = new Array
					li_faculdades = document.querySelectorAll('section#resultados div.faculdades')

					for (i = 0; i < li_faculdades.length; i++) {
						facul = ObjetosDoJson[i].university.name
						arr_faculs.push(facul)
						arr_faculs.sort()
					}
				}
			}

			function CriarElementosComNomesOrganizados() {
				// Rotina que pesquisa o nome das universidades de cada div, as comparam com o array organizado e,
				// a partir dessa comparação, as organizam para que fiquem em uma posição de nomes igual a do array 

				y = 0

				while (y < ObjetosDoJson.length) {
					for (i = 0; i < ObjetosDoJson.length; i++) {

						if (ObjetosDoJson[i].university.name == arr_faculs[y]) {
							div_dafacul = document.querySelector(`div.PosicaoJson${[i]}`)
							span_criado = document.querySelector('section#resultados > span')
							document.querySelector('section#resultados').insertBefore(div_dafacul, span_criado)

							y = y + 1
						}
					}
				}

			}

		}//Fim OrdenarPorNomeDaFaculdade
	})
