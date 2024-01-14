import { Grid } from './assets/buildGrid.js';
// I+, O+, T+, S+, Z+, J+, and L+.
import { GameGrid, IconPool } from './assets/gameIcons.js';
const Game = (engine) => {
  let grid = Grid();
  const allBoxes = grid.querySelectorAll('.container_game_row_item');

  let side = 0;
  let running;
  let tick = 0;
  let coordX = 0;
  let coordY = 0;

  let randomIcon = IconPool[Math.floor(Math.random() * 7)];

  window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowLeft') {
      coordY--;
      if (coordY < 0) {
        coordY = 0;
      }
    } else if (e.key == 'ArrowRight') {
      coordY++;
      if (coordY > 9) {
        coordY = 10;
      }
    } else if (e.key == 'ArrowDown') {
      coordX+=10;
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
    // fast tick
    allBoxes[coordX+coordY].classList.add('filled');
    tick++;
    running = requestAnimationFrame(refresh);
    // animation end
  };
  if (engine == 'start') {
    running = requestAnimationFrame(refresh);
  } else if (engine == 'stop') {
    console.log('stopped');
    cancelAnimationFrame(running);
  }
  return grid;
};

export default Game;

// for (let i = randomIcon[side].length-1; i >= 0 ; i--) {
//   for (let j = randomIcon[side][i].length-1; j >=0 ; j--) {
//     if (coordX > 0) {
//       GameGrid[coordX + i-1][coordY + j] = 0;
//     }
//     if (randomIcon[side][i][j] == 1) {
//       GameGrid[coordX + i][coordY + j] = 1;
//     }
//   }
// }
// root.removeChild(grid);
// grid = Grid();
// root.appendChild(grid);
