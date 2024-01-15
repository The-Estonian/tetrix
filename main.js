import Menu from './menu.js';
import Game from './game.js';
import Score from './score.js';
console.log('Engine start!');
let root = document.querySelector('#root');
root.classList = 'container';

const [container, newGame] = Menu();
const score = Score(0);
let grid = Game('Wait');
root.appendChild(container);
root.appendChild(grid);
root.appendChild(score);

newGame.addEventListener('click', () => {
  root.removeChild(grid);
  root.removeChild(score);
  grid = Game('Start');
  root.appendChild(grid);
  root.appendChild(score);
});
// let reqAnimationId;
// let counter = 0;
// function smoothAnimation() {
//   let menuContainer = document.createElement('div');
//   menuContainer.innerHTML = 'Menu';
//   root.appendChild(menuContainer);
//   start();
//   counter++;
//   if (counter > 10) {
//     end();
//   }
//   reqAnimationId = requestAnimationFrame(smoothAnimation);
// }
// // to start
// function start() {
//   reqAnimationId = requestAnimationFrame(smoothAnimation);
// }
// // to end
// function end() {
//   cancelAnimationFrame(reqAnimationId);
// }
// console.log('reqAnimationId', reqAnimationId);
// smoothAnimation();
