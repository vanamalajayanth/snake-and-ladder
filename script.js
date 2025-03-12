const createDescendingBoxes = (start, grid) => {
  for (let i = start; i > start - 10; i--) {
    const box = document.createElement("div");
    box.classList.add("item");
    box.setAttribute("id", i);
    grid.appendChild(box);
  }
};

const createAscendingBoxes = (start, grid) => {
  for (let i = start; i < start + 10; i++) {
    const box = document.createElement("div");
    box.classList.add("item");
    box.setAttribute("id", i);
    grid.appendChild(box);
  }
};

const createChart = (grid) => {
  for (let row = 9; row >= 0; row--) {
    if (row % 2 === 0) {
      createAscendingBoxes(row * 10 + 1, grid);
    } else {
      createDescendingBoxes((row + 1) * 10, grid);
    }
  }
};

class Game {
  main;
  document;
  grid;
  players = {};
  #ladders = { 4: 25, 13: 46, 33: 49, 42: 63, 50: 69, 62: 81, 74: 92 };
  #snakes = { 99: 41, 89: 53, 76: 58, 66: 45, 54: 31, 43: 18, 40: 3, 27: 5 };
  currentPlayer = 1;

  constructor(document, main, grid) {
    this.document = document;
    this.main = main;
    this.grid = grid;
  }

  addPlayers() {
    const player1 = this.document.createElement("img");
    player1.setAttribute("src", "./images/player1.png");
    this.document.getElementById("1").appendChild(player1);

    const player2 = this.document.createElement("img");
    player2.setAttribute("src", "./images/player2.png");
    this.document.getElementById("1").appendChild(player2);

    const player3 = this.document.createElement("img");
    player3.setAttribute("src", "./images/player3.png");
    this.document.getElementById("1").appendChild(player3);

    const player4 = this.document.createElement("img");
    player4.setAttribute("src", "./images/player4.png");
    this.document.getElementById("1").appendChild(player4);

    this.players.player1 = { positions: [1], ele: player1 };
    this.players.player2 = { positions: [1], ele: player2 };
    this.players.player3 = { positions: [1], ele: player3 };
    this.players.player4 = { positions: [1], ele: player4 };
  }

  changePlayer() {
    if (this.currentPlayer === 4) {
      this.currentPlayer = 0;
    }
    this.currentPlayer++;
  }

  throwDice() {
    return (Math.ceil(Math.random() * 100) % 6) + 1;
  }

  execute() {
    const num = this.throwDice();
    const currentPlayer = this.players[`player${this.currentPlayer}`];

    let nextPos =
      currentPlayer.positions.at(-1) + num > 100
        ? currentPlayer.positions.at(-1)
        : currentPlayer.positions.at(-1) + num;

    if (nextPos in this.#snakes) nextPos = this.#snakes[nextPos];

    if (nextPos in this.#ladders) nextPos = this.#ladders[`${nextPos}`];

    currentPlayer.positions.push(nextPos);
    const currentBox = this.document.getElementById(`${nextPos}`);
    currentBox.appendChild(currentPlayer.ele);

    if (+nextPos === 100) {
      this.main.innerHTML = `<h1> hey player${this.currentPlayer} has won in  ${currentPlayer.positions.length} moves <h1>`;
      console.log(currentPlayer);
    }

    this.changePlayer();
  }
}

window.onload = () => {
  const main = document.querySelector("main");
  const grid = document.createElement("div");
  grid.classList.add("grid");
  main.appendChild(grid);
  createChart(grid);

  const game = new Game(document, main, grid);
  game.addPlayers();

  document.addEventListener("keypress", game.execute.bind(game));
};
