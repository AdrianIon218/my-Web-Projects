const finalMessage = document.querySelector('.message-hidden')
const messageText = document.querySelector('.message-text')
const emoji = document.querySelector('.emoji')
const closeBtn = document.querySelector('.message-close-btn')

const timeLeftDisplay = document.querySelector('#time-left')

const startButton = document.querySelector("#start-btn")
const pauseButton = document.querySelector("#pause-btn")
const restartButton = document.querySelector("#restart-btn")

const squares = document.querySelectorAll(".grid div")
const logsleft = document.querySelectorAll(".log-left")
const logsright = document.querySelectorAll(".log-right")
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll(".car-right")

const helpPanelDisplay = document.querySelector('.help-panel')

let currentIndex = 85
const rowWidth = 9
const rowNum = 10
let timerId
let currentTime = 20
let outcomeTimerId

let isPause = true
let wasMessageShown = false

function moveFrog(e){
  if(isPause === false){
    squares[currentIndex].classList.remove('frog-position')
    switch(e.key){
      case "ArrowLeft":
        if(currentIndex % rowWidth !==0) currentIndex--
      break
      case "ArrowRight":
        if(currentIndex % rowWidth < rowWidth-1)currentIndex+=1
      break
      case "ArrowUp":
        if(currentIndex - rowWidth >=0)currentIndex-=rowWidth
      break
      case "ArrowDown":
        if(currentIndex + rowWidth <= rowWidth*rowNum)currentIndex+=rowWidth
      break
  }
  squares[currentIndex].classList.add('frog-position')
  }
}

function moveByArrows(arrowName){
  if(isPause === false && wasMessageShown === false){
    squares[currentIndex].classList.remove('frog-position')
    switch(arrowName){
      case "ArrowLeft":
        if(currentIndex % rowWidth !==0) currentIndex--
      break
      case "ArrowRight":
        if(currentIndex % rowWidth < rowWidth-1)currentIndex+=1
      break
      case "ArrowUp":
        if(currentIndex - rowWidth >=0)currentIndex-=rowWidth
      break
      case "ArrowDown":
        if(currentIndex + rowWidth <= rowWidth*rowNum)currentIndex+=rowWidth
      break
  }
  squares[currentIndex].classList.add('frog-position')
  }
}

startButton.addEventListener(
  'click', () => {
    if(!startButton.classList.contains('unavailable-btn')){
      timerId = setInterval(autoMoveElements, 1000)
      outcomeTimerId = setInterval(checkaOutcomes, 50)
      document.addEventListener('keyup',moveFrog)
      pauseButton.classList.remove('unavailable-btn')
      restartButton.classList.remove('unavailable-btn')
      startButton.classList.add('unavailable-btn')
      isPause = false
    }
  }
)

function autoMoveElements(){
  if(currentTime >0 && isPause === false){
    currentTime--
    timeLeftDisplay.textContent = currentTime
    logsleft.forEach(logleft => moveLogLeft(logleft))
    logsright.forEach(logright => moveLogRight(logright))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
  }
}

function checkaOutcomes(){
  lose()
  win()
}

function lose(){
  if((wasMessageShown === false) &&
    (
      squares[currentIndex].classList.contains('c1') ||
      squares[currentIndex].classList.contains('l4') ||
      squares[currentIndex].classList.contains('l5') ||
      currentTime <= 0
    )
  ){
    clearInterval(timerId)
    clearInterval(checkaOutcomes)
    squares[currentIndex].classList.remove('frog')
    document.removeEventListener('keyup', moveFrog)
    showMessage(false)
  }
}

function win(){
  if((wasMessageShown === false) &&
    squares[currentIndex].classList.contains("ending-block"))
  {
    clearInterval(timerId)
    clearInterval(checkaOutcomes)
    document.removeEventListener('keyup', moveFrog)
    showMessage(true)
  }
}

function showMessage(wonGame){
  pauseButton.classList.add('unavailable-btn')
  restartButton.classList.add('unavailable-btn')
  wasMessageShown = true

  if(wonGame === true){
    finalMessage.classList.add('message-win')
    messageText.textContent = 'You won !'
    emoji.innerHTML=  '&#128516;'
    closeBtn.classList.add('message-close-btn-win')
  }
  else{
    finalMessage.classList.add('message-lose')
    messageText.textContent = 'Game over !'
    emoji.innerHTML = '&#128580;'
    closeBtn.classList.add('message-close-btn-lose')
  }

  clearGeneralEvents()
}

