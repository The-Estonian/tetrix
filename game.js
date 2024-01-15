import { Grid } from './assets/buildGrid.js';
import {IconPool } from './assets/gameIcons.js';
const Game = (engine) => {
  let grid = Grid();
  const allBoxes = grid.querySelectorAll('.container_game_row_item');

  let side = 0;
  let running;
  let tick = 0;
  let coordX = 0;
  let coordY = 0;
  let middlemanX = coordX;
  let middlemanY = coordY;
  let middlemanSide = side;
  let randomIcon = IconPool[Math.floor(Math.random() * 7)];

  window.addEventListener('keydown', (e) => {
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
    }
  });

  // animation start
  const refresh = () => {
    // slow tick
    if (tick == 400) {
      tick = 0;
      coordX += 10;
    }

    if (
      middlemanX != coordX ||
      middlemanY != coordY ||
      middlemanSide != side ||
      coordX == 0
    ) {
      console.log('Changes!');
      randomIcon[middlemanSide].forEach((i) => {
        allBoxes[i + middlemanX + middlemanY].classList.remove('filled');
      });

      randomIcon[side].forEach((i) => {
        allBoxes[i + coordX + coordY].classList.add('filled');
      });
      middlemanX = coordX;
      middlemanY = coordY;
      middlemanSide = side;
    }
    // fast tick

    tick++;
    running = requestAnimationFrame(refresh);
    // animation end
    if (coordX == 170) {
      cancelAnimationFrame(running);
    }
  };
  if (engine == 'Start') {
    console.log('started');
    running = requestAnimationFrame(refresh);
  }
  return grid;
};

export default Game;
