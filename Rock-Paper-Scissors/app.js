// Model section
const title = document.querySelector('.instruction')
const possibleChoices = document.querySelectorAll('.card')
const panel = document.querySelector('.panel')
const circle = document.querySelector('.circle')

let userChoice 
let computerChoice
let iscardchosen = false

function generateComputerChoice(){
  let imagepath
  const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1
  circle.classList.add('loading_spinner')
  if(randomNumber == 1){
    computerChoice = 'rock'
    imagepath = 'images/rock.jpeg'
  }
  if(randomNumber == 2){
    computerChoice = 'scissors'
    imagepath = 'images/scissors.png'
  }
  if(randomNumber == 3){
    computerChoice = 'paper'
    imagepath = 'images/paper.jpeg'
  }
  circle.addEventListener("animationend",()=>{
    circle.classList.remove('loading_spinner')
    circle.style.setProperty('background-image', 'url('+imagepath+')')
    circle.classList.add('loading_image')
    circle.addEventListener("animationend",()=>{
      getResult()
    },{once:true})
  },{once:true})
}

// View section
function setTitle(result){
  switch(result){
    case 'win':
      panel.style.setProperty('border-color','lightgreen')
      title.classList.add('win-game')
      title.textContent = 'You won ! '
      title.innerHTML +='<span class="emoji">&#128522;</span>'
      break;
    case 'lose':
      panel.style.setProperty('border-color','red')
      title.classList.add('lose-game')
      title.innerHTML = 'You lose ! '
      title.innerHTML +='<span class="emoji">&#128580;</span>'
      break;
    case 'draw':
      panel.style.setProperty('border-color','darkblue')
      title.classList.add('draw-game')
      title.innerHTML = 'It\'s a draw ! ' 
      title.innerHTML +='<span class="emoji">&#128521;</span>'
      break
  }
}

function resetGame(){
  panel.style.setProperty('border-color','gray')
  iscardchosen = false;
  possibleChoices.forEach(possibleChoice => {
    possibleChoice.classList.remove('card_chosen')
    possibleChoice.classList.remove('card_block')
  })
  title.classList.remove('win-game')
  title.classList.remove('lose-game')
  title.classList.remove('draw-game')
  title.textContent = 'Choose a card '
  title.innerHTML += '<span class="emoji">&#129488;</span>'
  circle.classList.remove('loading_image')
  circle.style.setProperty('background-image','none')
}

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

// Controllers section
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e)=>{
  if(!iscardchosen){
    userChoice = e.target.id
    generateComputerChoice()
    setFocus(possibleChoice)
    iscardchosen = true
  }
}))

function getResult(){
  if(computerChoice === userChoice){
    setTitle('draw')
  }
  else{
    if((computerChoice === 'rock' && userChoice ==='paper') ||
      (computerChoice === 'paper' && userChoice ==='scissors') ||
      (computerChoice === 'scissors' && userChoice ==='rock')
      ){
        setTitle('win')
      } 
    else {
      if((computerChoice === 'rock' && userChoice ==='scissors') ||
        (computerChoice === 'paper' && userChoice ==='rock') ||
        (computerChoice === 'scissors' && userChoice ==='paper'))
        {
          setTitle('lose')
        }
    }
  }
}

function changePage(page){
  location.href = page
}
