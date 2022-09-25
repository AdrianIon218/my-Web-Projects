const scoreDisplay = document.querySelector('#score')
const gridDisplay = document.querySelector('.grid')
const messageDisplay = document.querySelector('.final-message')
const menuButtons = document.querySelectorAll('.menu-btn')

let scoreCounter = 0
let cardChosenNames = []
let cardsChosenIds = []

const cardArray = [
  {
    name: 'fries',
    img: 'images/fries.jpeg'
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png'
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png'
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.jpeg'
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png'
  },
  {
    name: 'pizza',
    img: 'images/pizza.png'
  },
  {
    name: 'fries',
    img: 'images/fries.jpeg'
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png'
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png'
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.jpeg'
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png'
  },
  {
    name: 'pizza',
    img: 'images/pizza.png'
  }
]

cardArray.sort(() => 0.5 - Math.random())

createBoard()

function createBoard(){
  for(let i=0;i < cardArray.length;i++ ){
    const card = document.createElement('img')
    card.setAttribute('src','images/blank.png')
    card.setAttribute('data-id',i)
    card.setAttribute('draggable',false)
    card.classList.add('card')
    card.addEventListener('click',flipCard)
    gridDisplay.appendChild(card)
  }
}

function flipCard(){
  let cardId =  this.getAttribute("data-id")
  cardChosenNames.push(cardArray[cardId].name)
  cardsChosenIds.push(cardId)
  this.setAttribute('src',cardArray[cardId].img)
  if(cardChosenNames.length === 2){
    setTimeout(checkMatch, 400);
  }
}

function checkMatch(){
  const cards = document.querySelectorAll('.grid img')
  const option1Id = cardsChosenIds[0]
  const option2Id = cardsChosenIds[1]

  if(option1Id === option2Id){
    // You clicked the same image
    cards[option1Id].setAttribute('src','images/blank.png')
  }
  else if(cardChosenNames[0] == cardChosenNames[1]){
    // You found a match !
    cards[cardsChosenIds[0]].classList.add('card-hidden')
    cards[cardsChosenIds[1]].classList.add('card-hidden')
    cards[cardsChosenIds[0]].removeEventListener('click',flipCard)
    cards[cardsChosenIds[1]].removeEventListener('click',flipCard)
    scoreCounter++
  }
  else{
    cards[option1Id].setAttribute('src','images/blank.png')
    cards[option2Id].setAttribute('src','images/blank.png')
  }

  scoreDisplay.textContent = scoreCounter

  if(scoreCounter == (cardArray.length)/2){
    displayMessage()
  }

  cardChosenNames = []
  cardsChosenIds = []
}

function playAgain(){
  if(!messageDisplay.classList.contains('discovered-message')){
    scoreDisplay.textContent = scoreCounter = 0
    const cards = document.querySelectorAll('.grid img')
    cards.forEach(card => {
      gridDisplay.removeChild(card)
    });
    cardArray.sort(() => 0.5 - Math.random())
    createBoard()
  }
}

function changePage(page){
  if(!messageDisplay.classList.contains('discovered-message'))
  {
    location.href = page
  }
}

function displayMessage(){
  messageDisplay.classList.add('discovered-message')
  menuButtons.forEach(btn => btn.classList.add('menu-btn-no-action') )
}

function closeMessage(){
  messageDisplay.classList.remove('discovered-message')
  menuButtons.forEach(btn => btn.classList.remove('menu-btn-no-action'))
}