import { Grid } from './assets/buildGrid.js';
import { IconPool } from './assets/gameIcons.js';
const Game = (engine) => {
  let grid = Grid();
  const allBoxes = grid.querySelectorAll('.container_game_row_item');

  const colorList = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
    'black',
  ];
  let side = 0;
  let running;
  let tick = 0;
  let coordX = 0;
  let coordY = 0;
  let tickSpeed = 400;
  let middlemanX = coordX;
  let middlemanY = coordY;
  let middlemanSide = side;
  let randomIcon = IconPool[Math.floor(Math.random() * 7)];
  let randomColor = colorList[Math.floor(Math.random() * 7)];

  window.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key == 'ArrowLeft') {
      // console.log((randomIcon[side][0] - 1 + coordY) % 10);
      coordY--;
      if ((randomIcon[side][0] % 10) + coordY < 0) {
        coordY++;
      }
    } else if (e.key == 'ArrowRight') {
      coordY++;
      if ((randomIcon[side][3] % 10) + coordY > 9) {
        coordY--;
      }
    } else if (e.key == 'ArrowDown') {
      coordX += 10;
    } else if (e.key == 'ArrowUp') {
      if (side < 3) {
        side++;
      } else {
        side = 0;
      }
    } else if (e.key == 'Escape') {
      cancelAnimationFrame(running);

      // menu container
      let menuContinue = document.createElement('div');
      menuContinue.classList = 'container_menu_button_continue';
      
      // continue
      let gameContinue = document.createElement('button');
      gameContinue.innerHTML = 'Continue';
      gameContinue.classList = 'container_menu_button_continue_button';
      menuContinue.appendChild(gameContinue);
      gameContinue.addEventListener('click', () => {
        requestAnimationFrame(refresh);
        grid.removeChild(menuContinue);
      });
      // restart
      let gameRestart = document.createElement('a');
      gameRestart.innerHTML = 'Restart';
      gameRestart.classList = 'container_menu_button_continue_button';
      gameRestart.href = '/';
      menuContinue.appendChild(gameRestart);
      grid.appendChild(menuContinue);
    }
  });

  // start new tetromino
  const newTetro = () => {
    side = 0;
    running;
    tick = 0;
    coordX = 0;
    coordY = 0;
    tickSpeed = 400;
    middlemanX = coordX;
    middlemanY = coordY;
    middlemanSide = side;
    randomIcon = IconPool[Math.floor(Math.random() * 7)];
    randomColor = colorList[Math.floor(Math.random() * 7)];
  };

  // animation start
  const refresh = () => {
    // slow tick
    if (tick == tickSpeed) {
      tick = 0;
      coordX += 10;
    }

    if (middlemanX != coordX) {
      randomIcon[side].forEach((i) => {
        if (i + coordX >= 200) {
          console.log('X axis breached!');
          newTetro();
        }
      });
    }
    if (
      middlemanX != coordX ||
      middlemanY != coordY ||
      middlemanSide != side ||
      coordX == 0
    ) {
      randomIcon[middlemanSide].forEach((i) => {
        allBoxes[i + middlemanX + middlemanY].classList.remove('filled');
        allBoxes[i + middlemanX + middlemanY].classList.remove(randomColor);
      });
      randomIcon[side].forEach((i) => {
        // console.log(i + coordX + coordY);
        allBoxes[i + coordX + coordY].classList.add('filled');
        allBoxes[i + coordX + coordY].classList.add(randomColor);
      });
      middlemanX = coordX;
      middlemanY = coordY;
      middlemanSide = side;
    }
    // fast tick
    tick++;
    running = requestAnimationFrame(refresh);
  };
  if (engine == 'Start') {
    running = requestAnimationFrame(refresh);
  }
  return grid;
};

export default Game;
