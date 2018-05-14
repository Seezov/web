function parseLine () {
   let str = lineToParse.value
   if (str.length % 2) {
     str += '_'
   }
   str = str.split(/(\w{2})/g).filter(function (el) {
     return el.length !== 0
   })
   let lineToAdd = ''
   str.map(item => {
     lineToAdd += `<li>${item}</li>`
   })
   ulContainer.innerHTML = lineToAdd
}
