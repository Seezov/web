function checkOnLetters (name) {
  let value = name.value.match(/^[A-Za-zА-Яа-я]+$/) ? true : false
  applyStyles(value, name)
  // if (!name.value.match(/^[A-Za-zА-Яа-я]+$/)) {
  //   name.classList = 'form-control is-invalid'
  // } else {
  //   name.classList = 'form-control is-valid'
  // }
}

function checkIndex () {
  let value = address.value.length === 5
  applyStyles(value, address)
  // if (address.value.length === 5) {
  //   address.classList = 'form-control is-valid'
  // } else {
  //   address.classList = 'form-control is-invalid'
  // }
}

function checkEmail () {
  let value = email.value.match('@') ? true : false
  applyStyles(value, email)
  // if (!email.value.match('@')) {
  //   email.classList = 'form-control is-invalid'
  // } else{
  //   email.classList = 'form-control is-valid'
  // }
}

function applyStyles (value, style) {
  console.log('value', value)
  if (value) {
    style.classList = 'form-control is-valid'
  } else {
    style.classList = 'form-control is-invalid'
  }
}
