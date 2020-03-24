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

    //Mostra o modal ao clicar na caixa de adicionar bolsa
    const cx_add_bolsa = document.getElementById('cx_add_bolsa')
    const botao_cancelar = document.getElementById('cancelar')
    cx_add_bolsa.addEventListener('click', () => mostrarModal('background-modal'))
    botao_cancelar.addEventListener('click', () => mostrarModal('background-modal'))
    //------------------------------------------------------//
    //Mudar o valor na tela quando o usuário mexer o range
    var slider = document.getElementById("range-pd-pagar");
    var valor = document.getElementById("valor-pd-pgar");
    valor.innerHTML = `R$${slider.value}`;

    slider.oninput = function () {
        valor.innerHTML = `R$${this.value}`;
    }
    
