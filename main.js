const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: '100',
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['knife'],
  attack,
  changeHP,
  elHP,
  renderHP,
};
const player2 = {
  player: 2,
  name: 'Sonya',
  hp: '100',
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['knife'],
  attack,
  changeHP,
  elHP,
  renderHP,
};

function attack(name) {
  console.log(name + 'fight...');
}

const createElement = (teg, classname) => {
  const $teg = document.createElement(teg);
  if (classname) {
    $teg.classList.add(classname);
  }
  return $teg;
};

function createPlayer(play) {
  const $player = createElement('div', 'player' + play.player);
  const $progressbar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = play.hp + '%';
  $name.innerText = play.name;
  $img.src = play.img;

  $player.appendChild($progressbar);
  $player.appendChild($character);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);

  return $player;
}

function getRandom(num) {
  return Math.ceil(Math.random() * num);
}

// Функция отображения здоровья
function renderHP() {
  this.elHP().style.width = this.hp + '%';
}

// Функция выбора персонажа
function elHP() {
  return document.querySelector('.player' + this.player + ' .life');
}
// Функция изменения здоровья
function changeHP(num) {
  this.hp -= num;
  if (this.hp <= 0) {
    this.hp = 0;
  }
  return this.hp;
}

// создаем кнопку
function createReloadButton() {
  const $reloadButtonDiv = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');
  $reloadButton.innerText = 'Restart';
  $reloadButton.addEventListener('click', () => {
    window.location.reload();
  });
  $reloadButtonDiv.appendChild($reloadButton);
  $arenas.appendChild($reloadButtonDiv);
}

function round() {
  player1.renderHP(elHP());
  player2.renderHP(elHP());

  const enemy = enemyAttack();
  const attack = {};

  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
  }
//   item.checked = false;

  if (player1.hp === 0 || player2.hp === 0) {
    $formFight.style.display = 'none';
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
  }

  player1.changeHP(getRandom(attack.value));
  player2.changeHP(getRandom(attack.value));

  console.log('###: a', attack);
  console.log('###: e', enemy);
}
const playerWins = (name) => {
  const $loseWin = createElement('div', 'loseTitle');
  if (name) {
    $loseWin.innerText = name + ' win';
  } else {
    $loseWin.innerText = 'Draw';
  }
  return $loseWin;
};

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

$formFight.addEventListener('submit', function (e) {
  e.preventDefault();
  round();
});
