import Menu from './menu.js';
import Game from './game.js';
console.log('Engine start!');
let root = document.querySelector('#root');
root.classList = 'container';

const [container, newGame] = Menu();
let grid = Game('Wait');
root.appendChild(container);
root.appendChild(grid);

newGame.addEventListener('click', () => {
  root.removeChild(grid);
  grid = Game('Start');
  root.appendChild(grid);
});