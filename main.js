import Menu from './menu.js';
import Game from './game.js';
import Score from './score.js';
console.log('Engine start!');
let root = document.querySelector('#root');
root.classList = 'container';

root.appendChild(Menu());
root.appendChild(Game("start"));
root.appendChild(Score(0));


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
