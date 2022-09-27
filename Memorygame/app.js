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
  if(cardChosenNames.length < 2){
    let cardId =  this.getAttribute("data-id")

    this.classList.remove('show-card-contain-part1')
    this.classList.remove('show-card-contain-part2')
    this.classList.remove('turn-card-back-part1')
    this.classList.remove('turn-card-back-part2')

    cardChosenNames.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    
    if(cardChosenNames.length === 2){
      setTimeout(checkMatch, 300);
    }
    else
    {
      turnCardFace(this, cardArray[cardId].img)
    }
  }
}

function checkMatch(){
  const cards = document.querySelectorAll('.grid img')
  const option1Id = cardsChosenIds[0]
  const option2Id = cardsChosenIds[1]
  cards[option1Id].classList.remove('show-card-contain-part1')
  cards[option1Id].classList.remove('show-card-contain-part2')

  if(option1Id === option2Id){
    // You clicked the same image
    turnCardBack(cards[option1Id])
  }
  else
  {
    turnCardFace(cards[option2Id], cardArray[option2Id].img)
    if(cardChosenNames[0] == cardChosenNames[1]){
      scoreCounter++
      // You found a match !
      setTimeout(()=>{
        cards[option1Id].classList.add('card-hidden')
        cards[option2Id].classList.add('card-hidden')
        cards[option1Id].removeEventListener('click',flipCard)
        cards[option2Id].removeEventListener('click',flipCard)
      },550);
    }
    else{
      setTimeout(()=>{
        turnCardBack(cards[option1Id])
        turnCardBack(cards[option2Id])
      },500); 
    }
    
    setTimeout(() => {
      cards[option2Id].classList.remove('show-card-contain-part1')
      cards[option2Id].classList.remove('show-card-contain-part2')
    }, 400);
    
  }

  scoreDisplay.textContent = scoreCounter

  if(scoreCounter == (cardArray.length)/2){
    displayMessage()
  }

  cardChosenNames = []
  cardsChosenIds = []
}

function turnCardFace(card,image_path){
  card.classList.add('show-card-contain-part1');
  card.addEventListener("animationend", () => {
    card.setAttribute('src', image_path);
    card.classList.add('show-card-contain-part2');
  },{once : true});
}

function turnCardBack(card){
  card.classList.add('turn-card-back-part1');
  card.addEventListener("animationend", () => {
    card.setAttribute('src','images/blank.png');
    card.classList.add('turn-card-back-part2');
  },{once : true});
}

function playAgain(){
  if(!messageDisplay.classList.contains('discovered-message')){
    cardChosenNames = []
    cardsChosenIds = []
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