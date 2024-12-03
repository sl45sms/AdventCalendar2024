//Test
let tstr = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
let regex = /mul\((\d+),(\d+)\)/g;
let tresult = tstr.match(regex);
let arr = [];
for (let i = 0; i < tresult.length; i++) {
    let temp = tresult[i].match(/\d+/g);
    temp = temp[0] * temp[1];
    arr.push(temp);
}

let sum = arr.reduce((a, b) => a + b, 0);
console.log("Test Sum", sum);

const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'input')
const str = fs.readFileSync(filePath, 'utf8')
let result = str.match(regex);

let arr2 = [];
for (let i = 0; i < result.length; i++) {
    let temp = result[i].match(/\d+/g);
    temp = temp[0] * temp[1];
    arr2.push(temp);
}
let sum2 = arr2.reduce((a, b) => a + b, 0);
console.log("Sum", sum2) 

let regex2 = /mul\((\d+),(\d+)\)|do\(\)|don\'t\(\)/g;
let result2 = str.match(regex2);
console.log(result2.join(" "));

let arr3 = [];
let ignore = false;
for (let i = 0; i < result2.length; i++) {
    if (result2[i].includes("do()")) {
        ignore = false;
    } else if (result2[i].includes("don't()")) {
        ignore = true;
    } else if (!ignore) {
        let temp = result2[i].match(/\d+/g);
        temp = temp[0] * temp[1];
        arr3.push(temp);
    }
}
let sum3 = arr3.reduce((a, b) => a + b, 0);
console.log("Sum do", sum3)
