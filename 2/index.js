const fs = require('fs');
const brain = require('brain.js');
const net = new brain.NeuralNetwork();

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

//import data.txt and parse it as trainingData 
//data.txt contains a list of numbers separated by space and a comma, followed by the "Safe" or "Unsafe" label
const trainingData = fs.readFileSync('data.txt', 'utf8').split('\n').map(line => {
    const parts = line.split(',');
    const input = parts[0].split(' ').map(Number);
    const output = parts[1].trim();
    return {
        input: normalize(input, inputLength),
        output: { [output]: 1 }
    };
});
/*
const trainingData = [
    { input: normalize([44, 47, 50, 51, 53, 54, 53], inputLength), output: { Unsafe: 1 } },
    { input: normalize([70, 73, 75, 77, 80, 81, 84], inputLength), output: { Unsafe: 1 } },
    { input: normalize([1, 3, 4, 7, 10, 13, 16], inputLength), output: { Safe: 1 } },
    { input: normalize([47, 49, 52, 53, 55, 57, 60], inputLength), output: { Safe: 1 } },
    { input: normalize([69, 70, 71, 70, 71], inputLength), output: { Unsafe: 1 } }, // This will be padded
    { input: normalize([22, 23, 20, 21, 24, 27, 24], inputLength), output: { Unsafe: 1 } }
];
*/

net.train(trainingData);

const input = normalize([70, 68, 75, 77, 80, 81, 84], inputLength);

const output = net.run(input);
console.log(output);