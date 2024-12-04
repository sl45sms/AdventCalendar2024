const fs = require('fs');

// Read the input file and split it into lines
const inputLines = fs.readFileSync('input', 'utf8').split('\n').map(line => line.trim());

// Determine the dimensions of the grid
const wordsY = inputLines.length;
const wordsX = inputLines[0].length;

// Create a 2D array of characters
const input = inputLines.map(line => line.split(''));

// Replace any character that is not 'X', 'M', 'A', or 'S' with a space
for (let y = 0; y < wordsY; y++) {
  for (let x = 0; x < wordsX; x++) {
    if (!['X', 'M', 'A', 'S'].includes(input[y][x])) {
      input[y][x] = ' ';
    }
  }
}

let xmas = 0;
let samx = 0;

// Function to count occurrences of a word in a line
function countOccurrences(line, word) {
  const regex = new RegExp(word, 'g');
  return (line.match(regex) || []).length;
}

// Scan horizontally
for (let y = 0; y < wordsY; y++) {
  const line = input[y].join('').replace(/\s/g, '');
  xmas += countOccurrences(line, 'XMAS');
  samx += countOccurrences(line, 'SAMX');
}

// Scan vertically
for (let x = 0; x < wordsX; x++) {
  let line = '';
  for (let y = 0; y < wordsY; y++) {
    line += input[y][x];
  }
  line = line.replace(/\s/g, '');
  xmas += countOccurrences(line, 'XMAS');
  samx += countOccurrences(line, 'SAMX');
}

// Function to get all diagonals from the grid
function getAllDiagonals(grid) {
  const height = grid.length;
  const width = grid[0].length;
  const result = [];

  // Top-left to bottom-right diagonals
  for (let k = 0; k <= height + width - 2; k++) {
    let line = '';
    for (let y = 0; y <= k && y < height; y++) {
      const x = k - y;
      if (x < width) {
        line += grid[y][x];
      }
    }
    line = line.replace(/\s/g, '');
    result.push(line);
  }

  // Top-right to bottom-left diagonals
  for (let k = -width + 1; k < height; k++) {
    let line = '';
    for (let y = 0; y < height; y++) {
      const x = y - k;
      if (x >= 0 && x < width) {
        line += grid[y][x];
      }
    }
    line = line.replace(/\s/g, '');
    result.push(line);
  }

  return result;
}

// Scan diagonally
const diagonals = getAllDiagonals(input);
diagonals.forEach(line => {
  xmas += countOccurrences(line, 'XMAS');
  samx += countOccurrences(line, 'SAMX');
});

console.log(`XMAS: ${xmas}, SAMX: ${samx}, Total: ${xmas + samx}`);