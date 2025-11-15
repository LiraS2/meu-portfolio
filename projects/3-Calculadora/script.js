class Calculadora {
    constructor(elementoDisplay) {
        this.elementoDisplay = elementoDisplay;
        this.limparTudo();
    }

    limparTudo() {
        this.operandoAtual = '';
        this.operandoAnterior = '';
        this.operacao = undefined;
    }

    adicionarNumero(numero) {
        if (numero === '.' && this.operandoAtual.includes('.')) return;
        this.operandoAtual = this.operandoAtual.toString() + numero.toString();
    }

    escolherOperacao(operacao) {
        if (this.operandoAtual === '') return;
        if (this.operandoAnterior !== '') {
            this.calcular();
        }
        this.operacao = operacao;
        this.operandoAnterior = this.operandoAtual;
        this.operandoAtual = '';

    }

    calcular() {
        let resultado;

        var anterior = parseFloat(this.operandoAnterior);
        var atual = parseFloat(this.operandoAtual);

        if (isNaN(anterior) || isNaN(atual)) return;

        switch (this.operacao) {
            case '+':
                resultado = anterior + atual;
                break;
            case '-':
                resultado = anterior - atual;
                break;
            case '*':
                resultado = anterior * atual;
                break;
            case '/':
                resultado = anterior / atual;
                break;
            default:
                return;
        }

        this.operandoAtual = resultado;
        this.operacao = undefined;
        this.operandoAnterior = '';
    }

    apagar() {
        this.operandoAtual = this.operandoAtual.toString().slice(0, -1);
    }

    atualizarDisplay() {
        this.elementoDisplay.innerText = 
        this.operandoAtual || this.operandoAnterior || '0';
    }
}


const elementoDisplay = document.getElementById('display');
const calculadora = new Calculadora(elementoDisplay);
const botoes = document.querySelectorAll('.btn');

function clearAll() {
    calculadora.limparTudo();
    calculadora.atualizarDisplay();
}

function pressed(valor) {
    const éNumero = !isNaN(parseFloat(valor)) && isFinite(valor);
    const éPonto = valor === '.';

    if (éNumero || éPonto) {
        calculadora.adicionarNumero(valor);
    } else {
        calculadora.escolherOperacao(valor);
    }

    calculadora.atualizarDisplay();
}

function backspace() {
    calculadora.apagar();
    calculadora.atualizarDisplay();
}

function calculate() {
    calculadora.calcular();
    calculadora.atualizarDisplay();
}

botoes.forEach(botao => {
    botao.addEventListener('mousedown', () => {
        botao.style.color = 'black';
        botao.style.backgroundImage = 'linear-gradient(gray, yellow)';
    });

    const revertStyle = () => {
        botao.style.color = '#fff';
        botao.style.backgroundImage = 'linear-gradient(gray, black)';
    };

    botao.addEventListener('mouseup', revertStyle);
    botao.addEventListener('mouseleave', revertStyle);
});


function encontrarBotao(key) {
    if (key === 'Enter') return document.querySelector('button[aria-label="Equals"]');
    if (key === 'Escape') return document.querySelector('button[aria-label="Clear"]');
    if (key === 'Backspace') return document.querySelector('button[aria-label="Backspace"]');
    
    return Array.from(botoes).find(b => b.innerText === key);
}

window.addEventListener('keydown', function(e) {
    const botao = encontrarBotao(e.key); 
    if (!botao) return;

    botao.style.color = 'black';
    botao.style.backgroundImage = 'linear-gradient(gray, yellow)';
});

window.addEventListener('keyup', function(e) {
    const botao = encontrarBotao(e.key); 
    if (!botao) return;

    botao.click();
    
    botao.style.color = '#fff'; 
    botao.style.backgroundImage = 'linear-gradient(gray, black)'; 
});