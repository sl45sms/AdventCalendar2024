//Test
let str = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
let regex = /mul\((\d+),(\d+)\)/g;
let result = str.match(regex);
let arr = [];
for (let i = 0; i < result.length; i++) {
    let temp = result[i].match(/\d+/g);
    temp = temp[0] * temp[1];
    arr.push(temp);
}

let sum = arr.reduce((a, b) => a + b, 0);
console.log(sum);
