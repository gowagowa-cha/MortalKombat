const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: '100',
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['knife'],
	attack: function(name){
		console.log(name + 'fight...');
	},
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP
}
const player2 = {
	player: 2,
	name: 'Sonya',
	hp: '100',
	img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
	weapon: ['knife'],
	attack: function(name){
		console.log(name + 'fight...');
	},
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP
}


const createElement = (teg, classname) => {
	const $teg = document.createElement(teg)
	if(classname) {
		$teg.classList.add(classname)
	}
	return $teg
}

function createPlayer(play){
	const $player = createElement('div', 'player'+play.player)	
	const $progressbar = createElement('div', 'progressbar')	
	const $character = createElement('div', 'character')	
	const $life = createElement('div', 'life')	
	const $name = createElement('div', 'name')	
	const $img = createElement('img')	

	$life.style.width = play.hp +'%';
	$name.innerText = play.name;
	$img.src = play.img;

	$player.appendChild($progressbar);
	$player.appendChild($character);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img);

	return $player
}


function getRandom(num) {
	return Math.ceil(Math.random() * num)
}

// Функция отображения здоровья
function renderHP() {
	this.elHP().style.width = this.hp + '%';
}

// Функция выбора персонажа
function elHP() {
	return document.querySelector('.player'+ this.player +' .life');
}
// Функция изменения здоровья
function changeHP(num) {
	this.hp -= num;
	if(this.hp <= 0) {
		this.hp = 0;
	}
	 return this.hp
}

// создаем кнопку
function createReloadButton() {
	const $reloadWrap = createElement('div', 'reloadWrap')
	const $btn = createElement('button', 'button')
	$btn.innerText = 'Restart';
	$btn.addEventListener('click', () => {
		window.location.reload()
	})
	$reloadWrap.appendChild($btn)
	$arenas.appendChild($reloadWrap);
	return $reloadWrap
}

$randomButton.addEventListener('click', function() {
	player1.changeHP(getRandom(20))
	player2.changeHP(getRandom(20))
	player1.renderHP(elHP())
	player2.renderHP(elHP())

	
	if(player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
		$arenas.appendChild(createReloadButton())	
	}


	if(player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name))
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name))
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(playerWins())
	}

})

const playerWins = (name) => {
	const $loseWin = createElement('div', 'loseTitle')
	if (name) {
		$loseWin.innerText = name + ' win';
	} else {
		$loseWin.innerText = 'Draw'
	}
	return $loseWin
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

