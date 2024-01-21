import { Menu } from './menu.js';
import { Game } from './game.js';
let root = document.querySelector('#root');
root.classList = 'container';

const [container, newGame] = Menu();
let [grid, scoreElement, clockElement, livesElement] = Game('Wait');
root.appendChild(container);
root.appendChild(grid);
root.appendChild(scoreElement);
root.appendChild(clockElement);
root.appendChild(livesElement);

newGame.addEventListener('click', () => {
  root.removeChild(grid);
  root.removeChild(scoreElement);
  root.removeChild(clockElement);
  root.removeChild(livesElement);
  [grid, scoreElement, clockElement, livesElement] = Game('Start');
  root.appendChild(grid);
  root.appendChild(scoreElement);
  root.appendChild(clockElement);
  root.appendChild(livesElement);
});
