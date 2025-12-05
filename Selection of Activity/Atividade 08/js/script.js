    function calculate() {
        const value1 = parseFloat(document.getElementById('value1').value);
        const value2 = parseFloat(document.getElementById('value2').value);
        
        if (isNaN(value1) || isNaN(value2)) {
            document.getElementById('result').innerText = 'Por favor, insira valores válidos.';
            return;
        }

        const sum = value1 + value2;
        const difference = value1 - value2;
        const product = value1 * value2;
        const quotient = value2 !== 0 ? (value1 / value2) : 'Indefinido';

        document.getElementById('result').innerHTML = `
            Soma: ${sum} <br>
            Subtração: ${difference} <br>
            Multiplicação: ${product} <br>
            Divisão: ${quotient}
        `;
    }