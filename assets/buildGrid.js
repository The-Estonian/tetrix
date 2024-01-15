export const Grid = () => {
  let gridContainer = document.createElement('div');
  gridContainer.classList = 'container_game';
  for (let i = 0; i < 20; i++) {
    let gameConsoleRow = document.createElement('div');
    gameConsoleRow.classList = 'container_game_row';
    for (let j = 0; j < 10; j++) {
      let gameConsoleItem = document.createElement('span');
      gameConsoleItem.classList = 'container_game_row_item';
      gameConsoleItem.innerHTML = '';
      gameConsoleRow.appendChild(gameConsoleItem);
    }
    gridContainer.appendChild(gameConsoleRow);
  }
  return gridContainer;
};
