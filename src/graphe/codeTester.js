var downTab = []
var upTab = []
var firstTab = [
  ['up', 'down', 'down', 'up'],
  ['up', 'down', 'up', 'down'],
  ['down', 'up', 'down', 'down'],
  ['up', 'up', 'down', 'up'],
]
var categories = []

firstTab.map((element, i) => {
  element.map((subelement, index) => {
    if (upTab[index] == undefined) {
      upTab.push(0)
      categories.push(index)
    }
    if (downTab[index] == undefined) {
      downTab.push(0)
    }
    if (subelement == 'up') {
      upTab[index] += 1
    } else {
      downTab[index] += 1
    }
  })
})
console.log(upTab)
console.log(downTab)
console.log(categories)
