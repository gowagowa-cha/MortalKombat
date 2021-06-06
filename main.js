const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button')

const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: '100',
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['knife'],
	attack: function(name){
		console.log(name + 'fight...');
	}
}
const player2 = {
	player: 2,
	name: 'Sonya',
	hp: '100',
	img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
	weapon: ['knife'],
	attack: function(name){
		console.log(name + 'fight...');
	}
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

function randomHP(min, max) {
	const randomNum = min + Math.random() * (max + 1 - min);
	console.log(Math.round(randomNum));
	return Math.round(randomNum)
	
}

function changeHP(player) {
	const $playerLife = document.querySelector('.player'+ player.player +' .life');
	player.hp -= randomHP(1, 20);
	$playerLife.style.width = player.hp + '%'
	console.log('####', player.hp);

	if(player.hp <= 0) {
		player.hp = 0;
		$playerLife.style.width = `${0}%`
		$arenas.appendChild(playerLose(player.name))
		$randomButton.style.display = 'none'
	}
}

$randomButton.addEventListener('click', function() {
	changeHP(player1)
	changeHP(player2)

})

const playerLose = (name) => {
	const $loseTitle = createElement('div', 'loseTitle')
	$loseTitle.innerText = name + ' Lose';
	return $loseTitle
}
const playerWin = (name) => {
	const $loseTitle = createElement('div', 'loseTitle')
	$loseTitle.innerText = name + ' win';
	return $loseTitle
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

