fetch('db.json')
	.then(function (ObjetosDoJson) {
		return ObjetosDoJson.json()
	})//Retorna um objeto
	.then(function (ObjetosDoJson) {
        
        ChamarListagem_AoCarregarPagina(), ChamarFuncaoAdicionar(), Excluir_FaculFavorita(), ChamarFiltragemPorSemestre()
        
        function ChamarListagem_AoCarregarPagina(){
            body = document.querySelector('section#bolsas')
            window.addEventListener("load", Listar_FaculFavorita()) 
        }
        
        function ChamarFuncaoAdicionar(){
            const botao_adicionar_facul_favorita = document.getElementById('adicionar_facul_favorita')

            botao_adicionar_facul_favorita.addEventListener('click', function(){
                FecharModal()
                Adicionar_FaculFavorita()
            })
            
            function FecharModal(){
                background_modal = document.querySelector('section#background-modal')
                background_modal.classList.remove('mostrar')
            }
        }
        
        /*============================== CUIDA DA CRIAÇÃO DA FACULDADE SELECIONADA, NA PÁGINA PRINCIPAL ==================== */
        
        function Adicionar_FaculFavorita() {

            var cont

            //Definirá o número que ajudará na organização das faculdades no LocalStorage
            if (localStorage.length != 0){
                cont = localStorage.length + 1 // Evita que a listagem comece apartir do 0 e deixa a listagem como 1,2,3...
            } else{
                cont = 1
            }

            for (i = 0; i < 25 ; i++) {

                var inputs = document.querySelectorAll('div.faculdades input')
                var info_noLStorage
                    
                if (inputs[i].checked == true) {
                    
                    class_PosicaoJson = inputs[i].parentElement.classList[1]// Obtém a Class "PosicaoJson00"
                    numero_posicao = class_PosicaoJson.substr(11)//subtrai todas as letras da Class "PosicaoJson00"
                    
                    info_noLStorage = {
                        Logo : ObjetosDoJson[numero_posicao].university.logo_url,
                        Nome_universidade : ObjetosDoJson[numero_posicao].university.name,
                        Nome_curso : ObjetosDoJson[numero_posicao].course.name,
                        Nota_universidade : ObjetosDoJson[numero_posicao].university.score,
                        Tipo_curso : ObjetosDoJson[numero_posicao].course.kind,
                        Periodo : ObjetosDoJson[numero_posicao].course.shift,
                        Data_inicio : ObjetosDoJson[numero_posicao].start_date,
                        Preco_bruto : ObjetosDoJson[numero_posicao].full_price,
                        Preco_cdesconto : ObjetosDoJson[numero_posicao].price_with_discount,
                        Disponivel : ObjetosDoJson[numero_posicao].enabled,
                        Semestre : ObjetosDoJson[numero_posicao].enrollment_semester
                    };

                    localStorage.setItem(("faculdade" + cont), JSON.stringify(info_noLStorage))    

                    cont++
                }
            }
            
            alert('Faculdade adicionada com sucesso. Torcemos para que você conquiste sua vaga ♡')
            Listar_FaculFavorita()
            window.location.reload()
        }

        function Listar_FaculFavorita() {

            const logo = document.querySelector('div.cx_bolsa_adicionada img')
            const nome_universidade = document.querySelector('span.nome-universidade')
            const nome_curso = document.querySelector('span.nome-curso')
            const nota_universidade = document.querySelector('span.nota-universidade')
            const tipo_curso = document.querySelector('span.tipo-curso')
            const periodo = document.querySelector('span.periodo')
            const data_inicio = document.querySelector('span.data-inicio')
            const preco_bruto = document.querySelector('span.preco-bruto')
            const preco_cdesconto = document.querySelector('span.preco-cdesconto')
            const botao_excluir = document.querySelector('button.botao-excluir')
            const situacao_bolsa = document.querySelector('span.situacao-bolsa')
            const botao_ver_oferta = document.querySelector('button.ver-oferta')
            const cor_estrela = document.querySelector('span.cor-estrela')

            var cont = localStorage.length // Essa rotina se repetirá de acordo com o número de itens no localStorage

            for (i = 1; i <= cont; i++) {

                facul_no_localStorage = localStorage.getItem(`faculdade${i}`)

                if (facul_no_localStorage != null) {

                    facul_no_localStorage = JSON.parse(facul_no_localStorage)

                    let facul_disponivel = facul_no_localStorage.Disponivel

                    logo.src = facul_no_localStorage.Logo
                    nome_universidade.innerHTML = facul_no_localStorage.Nome_universidade
                    nome_curso.innerHTML = facul_no_localStorage.Nome_curso

                    nota_universidade.innerHTML = facul_no_localStorage.Nota_universidade
                    cor_estrela.style.width = (facul_no_localStorage.Nota_universidade * 21.5) + "px" // Este width definirá o número
                                                                                                    // de estrelas pintadas
                    tipo_curso.innerHTML = facul_no_localStorage.Tipo_curso
                    periodo.innerHTML = facul_no_localStorage.Periodo
                    data_inicio.innerHTML = facul_no_localStorage.Data_inicio
                    
                    preco_bruto.innerHTML = facul_no_localStorage.Preco_bruto
                    preco_cdesconto.innerHTML = facul_no_localStorage.Preco_cdesconto
                    botao_excluir.value = i

                    Verificar_Disponibilidade() //Verifica se a faculdade está disponível, caso não esteja, mudará alguns atributos
                    function Verificar_Disponibilidade() {
                        if (facul_disponivel == false) {
                            preco_bruto.innerHTML = "Entre em contato com nosso atendimento para saber mais"
                            preco_bruto.classList.add('facul-indisponivel')

                            preco_cdesconto.classList.add('facul-indisponivel')

                            situacao_bolsa.innerHTML = "Bolsa indisponível"
                            situacao_bolsa.classList.add('facul-indisponivel')

                            botao_ver_oferta.innerHTML = 'Indisponível'
                            botao_ver_oferta.setAttribute("disabled", "disabled")
                        } else {
                            preco_bruto.innerHTML = facul_no_localStorage.Preco_bruto
                            preco_bruto.classList.remove('facul-indisponivel')

                            preco_cdesconto.innerHTML = facul_no_localStorage.Preco_cdesconto
                            preco_cdesconto.classList.remove('facul-indisponivel')

                            situacao_bolsa.innerHTML = 'Mensalidade com o Quero Bolsa:'
                            situacao_bolsa.classList.remove('facul-indisponivel')

                            botao_ver_oferta.innerHTML = 'Ver oferta'
                            botao_ver_oferta.removeAttribute('disabled')
                        }
                    }

                    div_modelo = document.firstElementChild.querySelector('div.cx_bolsa_adicionada')

                    clonar_div_modelo = div_modelo.cloneNode(true)

                    document.querySelector('section#bolsas').appendChild(clonar_div_modelo)

                } else { //Como já foi gasto um contador da repetição em um iten inválido, é necessário atribuir +1 para compensar
                    cont = cont + 1
                }
            }

            secao_bolsas = document.querySelector('section#bolsas')
            secao_bolsas.children[1].style.display = 'none' // Elimina o elemento "cx_bolsa_adicionada", que foi usado como um clone.
        
        }
        
        function Excluir_FaculFavorita() {
            secao_bolsas = document.querySelector('section#bolsas')
            secao_bolsas.addEventListener("click", function (e) {
                if (e.target.classList.value == 'botao-excluir') {
                    valor_do_botao = e.target.value
                    localStorage.removeItem(`faculdade${valor_do_botao}`)
                    Listar_FaculFavorita()
                    window.location.reload()
                }
            })
        }

        /*============================= FIM DA CRIAÇÃO DA FACULDADE SELECIONADA, NA PÁGINA PRINCIPAL ========================*/

        /* ----------------------------------------------------------------------------------------------------------------- */

        /*============================ CUIDA DA FILTRAGEM DAS FACULDADES AO SELECIONAR O SEMESTRE ========================== */
        
        function ChamarFiltragemPorSemestre(){
            //Esta rotina, além de chamar a função "FiltrarPorSemestre", também atribuirá a classe "selecao-atual" 
            //ao novo semestre selecionado, para que ele mude de cor e melhore a experiência do usuário.

            const selecao_semestre = document.querySelector('section#selecao-semestre div')
            selecao_semestre.addEventListener('click', function(e){

                const selecionado = document.getElementById(e.target.id)

                for(i=0; i < selecao_semestre.childElementCount ; i++){ // Remove a classe "Selecao-atual" do botão que antes a continha...
                    botao = document.querySelectorAll('section#selecao-semestre button')[i]
                    botao.classList.remove('selecao-atual')
                }

                selecionado.classList.add('selecao-atual') // ...E então, adiciona a que foi selecionada agora.

                FiltrarPorSemestre(e.target.id)
            })
        }
        
        function FiltrarPorSemestre(semestre_selecionado) {

            var cont = localStorage.length

            for (i = 1; i <= cont; i++) {

                let div_bolsa_selecionada = document.getElementsByClassName('cx_bolsa_adicionada')[i]
                let cli = localStorage.getItem(`faculdade${i}`)

                if (cli != null) {
                    cli = JSON.parse(cli)
                    semestre_da_facul = cli.Semestre

                    if (semestre_selecionado == "primeiro-semestre") {

                        if (semestre_da_facul != 2020.1) {
                            div_bolsa_selecionada.style.display = 'none'
                        } else {
                            div_bolsa_selecionada.style.display = 'flex'
                        }

                    } else if (semestre_selecionado == "segundo-semestre") {

                        if (semestre_da_facul != 2019.2) {
                            div_bolsa_selecionada.style.display = 'none'
                        } else {
                            div_bolsa_selecionada.style.display = 'flex'
                        }

                    } else {
                        div_bolsa_selecionada.style.display = 'flex'
                    }

                } else { //Como já foi gasto um contador da repetição em um iten inválido, é necessário atribuir +1 para compensar
                    cont = cont + 1
                }

            }
        }

        /*============================= FIM DA FILTRAGEM DAS FACULDADES AO SELECIONAR O SEMESTRE ========================== */
    })
