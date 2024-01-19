import { Grid } from './assets/buildGrid.js';
import { NewElement } from '../helper.js';
import { newTetro } from './newTetro.js';

export const Game = (engine) => {
  let grid = Grid();
  let allBoxes = grid.querySelectorAll('.container_game_row_item');
  let allRows = grid.querySelectorAll('.container_game_row');
  const scoreElement = NewElement('div');
  const clockElement = NewElement('div');

  let running;
  let defaulttickSpeed = 60;
  let tickSpeed = defaulttickSpeed;
  let score = 0;
  let tick = 0;
  let clockTick = 0;
  let menuOpen = false;
  let tetroFreeze = false;
  let second = 0;

  let currentTetro = newTetro();

  window.onblur = function () {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  };

  window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowLeft') {
      currentTetro.coordY--;
      if (
        (currentTetro.randomIcon[currentTetro.side][0] % 10) +
          currentTetro.coordY <
        0
      ) {
        currentTetro.coordY++;
      }
    } else if (e.key == 'ArrowRight') {
      currentTetro.coordY++;
      if (
        (currentTetro.randomIcon[currentTetro.side][3] % 10) +
          currentTetro.coordY >
        9
      ) {
        currentTetro.coordY--;
      }
    } else if (e.key == 'ArrowDown') {
      currentTetro.coordX += 10;
    } else if (e.key == 'ArrowUp') {
      if (currentTetro.side < 3) {
        currentTetro.side++;
      } else {
        currentTetro.side = 0;
      }
    } else if (e.key == 'Escape' && !menuOpen) {
      menuOpen = true;
      cancelAnimationFrame(running);

      // menu container
      let menuContinue = NewElement('div', 'container_menu_button_continue');

      // continue
      let gameContinue = NewElement(
        'button',
        'container_menu_button_continue_button',
        'Continue'
      );
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
      let gameRestart = NewElement(
        'a',
        'container_menu_button_continue_button',
        'Restart'
      );
      gameRestart.href = '/';
      menuContinue.appendChild(gameRestart);
      allBoxes.forEach((e) => {
        e.classList.add('fade');
      });
      grid.insertBefore(menuContinue, grid.firstChild);
    }
  });

  // start new tetromino

  // animation start
  const refresh = (timestamp) => {
    const deltaTime = timestamp - lastTimestamp;
    if (deltaTime < minFrameTime) {
      running = requestAnimationFrame(refresh);
      return;
    }
    // slow tick
    if (second == 60) {
      clockTick++;
      scoreElement.innerHTML = 'Score: ' + score;
      clockElement.innerHTML =
        'Time: ' +
        (clockTick < 60
          ? clockTick + 's'
          : Math.floor(clockTick / 60) +
            'm' +
            (clockTick - Math.floor(clockTick / 60) * 60) +
            's');
      second = 0;
    }
    if (tick >= tickSpeed) {
      tick = 0;
      currentTetro.coordX += 10;
    }

    // check sides
    if (currentTetro.middlemanY != currentTetro.coordY) {
    }

    // check bottom
    if (currentTetro.middlemanX != currentTetro.coordX) {
      for (
        let i = 0;
        i < currentTetro.randomIcon[currentTetro.side].length;
        i++
      ) {
        if (
          currentTetro.randomIcon[currentTetro.side][i] + currentTetro.coordX >=
            200 ||
          allBoxes[
            currentTetro.randomIcon[currentTetro.side][i] +
              currentTetro.coordX +
              currentTetro.coordY
          ].classList.contains('freeze')
        ) {
          for (
            let j = 0;
            j < currentTetro.randomIcon[currentTetro.side].length;
            j++
          ) {
            allBoxes[
              currentTetro.randomIcon[currentTetro.side][j] +
                currentTetro.middlemanX +
                currentTetro.middlemanY
            ].classList.add('freeze');
          }
          // check rows for deletion and scoring
          for (let i = 0; i < 20; i++) {
            let boxCounter = 0;
            for (let j = 0; j < 10; j++) {
              if (allBoxes[i * 10 + j].classList.contains('freeze')) {
                boxCounter++;
              } else {
                break;
              }
              if (boxCounter == 10) {
                score++;
                if (tickSpeed > 10) {
                  tickSpeed -= 1;
                  console.log(tickSpeed);
                }
                grid.removeChild(allRows[i]);
                // create new row
                let gameConsoleRow = NewElement('div', 'container_game_row');
                for (let j = 0; j < 10; j++) {
                  let gameConsoleItem = NewElement(
                    'span',
                    'container_game_row_item'
                  );
                  gameConsoleRow.appendChild(gameConsoleItem);
                }
                grid.insertBefore(gameConsoleRow, grid.childNodes[1]);
                allBoxes = grid.querySelectorAll('.container_game_row_item');
                allRows = grid.querySelectorAll('.container_game_row');
              }
            }
          }
          // create new tetro if previos locks down
          currentTetro = newTetro();
          break;
        }
      }
    }
    if (
      currentTetro.middlemanX != currentTetro.coordX ||
      currentTetro.middlemanY != currentTetro.coordY ||
      currentTetro.middlemanSide != currentTetro.side ||
      currentTetro.coordX == 0
    ) {
      for (
        let i = 0;
        i < currentTetro.randomIcon[currentTetro.side].length;
        i++
      ) {
        if (
          allBoxes[
            currentTetro.randomIcon[currentTetro.side][i] +
              currentTetro.coordX +
              currentTetro.coordY
          ].classList.contains('freeze')
        ) {
          tetroFreeze = true;
          currentTetro = newTetro();
        }
      }

      if (!tetroFreeze) {
        currentTetro.randomIcon[currentTetro.middlemanSide].forEach((i) => {
          allBoxes[
            i + currentTetro.middlemanX + currentTetro.middlemanY
          ].classList.remove('filled');
          allBoxes[
            i + currentTetro.middlemanX + currentTetro.middlemanY
          ].classList.remove(currentTetro.randomColor);
        });

        currentTetro.randomIcon[currentTetro.side].forEach((i) => {
          if (
            allBoxes[
              i + currentTetro.coordX + currentTetro.coordY
            ].classList.contains('filled')
          ) {
            allBoxes[
              i + currentTetro.middlemanX + currentTetro.middlemanY
            ].classList.add('filled');
            allBoxes[
              i + currentTetro.middlemanX + currentTetro.middlemanY
            ].classList.add(currentTetro.randomColor);
          } else {
            allBoxes[
              i + currentTetro.coordX + currentTetro.coordY
            ].classList.add('filled');
            allBoxes[
              i + currentTetro.coordX + currentTetro.coordY
            ].classList.add(currentTetro.randomColor);
          }
        });

        currentTetro.middlemanX = currentTetro.coordX;
        currentTetro.middlemanY = currentTetro.coordY;
        currentTetro.middlemanSide = currentTetro.side;
      }
      tetroFreeze = false;
    }
    // fast tick
    tick++;
    second++;
    lastTimestamp = timestamp;
    running = requestAnimationFrame(refresh);
    // }, 1000 / 60);
  };
  let lastTimestamp = performance.now();
  const minFrameTime = 1000 / 60;
  if (engine == 'Start') {
    running = requestAnimationFrame(refresh);
  }

  grid.appendChild(scoreElement);
  grid.appendChild(clockElement);

  return grid;
};
