import { Grid } from './assets/buildGrid.js';
import { IconPool } from './assets/gameIcons.js';
import Score from './score.js';

const Game = (engine) => {
  let grid = Grid();
  let allBoxes = grid.querySelectorAll('.container_game_row_item');
  let allRows = grid.querySelectorAll('.container_game_row');
  const scoreElement = document.createElement('div');
  const clockElement = document.createElement('div');
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
  let defaulttickSpeed = 400
  let tickSpeed = defaulttickSpeed;
  let clockTick = 0;
  let score = 0;
  let middlemanX = coordX;
  let middlemanY = coordY;
  let middlemanSide = side;
  let randomIcon = IconPool[Math.floor(Math.random() * 7)];
  let randomColor = colorList[Math.floor(Math.random() * 7)];
  let menuOpen = false;
  let tetroFreeze = false;

  window.onblur = function () {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  };

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
    } else if (e.key == 'Escape' && !menuOpen) {
      menuOpen = true;
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
        menuOpen = false;
        allBoxes.forEach((e) => {
          e.classList.remove('fade');
        });
      });
      // restart
      let gameRestart = document.createElement('a');
      gameRestart.innerHTML = 'Restart';
      gameRestart.classList = 'container_menu_button_continue_button';
      gameRestart.href = '/';
      menuContinue.appendChild(gameRestart);
      allBoxes.forEach((e) => {
        e.classList.add('fade');
      });
      grid.insertBefore(menuContinue, grid.firstChild);
    }
  });

  // start new tetromino
  const newTetro = () => {
    side = 0;
    running;
    tick = 0;
    coordX = 0;
    coordY = 0;
    middlemanX = coordX;
    middlemanY = coordY;
    middlemanSide = side;
    randomIcon = IconPool[Math.floor(Math.random() * 7)];
    randomColor = colorList[Math.floor(Math.random() * 7)];
  };

  // animation start
  const refresh = () => {
    // slow tick
    if (tick == 60) {
      clockTick++;
      scoreElement.innerHTML = 'Score: ' + score;
      clockElement.innerHTML = 'Time: ' + clockTick;
    }
    if (tick == tickSpeed) {
      tick = 0;
      coordX += 10;
    }

    // check sides
    if (middlemanY != coordY) {
    }

    // check bottom
    if (middlemanX != coordX) {
      for (let i = 0; i < randomIcon[side].length; i++) {
        if (
          randomIcon[side][i] + coordX >= 200 ||
          allBoxes[randomIcon[side][i] + coordX + coordY].classList.contains(
            'freeze'
          )
        ) {
          console.log('X axis breached!');
          for (let j = 0; j < randomIcon[side].length; j++) {
            allBoxes[
              randomIcon[side][j] + middlemanX + middlemanY
            ].classList.add('freeze');
          }
          // check rows for deletion and scoring
          for (let i = 0; i < 20; i++) {
            let boxCounter = 0;
            for (let j = 0; j < 10; j++) {
              console.log('iteration');
              if (allBoxes[i * 10 + j].classList.contains('freeze')) {
                boxCounter++;
              } else {
                break;
              }
              if (boxCounter == 10) {
                score++;
                tickSpeed-=10
                grid.removeChild(allRows[i]);
                // create new row
                let gameConsoleRow = document.createElement('div');
                gameConsoleRow.classList = 'container_game_row';
                for (let j = 0; j < 10; j++) {
                  let gameConsoleItem = document.createElement('span');
                  gameConsoleItem.classList = 'container_game_row_item';
                  gameConsoleItem.innerHTML = '';
                  gameConsoleRow.appendChild(gameConsoleItem);
                }
                grid.insertBefore(gameConsoleRow, grid.childNodes[1]);
                allBoxes = grid.querySelectorAll('.container_game_row_item');
                allRows = grid.querySelectorAll('.container_game_row');
              }
            }
          }
          // create new tetro if previos locks down
          newTetro();
          break;
        }
      }
    }
    if (
      middlemanX != coordX ||
      middlemanY != coordY ||
      middlemanSide != side ||
      coordX == 0
    ) {
      for (let i = 0; i < randomIcon[side].length; i++) {
        if (
          allBoxes[randomIcon[side][i] + coordX + coordY].classList.contains(
            'freeze'
          )
        ) {
          console.log('Freezing!');
          tetroFreeze = true;
          newTetro();
        }
      }

      if (!tetroFreeze) {
        randomIcon[middlemanSide].forEach((i) => {
          allBoxes[i + middlemanX + middlemanY].classList.remove('filled');
          allBoxes[i + middlemanX + middlemanY].classList.remove(randomColor);
        });

        randomIcon[side].forEach((i) => {
          if (allBoxes[i + coordX + coordY].classList.contains('filled')) {
            allBoxes[i + middlemanX + middlemanY].classList.add('filled');
            allBoxes[i + middlemanX + middlemanY].classList.add(randomColor);
          } else {
            allBoxes[i + coordX + coordY].classList.add('filled');
            allBoxes[i + coordX + coordY].classList.add(randomColor);
          }
        });

        middlemanX = coordX;
        middlemanY = coordY;
        middlemanSide = side;
      }
      tetroFreeze = false;
    }
    // fast tick
    tick++;
    running = requestAnimationFrame(refresh);
  };
  if (engine == 'Start') {
    running = requestAnimationFrame(refresh);
  }

  grid.appendChild(scoreElement);
  grid.appendChild(clockElement);

  return grid;
};

export default Game;
