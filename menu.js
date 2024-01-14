const Menu = () => {
  let menuContainer = document.createElement('div');
  menuContainer.classList = 'container_menu';
  //   continue game

//   let continueGameContainer = document.createElement('button');
//   continueGameContainer.textContent = 'Continue';
//   continueGameContainer.classList = 'container_menu_button';

  // name container
  let nameContainer = document.createElement('span');
  nameContainer.classList = 'container_menu_title';
  nameContainer.innerHTML = 'TetriX';
  //   new game
  let newGameContainer = document.createElement('a');
  newGameContainer.setAttribute('href', '/');
  newGameContainer.textContent = 'New Game';
  newGameContainer.classList = 'container_menu_button';

  //   append menu
//   menuContainer.appendChild(continueGameContainer);
  menuContainer.appendChild(nameContainer);
  menuContainer.appendChild(newGameContainer);
  root.appendChild(menuContainer);
  return menuContainer;
};

export default Menu;
