fetch('db.json')
	.then(function (ObjetosDoJson) {
		return ObjetosDoJson.json()
	})//Retorna um objeto
	.then(function (ObjetosDoJson) {
        
        GerarOpcoesCidade()
        GerarOpcoesCursos()

        function GerarOpcoesCidade() {
            var li_tdscidades
            var li_cidadefiltrada
            FazerListaCidades(), FiltrarRepeticoes(), CriarOpcaoCidade()

            function FazerListaCidades() {
                li_tdscidades = new Array
                for (i = 0; i < ObjetosDoJson.length; i++) {
                    li_tdscidades.push(ObjetosDoJson[i].campus.city)
                }
            }

            function FiltrarRepeticoes() {
                let novoArray = [...new Set(li_tdscidades)];
                li_cidadefiltrada = novoArray;
            }

            function CriarOpcaoCidade() {
                for (i = 0; i < li_cidadefiltrada.length; i++) {
                    let opcoes_cidade = document.createElement("option")

                    opcoes_cidade.innerHTML = li_cidadefiltrada[i]
                    selecione_cidade.appendChild(opcoes_cidade)
                }
            }
        }

        function GerarOpcoesCursos() {
            var li_tdscursos
            var li_cursosfiltrados
            FazerListaCursos(), FiltrarRepeticoes(), CriarOpcaoCurso()

            function FazerListaCursos() {
                li_tdscursos = new Array
                for (i = 0; i < ObjetosDoJson.length; i++) {
                    li_tdscursos.push(ObjetosDoJson[i].course.name)
                }
            }

            function FiltrarRepeticoes() {
                let novoArray = [...new Set(li_tdscursos)];
                li_cursosfiltrados = novoArray;
            }

            function CriarOpcaoCurso() {
                for (i = 0; i < li_cursosfiltrados.length; i++) {
                    opcoes_cursos = document.createElement("option")

                    opcoes_cursos.innerHTML = li_cursosfiltrados[i]

                    selecione_curso.appendChild(opcoes_cursos)

                }
            }
        }
    })