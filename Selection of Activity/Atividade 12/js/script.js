// js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('numberForm');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const body = document.body;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Previne o reload da página

        // Limpa mensagens anteriores
        resultDiv.textContent = '';
        errorDiv.textContent = '';
        body.classList.remove('even', 'odd');

        // Obtém o valor do input
        const inputValue = document.getElementById('numberInput').value;

        // Validação de input: Verifica se é um número inteiro válido
        if (inputValue === '' || isNaN(inputValue) || !Number.isInteger(parseFloat(inputValue))) {
            errorDiv.textContent = 'Por favor, insira um número inteiro válido.';
            return;
        }

        const number = parseInt(inputValue, 10);

        // Determina se é par ou ímpar
        const isEven = number % 2 === 0;
        const parity = isEven ? 'par' : 'ímpar';

        // Atualiza o resultado
        resultDiv.textContent = `O número ${number} é ${parity}!`;

        // Altera a classe do body para mudar a cor de fundo com transição
        body.classList.add(isEven ? 'even' : 'odd');
    });
});