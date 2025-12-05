        function calcularSucessor() {
            const num = parseFloat(document.getElementById('num1').value);
            if (isNaN(num)) {
                alert('Por favor, insira um número válido.');
                return;
            }
            const sucessor = num + 1;
            const mensagem = 'O sucessor de ' + num + ' é ' + sucessor + '.';
            document.getElementById('res1').innerText = mensagem;
            console.log(mensagem); 
        }


        function calcularAntecessor() {
            const num = parseFloat(document.getElementById('num2').value);
            if (isNaN(num)) {
                alert('Por favor, insira um número válido.');
                return;
            }
            const antecessor = num - 1;
            const mensagem = 'O antecessor de ' + num + ' é ' + antecessor + '.';
            document.getElementById('res2').innerText = mensagem;
            alert(mensagem);
        }


        function calcularRetangulo() {
            const base = parseFloat(document.getElementById('base').value);
            const altura = parseFloat(document.getElementById('altura').value);
            if (isNaN(base) || isNaN(altura)) {
                alert('Por favor, insira valores válidos.');
                return;
            }
            const area = base * altura;
            const perimetro = 2 * (base + altura);
            const mensagem = 'Área: ' + area + '. Perímetro: ' + perimetro + '.';
            document.getElementById('res3').innerText = mensagem;
            console.log(mensagem);
        }


        function calcularIdadeDias() {
            const anos = parseInt(document.getElementById('anos').value);
            if (isNaN(anos) || anos < 0) {
                alert('Por favor, insira uma idade válida.');
                return;
            }
            const dias = anos * 365;
            const mensagem = 'Idade em dias: ' + dias + '.';
            document.getElementById('res4').innerText = mensagem;
            alert(mensagem);
        }


        function calcularIdadeAnos() {
            const dias = parseInt(document.getElementById('dias').value);
            if (isNaN(dias) || dias < 0) {
                alert('Por favor, insira um valor válido.');
                return;
            }
            const anos = Math.floor(dias / 365);
            const mensagem = 'Idade em anos: ' + anos + '.';
            document.getElementById('res5').innerText = mensagem;
            console.log(mensagem);
        }


        function calcularDesconto() {
            const valor = parseFloat(document.getElementById('valorProduto').value);
            if (isNaN(valor) || valor < 0) {
                alert('Por favor, insira um valor válido.');
                return;
            }
            const desconto = valor * 0.9;
            const mensagem = 'Valor com 10% de desconto: ' + desconto.toFixed(2) + '.';
            document.getElementById('res6').innerText = mensagem;
            alert(mensagem);
        }


        function calcularOperacoes() {
            const num = parseFloat(document.getElementById('num7').value);
            if (isNaN(num)) {
                alert('Por favor, insira um número válido.');
                return;
            }
            const metade = num / 2;
            const dobro = num * 2;
            const quadrado = num * num;
            const cubo = num * num * num;
            const mensagem = 'Metade: ' + metade + '. Dobro: ' + dobro + '. Quadrado: ' + quadrado + '. Cubo: ' + cubo + '.';
            document.getElementById('res7').innerText = mensagem;
            console.log(mensagem);
        }


        function calcularCirculo() {
            const raio = parseFloat(document.getElementById('raio').value);
            if (isNaN(raio) || raio <= 0) {
                alert('Por favor, insira um raio válido.');
                return;
            }
            const PI = 3.1416;
            const area = PI * raio * raio;
            const perimetro = 2 * PI * raio;
            const mensagem = 'Área: ' + area.toFixed(2) + '. Perímetro: ' + perimetro.toFixed(2) + '.';
            document.getElementById('res8').innerText = mensagem;
            alert(mensagem);
        }