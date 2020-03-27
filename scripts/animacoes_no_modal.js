//Mostra o modal ao clicar na caixa de adicionar bolsa
    AbrirModal(), FecharModal(), AnimarPreco_PodePagar(), AtivarBotaoAdicionarBolsa(), Chamar_Ativacao_Botao()
    
    /* ===================================== CUIDA DA ABERTURA E FECHAMENTO DO MODAL ====================================== */
    
    function AbrirModal(){
        const cx_add_bolsa = document.getElementById('cx_add_bolsa')
        cx_add_bolsa.addEventListener('click', () => mostrarModal('background-modal'))
    }
    
    function FecharModal(){
        const botao_cancelar = document.getElementById('cancelar')
        botao_cancelar.addEventListener('click', () => mostrarModal('background-modal'))
    }

    function mostrarModal(modalID) {
        const modal = document.getElementById(modalID);
        const body = document.querySelector('html')
        if (modal) {
            modal.classList.add('mostrar');
            body.style.overflowY = 'hidden'
            modal.addEventListener('click', (e) => {
                if (e.target.id == modalID || e.target.id == 'botao-fechar' || e.target.id == 'cancelar') {
                    modal.classList.remove('mostrar')
                    body.style.overflowY = 'scroll'
                }
            })
        }
    }

    /* ======================================= FIM DA ABERTURA E FECHAMENTO DO MODAL =======================================*/
    
// --------------------------------------------------------------------------------------------------------------------- 

    /* ======================================= CUIDA DA ANIMAÇÃO DO PREÇO AO MOVER O RANGE =================================*/

    function AnimarPreco_PodePagar() { 
        const slider = document.getElementById("range-pd-pagar");
        const valor = document.getElementById("valor-pd-pgar");
        valor.innerHTML = `R$${slider.value}`;

        slider.oninput = function () {
            valor.innerHTML = `R$${this.value}`;
        }
    }

    /* ======================================= FIM DA ANIMAÇÃO DO PREÇO AO MOVER O RANGE ===================================*/

// --------------------------------------------------------------------------------------------------------------------- 

    /* ================================== CUIDA DA ATIVAÇÃO E DESATIVAÇÃO DO BOTAO "ADICIONAR BOLSA" =======================*/
    
    
    function Chamar_Ativacao_Botao(){
        const secao_resultados = document.querySelector('section#resultados')
        secao_resultados.addEventListener("click", () => AtivarBotaoAdicionarBolsa() )
    }

    function AtivarBotaoAdicionarBolsa() {
        //Remove o atributo "disabled" do botão "adicionar bolsa", quando um input é selecionado
        const input_facul = document.querySelectorAll('div.faculdades input')
        const botao_adicionar = document.getElementById('adicionar_facul_favorita')
        
            for (i=0; i < input_facul.length; i++) {

                if (input_facul[i].checked){
                    botao_adicionar.removeAttribute("disabled")
                    break
                } else if (input_facul[i].checked == false) {
                    botao_adicionar.setAttribute("disabled", "disabled")
                }
            }
        
    }

    /* ==================================== FIM DA ATIVAÇÃO E DESATIVAÇÃO DO BOTAO "ADICIONAR BOLSA" =======================*/
