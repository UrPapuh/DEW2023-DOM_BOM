// Variables
const size = 3; // Tamaño de la tabla
const seg = 5; // Numero de segundos por turno
let interval = setInterval(update, 1000); // Contador

// Rellenar tabla
const table = document.querySelector('table');
for (let i = 0; i < size; i++) {
  const tr = document.createElement('tr');
  table.append(tr);
  for (let j = 0; j < size; j++) {
    const td = document.createElement('td');
    td.className = 'free';
    td.setAttribute('onclick','change(this)');
    tr.append(td);
  }
}

// Funciones
function update() {
  const time = document.querySelector('#time');
  if (time.textContent <= 3) time.className = 'red'; // time < 2
  if (time.textContent == '0') {
    switchTurn(); // Cambiar el turno
    time.classList.remove("red");
  } else {
    time.textContent--;
  }
}

function switchTurn() {
  // Reiniciar contador
  const time = document.querySelector('#time');
  time.textContent = seg;
  // Cambiar turno
  const turn = document.querySelector('#turn');
  if (turn.className == 'player1') {
    turn.className = 'player2';
    turn.textContent = 'Jugador 2';
  } else {
    turn.className = 'player1';
    turn.textContent = 'Jugador 1';
  }
}

function count() {
  let elements = document.querySelectorAll('td');
  let num1 = 0, num2 = 0;
  elements.forEach(td => {
    if (td.className == 'player1') {
      num1++;
    } else if (td.className == 'player2') {
      num2++;
    }
  });
  document.getElementById('player1').textContent = num1;
  document.getElementById('player2').textContent = num2;
}

function change(cell) {
  if (cell.className == 'free') {
    const turn = document.querySelector('#turn').className;
    cell.className = turn;
    switchTurn(); // Cambiar el turno
  }
  count(); // Recuento de puntos
  // Terminar juego
  if (!document.querySelector('.free')) {
    results();
    clearInterval(interval);
    interval = null;
  }
}

function results() {
  const result = document.getElementById('result');
  const player1 = document.getElementById('player1').textContent;
  const player2 = document.getElementById('player2').textContent;
  if (player1 > player2) {
    result.textContent = 'WINNER: JUGADOR 1';
  } else if (player1 < player2) {
    result.textContent = 'WINNER: JUGADOR 2';
  } else {
    result.textContent = 'EMPATE';
  }
}

function retry() {
  window.location.reload();
}