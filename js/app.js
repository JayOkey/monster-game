;(function(d){
  // The monsters and socks
  var monsters = [
    'monster1',
    'monster2',
    'monster3',
    'monster4',
    'monster5',
    'monster6',
    'monster7',
    'monster8',
    'monster9',
    'monster10',
    'monster11',
    'sock'
  ];

  const app = d.querySelector('#app'),
        restart = d.querySelector('#restart');

  let guessCount = 0;

  // Methods

  const shuffle = function (array) {

    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  // build monster square
  const monsterSquare = function(monster) {

    return `<div class="grid" data-monster="${ monster }">
              <button>
                <img src="img/door.svg" alt="Click the door to see what\'s behind it.">
              </button>
            </div>`;
  };

  const buildMonsterGrid = function(monsters) {

    const monsterGrid = monsters.map(monsterSquare);
    return monsterGrid;
  };

  // return the closest monster grid item
  const findMonster = function(target) {
    return target.closest('[data-monster]');
  };

  // replace the door image with a monster image
  const swapImage = function(element) {

    const monster = element.getAttribute('data-monster');

    element.innerHTML = `<img src="img/${ monster }.svg" alt="${ monster }">`;
  };

  // shuffle monsters and render monster grid
  const init = function() {

    shuffle(monsters);
    app.innerHTML = buildMonsterGrid(monsters).join('');
  };

  // calculate guesses
  const calcGuesses = function(monster) {
    if ( monster.getAttribute('data-monster') !== 'sock' ) {
      guessCount++;
    }
  };

  // determine if the game has been won or lost
  const gameOver = function(monster) {
    if ( monster.getAttribute('data-monster') === 'sock' ) {
      alert("Game Over! You had " + guessCount + " correct guesses.");
      guessCount = 0;
      init();
    }
    if ( guessCount === 11 ) {
      alert("Well Done. You WON!!!");
      guessCount = 0;
      init();
    }
  };

  app.addEventListener('click', function(event) {

    const monster = findMonster(event.target);
    swapImage(monster);
    calcGuesses(monster);
    gameOver(monster);
  }, false);

  restart.addEventListener('click', function(event) {
    init();
    guessCount = 0;
  }, false);

  init();

})(document);