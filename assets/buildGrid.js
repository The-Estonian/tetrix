import { GameGrid } from './gameIcons.js';

export const Grid = () => {
  let gridContainer = document.createElement('div');
  gridContainer.classList = 'container_game';
  for (let i = 0; i < GameGrid.length; i++) {
    let gameConsoleRow = document.createElement('div');
    gameConsoleRow.classList = 'container_game_row';
    for (let j = 0; j < GameGrid[i].length; j++) {
      let gameConsoleItem = document.createElement('span');
      gameConsoleItem.classList = 'container_game_row_item';
      if (GameGrid[i][j] !== 0) {
        gameConsoleItem.classList.add('filled');
      }
      gameConsoleItem.innerHTML = '';
      gameConsoleRow.appendChild(gameConsoleItem);
    }
    gridContainer.appendChild(gameConsoleRow);
  }
  return gridContainer;
};
