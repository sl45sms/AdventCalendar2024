const fs = require('fs');
const brain = require('brain.js');


// Function to normalize arrays
function normalize(array, length) {
    const max = Math.max(...array);
    const min = Math.min(...array);
    let normalized = array.map(num => {
        if (max === min) {
            return 0;
        }
        return (num - min) / (max - min);
    });
    // Pad the array to the desired length if necessary
    while (normalized.length < length) {
        normalized.push(0);
    }
    return normalized;
}

// Define the desired input length
const inputLength = 8;

const net = new brain.NeuralNetwork();
//load the trained model model.json
const model = fs.readFileSync('model.json', 'utf8');
net.fromJSON(JSON.parse(model));


const testInput =[
[7, 6, 4, 2, 1],
[1, 2, 7, 8, 9],
[9, 7, 6, 2, 1],
[1, 3, 2, 4, 5],
[8, 6, 4, 4, 1],
[1, 3, 6, 7, 9]
]

//run on each test input
const output = testInput.map(input => {
    const normalized = normalize(input, inputLength);
    return {
        input: input,
        normalized: normalized,
        output: net.run(normalized)
    };
});


/*
const input = normalize([70, 68, 75, 77, 80, 81, 84], inputLength);

const output = net.run(input);
*/
//read the file "input.txt" and parse it
//input.txt contains a list of numbers separated by space

const input = fs.readFileSync('input', 'utf8').split('\n').map(line => {
    const parts = line.split(' ').map(Number);
    return parts;
}
);

//run on each input
const output2 = input.map(input => {
    const normalized = normalize(input, inputLength);
    return {
        input: input,
        normalized: normalized,
        output: net.run(normalized)
    };
});

//now on count on output2 how many are safe and how many are unsafe
let safe = 0;
let unsafe = 0;
output2.forEach(element => {
    if (element.output.Safe > element.output.Unsafe) {
        safe++;
    } else {
        unsafe++;
    }
});

console.log(`Safe: ${safe}, Unsafe: ${unsafe}`);
