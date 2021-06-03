
const player1 = {
	name: 'Scorpion',
	hp: '70%',
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['knife'],
	attack: function(){
		console.log(this.name + 'fight...');
	}
}
const player2 = {
	name: 'Sonya',
	hp: '50%',
	img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
	weapon: ['knife'],
	attack: function(){
		console.log(this.name + 'fight...');
	}
}

const $arenas = document.querySelector('.arena1')

function createPlayer(play){
	const player = document.createElement('div');	
	if(play.name === 'Sonya') {
		player.classList.add('player2')
	} player.classList.add('player1')

	const progressbar = document.createElement('div');
	progressbar.classList.add('progressbar')
	player.appendChild(progressbar)
	const life = document.createElement('div')
	life.classList.add('life')
	life.style.width = play.hp
	progressbar.appendChild(life)
	const name = document.createElement('div')
	name.classList.add('name')
	name.innerText = play.name
	progressbar.appendChild(name)

	const character = document.createElement('div');
	character.classList.add('character')
	player.appendChild(character)
	const $img = document.createElement('img')
	$img.src = play.img;
	character.appendChild($img)

	$arenas.appendChild(player)
}

createPlayer(player1)
createPlayer(player2)
