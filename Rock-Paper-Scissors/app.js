const computerChoiceDisplay = document.getElementById('computer-choice')
const title = document.querySelector('.instruction')
const possibleChoices = document.querySelectorAll('.card')
let userChoice 
let computerChoice
let iscardchosen = false

const winMessage = 'You won ! '
const loseMessage = 'You lose ! '
const drawMessage = 'It\'s a draw ! '

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e)=>{
  if(!iscardchosen){
    userChoice = e.target.id
    generateComputerChoice()
    getResult()
    setFocus(possibleChoice)
    iscardchosen = true
  }
}))

function setFocus(cardChosen){
  possibleChoices.forEach(possibleChoice => {
    possibleChoice.classList.remove('card_chosen')
    if(possibleChoice !== cardChosen){
      possibleChoice.classList.add('card_block')
    }
    }
  )
  cardChosen.classList.add('card_chosen')
}

function generateComputerChoice(){
  const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1
  if(randomNumber == 1){
    computerChoice = "rock"
    computerChoiceDisplay.setAttribute('src','images/rock.jpeg')
  }
  if(randomNumber == 2){
    computerChoice = 'scissors'
    computerChoiceDisplay.setAttribute('src','images/scissors.png')
  }
  if(randomNumber == 3){
    computerChoice = 'paper'
    computerChoiceDisplay.setAttribute('src','images/paper.jpeg')
  }
  computerChoiceDisplay.style.visibility = "visible"
  computerChoiceDisplay.innerHTML = computerChoice
}

function getResult(){
  if(computerChoice==userChoice){
    title.innerHTML = drawMessage 
    title.innerHTML +='<span class="emoji">&#128521;</span>'
  }
  if(computerChoice == 'rock' && userChoice=='paper'){
    title.textContent  = winMessage
    title.innerHTML +='<span class="emoji">&#128522;</span>'
  } 
  if(computerChoice == 'rock' && userChoice=='scissors'){
    title.innerHTML = loseMessage
    title.innerHTML +='<span class="emoji">&#128580;</span>'
  } 
  if(computerChoice == 'paper' && userChoice=='scissors'){
    title.innerHTML = winMessage
    title.innerHTML +='<span class="emoji">&#128522;</span>'
  } 
  if(computerChoice == 'paper' && userChoice=='rock'){
    title.innerHTML = loseMessage
    title.innerHTML +='<span class="emoji">&#128580;</span>'
  } 
  if(computerChoice == 'scissors' && userChoice=='paper'){
    title.innerHTML = loseMessage
    title.innerHTML +='<span class="emoji">&#128580;</span>'
  } 
  if(computerChoice == 'scissors' && userChoice=='rock'){
    title.innerHTML = winMessage
    title.innerHTML +='<span class="emoji">&#128522;</span>'
  } 
}

function playAgain(){
  iscardchosen = false;
  possibleChoices.forEach(possibleChoice => {
    possibleChoice.classList.remove('card_chosen')
    possibleChoice.classList.remove('card_block')
  })
  title.textContent = 'Choose a card '
  title.innerHTML += '<span class="emoji">&#129488;</span>'
  computerChoiceDisplay.style.visibility = "hidden"
}

function changePage(page){
  location.href = page
}