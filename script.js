document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('draw-button');
    const currentLetterDisplay = document.querySelector('.current-letter');
    const currentNumberDisplay = document.querySelector('.current-number');
    const currentBallParent = document.querySelector('.current-ball');

    const allBallDisplays = {
        B: document.getElementById('all-b'),
        I: document.getElementById('all-i'),
        N: document.getElementById('all-n'),
        G: document.getElementById('all-g'),
        O: document.getElementById('all-o'),
    };

    let availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1);

    function getLetter(number) {
        if (number <= 15) return 'B';
        if (number <= 30) return 'I';
        if (number <= 45) return 'N';
        if (number <= 60) return 'G';
        return 'O';
    }

    function initializeBoard() {
        availableNumbers.forEach(number => {
            const letter = getLetter(number);
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.id = `ball-${number}`;
            ball.textContent = number;
            allBallDisplays[letter].appendChild(ball);
        });
    }

    function drawNumber() {
        if (availableNumbers.length === 0) {
            alert('Todas as abóboras já foram sorteadas!');
            drawButton.disabled = true;
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const newNumber = availableNumbers[randomIndex];
        
        availableNumbers.splice(randomIndex, 1);

        const letter = getLetter(newNumber);

        // Animação de entrada da abóbora sorteada
        currentBallParent.style.transform = 'scale(0.5)';
        setTimeout(() => {
            currentLetterDisplay.textContent = letter;
            currentNumberDisplay.textContent = newNumber;
            // A animação de pulsação já cuidará do retorno visual
        }, 150);

        // Marca no placar geral
        const allBall = document.getElementById(`ball-${newNumber}`);
        allBall.classList.add('drawn');
    }

    drawButton.addEventListener('click', drawNumber);

    initializeBoard();
});