function closeMessage(){
  restartButton.classList.remove('unavailable-btn')
  finalMessage.classList.remove('message-win')
  finalMessage.classList.remove('message-lose')
  messageText.textContent = ''
  emoji.innerHTML = ''
  closeBtn.classList.remove('message-close-btn-lose')
}

function clearGeneralEvents(){
  if(timerId){
    clearInterval(timerId)
    clearInterval(outcomeTimerId)
    timerId = null
    outcomeTimerId = null
    document.removeEventListener('keyup',moveFrog)
  }
}

function moveLogLeft(logleft){
  switch(true){
    case logleft.classList.contains('l1'):
      logleft.classList.remove('l1')
      logleft.classList.add('l2')
      break

    case logleft.classList.contains('l2'):
        logleft.classList.remove('l2')
        logleft.classList.add('l3')
        break

    case logleft.classList.contains('l3'):
        logleft.classList.remove('l3')
        logleft.classList.add('l4')
        break         
    
    case logleft.classList.contains('l4'):
          logleft.classList.remove('l4')
          logleft.classList.add('l5')
          break 
    
    case logleft.classList.contains('l5'):
        logleft.classList.remove('l5')
        logleft.classList.add('l1')
        break 
  }
}

function moveLogRight(logRight){
  switch(true){
    case logRight.classList.contains('l1'):
      logRight.classList.remove('l1')
      logRight.classList.add('l5')
      break

    case logRight.classList.contains('l2'):
      logRight.classList.remove('l2')
      logRight.classList.add('l1')
      break

    case logRight.classList.contains('l3'):
      logRight.classList.remove('l3')
      logRight.classList.add('l2')
      break         
    
    case logRight.classList.contains('l4'):
      logRight.classList.remove('l4')
      logRight.classList.add('l3')
      break 
    
    case logRight.classList.contains('l5'):
      logRight.classList.remove('l5')
      logRight.classList.add('l4')
    break 
  }
}

function moveCarLeft(carleft){
  switch(true){
    case carleft.classList.contains('c1'):
      carleft.classList.remove('c1')
      carleft.classList.add('c2')
      break

    case carleft.classList.contains('c2'):
      carleft.classList.remove('c2')
      carleft.classList.add('c3')
      break

    case carleft.classList.contains('c3'):
      carleft.classList.remove('c3')
      carleft.classList.add('c1')
      break 
  }
}

function moveCarRight(carRight){
  switch(true){
    case carRight.classList.contains('c1'):
      carRight.classList.remove('c1')
      carRight.classList.add('c3')
      break

    case carRight.classList.contains('c2'):
      carRight.classList.remove('c2')
      carRight.classList.add('c1')
      break

    case carRight.classList.contains('c3'):
      carRight.classList.remove('c3')
      carRight.classList.add('c2')
      break      
  }
}

pauseButton.addEventListener(
  'click', () =>{
    if(!pauseButton.classList.contains('unavailable-btn')){
      if(!pauseButton.classList.contains('pressed-btn')){
        isPause = true
        pauseButton.classList.add('pressed-btn')
      }
      else{
        isPause = false
        pauseButton.classList.remove('pressed-btn')
      }
    }
  }
)

restartButton.addEventListener(
  'click', () =>{
    if(!restartButton.classList.contains('unavailable-btn')){
      clearGeneralEvents()
      wasMessageShown = false
      isPause = true
      currentTime = 20
      timeLeftDisplay.textContent = currentTime

      squares[currentIndex].classList.remove('frog-position')
      currentIndex = 85
      squares[currentIndex].classList.add('frog-position')
      
      startButton.classList.remove('unavailable-btn')
      pauseButton.classList.remove('pressed-btn')
      pauseButton.classList.add('unavailable-btn')      
      restartButton.classList.add('unavailable-btn')
    }
  }
)

function changePage(page){
  location.href = page
}

function closeHelpPanel(){
  helpPanelDisplay.classList.add('help-panel-hide')
  helpPanelDisplay.addEventListener('animationend',()=>{
    helpPanelDisplay.classList.remove('help-panel-shown')
    helpPanelDisplay.classList.remove('help-panel-hide')
    if(!pauseButton.classList.contains('pressed-btn')){
      isPause = false
    }
  },{once:true})
}

function showHelpPanel(){
  helpPanelDisplay.classList.add('help-panel-shown')
  isPause = true
}


