const Score = (num) => {
  let scoreContainer = document.createElement('div');
  scoreContainer.classList = 'container_score';
  scoreContainer.innerHTML = 'Score: ' + num;
  return scoreContainer;
};

export default Score;
