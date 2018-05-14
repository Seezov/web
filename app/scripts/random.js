function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function myMove () {
  let elem = document.getElementById('moving-block')
  let over = false
  frame()
  elem.onmouseover = () => {
    over = true
  }
  elem.onmouseout = () => {
    over = false
    frame()
  }

  function frame () {
    if (over) {
      return
    }
    elem.style.top = getRandom(0, window.innerHeight - 30) + 'px'
    elem.style.left = getRandom(0, window.innerWidth - 30) + 'px'
    setTimeout(frame, 800)
  }
}

myMove()
