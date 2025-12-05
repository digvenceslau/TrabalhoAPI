// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Variáveis do Jogo
    let secretNumber = null;
    let rangeMin = 1;
    let rangeMax = 10;
    let balance = 0;
    let bet = 0;
    let attempts = 0;
    let useHints = false;
    let playerName = '';
    let history = [];

    // Elementos DOM
    const setupSection = document.getElementById('setup-section');
    const balanceSection = document.getElementById('balance-section');
    const gameSection = document.getElementById('game-section');
    const endSection = document.getElementById('end-section');
    const balanceDisplay = document.getElementById('balance');
    const attemptsDisplay = document.getElementById('attempts');
    const betAmountDisplay = document.getElementById('bet-amount');
    const message = document.getElementById('message');
    const hint = document.getElementById('hint');
    const historyTableBody = document.querySelector('#history-table tbody');
    const checkName = document.getElementById('check-name');
    const checkAmount = document.getElementById('check-amount');

    // Formulário de Setup
    const setupForm = document.getElementById('setup-form');
    const ageInput = document.getElementById('player-age');
    const ageWarning = document.getElementById('age-warning');
    
    // Age validation listener
    ageInput.addEventListener('input', () => {
        const age = parseInt(ageInput.value);
        if (!isNaN(age) && age < 18) {
            ageWarning.style.display = 'block';
        } else {
            ageWarning.style.display = 'none';
        }
    });
    
    setupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        playerName = document.getElementById('player-name').value.trim();
        const age = parseInt(document.getElementById('player-age').value);
        const sex = document.getElementById('player-sex').value.trim();
        const dobDay = document.getElementById('player-dob-day').value.trim();
        const dobMonth = document.getElementById('player-dob-month').value.trim();
        const dobYear = document.getElementById('player-dob-year').value.trim();
        
        if (!playerName || !age || !sex || !dobDay || !dobMonth || !dobYear) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Validate age
        if (age < 18) {
            alert('You are not old enough to play, leave now!');
            return;
        }
        
        // Validate date
        if (dobDay < 1 || dobDay > 31 || dobMonth < 1 || dobMonth > 12) {
            alert('Por favor, insira uma data válida.');
            return;
        }
        
        setupSection.classList.add('hidden');
        balanceSection.classList.remove('hidden');
        gameSection.classList.remove('hidden');
    });

    // Carregamento de Saldo com Notas
    const notes = document.querySelectorAll('.notes img');
    notes.forEach(note => {
        note.addEventListener('click', () => {
            const value = parseInt(note.dataset.value);
            balance += value;
            balanceDisplay.textContent = balance;
        });
    });

    // Formulário de Aposta Personalizada
    const betForm = document.getElementById('bet-form');
    const betInput = document.getElementById('bet-amount-input');
    
    // Auto-clamp bet input to 0-10000 range
    betInput.addEventListener('input', () => {
        let value = parseInt(betInput.value);
        if (isNaN(value)) return;
        if (value < 0) betInput.value = 0;
        if (value > 10000) betInput.value = 10000;
    });
    
    betForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const betValue = parseInt(betInput.value);
        
        // Read hints preference from hidden input
        useHints = document.getElementById('hints-selection').value === 'yes';
        
        // Validações
        if (isNaN(betValue) || betValue < 0 || betValue > 10000) {
            message.textContent = 'Por favor, insira um valor de aposta entre 0 e 10000 €.';
            return;
        }
        if (betValue > balance) {
            message.textContent = 'Aposta superior ao saldo disponível.';
            return;
        }
        
        bet = betValue;
        betAmountDisplay.textContent = bet;
        message.textContent = '';
    });

    // Hints button selection
    const hintsYesBtn = document.getElementById('hints-yes-btn');
    const hintsNoBtn = document.getElementById('hints-no-btn');
    const hintsSelection = document.getElementById('hints-selection');
    
    hintsYesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hintsSelection.value = 'yes';
        hintsYesBtn.classList.add('active');
        hintsNoBtn.classList.remove('active');
    });
    
    hintsNoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hintsSelection.value = 'no';
        hintsNoBtn.classList.add('active');
        hintsYesBtn.classList.remove('active');
    });

    // Track range inputs globally so we can reset the secret when the range changes
    const minInput = document.getElementById('range-min');
    const maxInput = document.getElementById('range-max');
    if (minInput && maxInput) {
        // When the user adjusts the range, invalidate the current secret so a new one
        // is generated inside the new [min,max] on the next guess.
        minInput.addEventListener('input', () => { secretNumber = null; });
        maxInput.addEventListener('input', () => { secretNumber = null; });
    }

    // Formulário de Aposta
    const guessForm = document.getElementById('guess-form');
    guessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const guessInput = document.getElementById('guess');

        rangeMin = parseInt(minInput.value);
        rangeMax = parseInt(maxInput.value);
        const guess = parseInt(guessInput.value);

        // Validações
        if (isNaN(rangeMin) || isNaN(rangeMax)) {
            message.textContent = 'Por favor, insira valores válidos para o intervalo.';
            return;
        }
        if (rangeMin >= rangeMax) {
            message.textContent = 'O número mínimo deve ser menor que o máximo.';
            return;
        }
        if (isNaN(guess) || guess < rangeMin || guess > rangeMax) {
            message.textContent = `Por favor, insira um número válido entre ${rangeMin} e ${rangeMax}.`;
            return;
        }
        if (bet === 0) {
            message.textContent = 'Selecione um valor de aposta.';
            return;
        }
        if (bet > balance) {
            message.textContent = 'Aposta superior ao saldo disponível.';
            return;
        }

        // Generate secret number only on first attempt
        if (secretNumber === null) {
            secretNumber = Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin;
        }

        attempts++;
        attemptsDisplay.textContent = attempts;
        let result = 'Errado';
        let hintText = '';

        if (guess === secretNumber) {
            result = 'Correto';
            let gain = bet;
            if (useHints) {
                gain *= 0.9; // Desconto de 10%
            }
            balance += gain;
            balanceDisplay.textContent = balance;
            document.body.classList.add('green-bg');
            setTimeout(() => document.body.classList.remove('green-bg'), 1000);
            message.textContent = 'Parabéns! Você acertou! Pode fazer outra aposta.';
            
            // Reset for next round
            secretNumber = null;
            guessInput.value = '';
            betInput.value = 0;
            betAmountDisplay.textContent = 0;
            bet = 0;
            
            // Clear min/max inputs for next round
            minInput.value = 1;
            maxInput.value = 10;
            rangeMin = 1;
            rangeMax = 10;
        } else {
            balance -= bet;
            balanceDisplay.textContent = balance;
            document.body.classList.add('red-bg');
            setTimeout(() => document.body.classList.remove('red-bg'), 1000);
            message.textContent = 'Errado! Tente novamente.';
            if (useHints) {
                hintText = guess < secretNumber ? 'O número é maior.' : 'O número é menor.';
                hint.textContent = hintText;
                hint.classList.remove('hidden');
            }
            if (balance < bet) {
                bet = 0;
                betAmountDisplay.textContent = 0;
            }
        }

        // Registrar no Histórico
        history.push({ attempt: attempts, guess, bet, result, hint: hintText });
        updateHistoryTable();

        // Limpar Input
        guessInput.value = '';
        hint.classList.add('hidden'); // Esconder dica após exibição
    });

    // Função para Atualizar Tabela de Histórico
    function updateHistoryTable() {
        historyTableBody.innerHTML = '';
        history.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.attempt}</td>
                <td>${entry.guess}</td>
                <td>${entry.bet} €</td>
                <td>${entry.result}</td>
                <td>${entry.hint || 'N/A'}</td>
            `;
            historyTableBody.appendChild(row);
        });
    }

    // End Game Button
    const endGameBtn = document.getElementById('end-game-btn');
    endGameBtn.addEventListener('click', () => {
        gameSection.classList.add('hidden');
        balanceSection.classList.add('hidden');
        endSection.classList.remove('hidden');
        checkName.textContent = playerName;
        checkAmount.textContent = balance.toFixed(2);
    });

    // Bet More Button
    const betMoreBtn = document.getElementById('bet-more-btn');
    betMoreBtn.addEventListener('click', () => {
        endSection.classList.add('hidden');
        gameSection.classList.remove('hidden');
        balanceSection.classList.remove('hidden');
    });

    // Change Credentials Button
    const changeCredentialsBtn = document.getElementById('change-credentials-btn');
    changeCredentialsBtn.addEventListener('click', () => {
        // Reset game state
        secretNumber = null;
        rangeMin = 1;
        rangeMax = 10;
        bet = 0;
        attempts = 0;
        useHints = false;
        history = [];
        
        // Clear all inputs and displays
        document.getElementById('player-name').value = '';
        document.getElementById('player-age').value = '';
        document.getElementById('player-sex').value = '';
        document.getElementById('player-dob-day').value = '';
        document.getElementById('player-dob-month').value = '';
        document.getElementById('player-dob-year').value = '';
        document.getElementById('bet-amount-input').value = 0;
        document.getElementById('range-min').value = 1;
        document.getElementById('range-max').value = 10;
        document.getElementById('guess').value = '';
        document.getElementById('hints-selection').value = 'no';
        hintsYesBtn.classList.remove('active');
        hintsNoBtn.classList.add('active');
        attemptsDisplay.textContent = 0;
        betAmountDisplay.textContent = 0;
        message.textContent = '';
        historyTableBody.innerHTML = '';
        
        // Switch to setup section
        gameSection.classList.add('hidden');
        balanceSection.classList.add('hidden');
        setupSection.classList.remove('hidden');
    });
});