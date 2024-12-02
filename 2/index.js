//Test
const tl1 = [3,4,2,1,3,3]
const tl2 = [4,3,5,3,9,3]
const tl3 = tl1.map((num, i) => num * tl2.filter(n => n === num).length)
const tsum = tl3.reduce((acc, num) => acc + num, 0)
console.log("Test Similarity",tsum)

const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input')
const data = fs.readFileSync(filePath, 'utf8')
const lines = data.split('\n')
const arr1 = lines.map(line => parseInt(line.split('   ')[0]))
const arr2 = lines.map(line => parseInt(line.split('   ')[1]))
const arr3 = arr1.map((num, i) => num * arr2.filter(n => n === num).length)
const sum = arr3.reduce((acc, num) => acc + num, 0)
console.log("Similarity",sum)
