fetch('db.json')
	.then(function (ObjetosDoJson) {
		return ObjetosDoJson.json()
	})//Retorna um objeto
	.then(function (ObjetosDoJson) {

        var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados
        tbClientes = JSON.parse(tbClientes); // Converte string para objeto
        if(tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbClientes = [];

        const botao_adicionar = document.getElementById('adicionar')
        botao_adicionar.addEventListener('click', function(){
            background_modal = document.querySelector('section#background-modal')
            background_modal.classList.remove('mostrar')
            Adicionar()
        })

        body = document.querySelector('section#bolsas')
        window.addEventListener("load", Listar()) 

        AtivarBotaoAdicionarBolsa()
        function AtivarBotaoAdicionarBolsa() {
            const a = document.querySelectorAll('div.faculdades input')
            const botao_adicionar = document.getElementById('adicionar')
            const caixa_modal = document.querySelector('div#cx-modal')
            caixa_modal.addEventListener("click", function(){
                for (var i in a) {
                    if (a[i].checked) {
                        botao_adicionar. removeAttribute("disabled")
                        break
                    }else if (a[i].checked == false){
                        botao_adicionar.setAttribute("disabled", "disabled")
                    }
                }
            })
        }
        
        function Adicionar() {
            var cont

            if (localStorage.length != 0){
                cont = localStorage.length + 1
            } else{
                cont = 1
            }//Definirá o número que ajudará na organização das faculdades no LocalStorage

            for (i = 0; i < 25 ; i++) {

                var inputs = document.querySelectorAll('div.faculdades input')
                var cliente
                    
                if (inputs[i].checked == true) {
                    
                    class_PosicaoJson = inputs[i].parentElement.classList[1]// Obtém a Class "PosicaoJson00"
                    numero_posicao = class_PosicaoJson.substr(11)//subtrai todas as letras da Class "PosicaoJson00"
                    
                    cliente = {
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

                    localStorage.setItem(("faculdade" + cont), JSON.stringify(cliente))    

                    cont++
                }
            }
            alert('Faculdade adicionada com sucesso. Torcemos para que você conquista sua vaga ♡')
            Listar('pizza')
            window.location.reload()
        }

        

        //Listar()
        function Listar(){

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
            
            var cont = localStorage.length // essa rotina se repetirá de acordo com o número de itens no localStorage

            for(i=1; i <= cont ;i++){

                cli = localStorage.getItem(`faculdade${i}`)
                
                if (cli != null) {
                    cli = JSON.parse(cli)

                    facul_disponivel = cli.Disponivel
                    logo.src = cli.Logo
                    nome_universidade.innerHTML = cli.Nome_universidade
                    nome_curso.innerHTML = cli.Nome_curso
                    nota_universidade.innerHTML = cli.Nota_universidade
                    tipo_curso.innerHTML = cli.Tipo_curso
                    periodo.innerHTML = cli.Periodo
                    data_inicio.innerHTML = cli.Data_inicio
                    preco_bruto.innerHTML = cli.Preco_bruto
                    preco_cdesconto.innerHTML = cli.Preco_cdesconto
                    botao_excluir.value = i

                    Verificar_Disponibilidade()
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
                            preco_bruto.innerHTML = cli.Preco_bruto
                            preco_bruto.classList.remove('facul-indisponivel')

                            preco_cdesconto.innerHTML = cli.Preco_cdesconto
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

                }else { //Como já foi gasto um contador da repetição em um iten inválido, é necessário atribuir +1 para compensar
                    cont = cont + 1 
                }
            }

            a = document.querySelector('section#bolsas')
            a.children[1].style.display = 'none'
        }

            Excluir()
            function Excluir(){
                secao_bolsas = document.querySelector('section#bolsas')
                secao_bolsas.addEventListener("click", function(e){
                    if(e.target.classList.value == 'botao-excluir'){
                        valor_do_botao = e.target.value
                        localStorage.removeItem(`faculdade${valor_do_botao}`)
                        Listar()
                        window.location.reload()
                    }
                })
            }

            const selecao_semestre = document.querySelector('section#selecao-semestre div')
            selecao_semestre.addEventListener('click', function(e){
                
                selecionado = document.getElementById(e.target.id)
                
                for(i=0; i < selecao_semestre.childElementCount ; i++){
                    bb = document.querySelectorAll('section#selecao-semestre button')[i]
                    bb.classList.remove('pgatual')
                }

                selecionado.classList.add('pgatual')

                FiltrarPorSemestre(e.target.id)
            })

            console.log(document.getElementsByClassName('cx_bolsa_adicionada')[2])

            function FiltrarPorSemestre(semestre_selecionado){
                var cont = localStorage.length // essa rotina se repetirá de acordo com o número de itens no localStorage

                for (i = 1; i <= cont; i++) {

                    let div_bolsa = document.getElementsByClassName('cx_bolsa_adicionada')[i]
                    //console.log(div_bolsa)
                    let cli = localStorage.getItem(`faculdade${i}`)

                    if (cli != null) {

                        cli = JSON.parse(cli)
                        semestre_da_facul = cli.Semestre

                        if(semestre_selecionado == "primeiro-semestre"){

                            if(semestre_da_facul != 2020.1){
                                div_bolsa.style.display = 'none'
                            }else{
                                div_bolsa.style.display = 'flex'
                            }

                        } else if(semestre_selecionado == "segundo-semestre") {
                            
                            if(semestre_da_facul != 2019.2){

                                div_bolsa.style.display = 'none'

                            }else{

                                div_bolsa.style.display = 'flex'

                            }

                        } else {
                            div_bolsa.style.display = 'flex'
                        }
                        
                    } else { //Como já foi gasto um contador da repetição em um iten inválido, é necessário atribuir +1 para compensar
                        cont = cont + 1
                    }

                }
            }

    })