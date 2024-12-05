//create random data for training
/*
Each row is a list of numbers called levels that are separated by spaces and a statement Safe or Unsafe.

For example:
7 6 4 2 1 Safe
1 2 7 8 9 Unsafe
9 7 6 2 1 Unsafe
1 3 2 4 5 Unsafe
8 6 4 4 1 Unsafe
1 3 6 7 9 Safe

The levels are either all increasing or all decreasing.
Any two adjacent levels differ by at least one and at most three.
In the example above, the reports can be found safe or unsafe by checking those rules:

7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.
1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.
*/ 
const fs = require('fs');

function generateLevels(isIncreasing, length) {
    let levels = [];
    let level;

    // Start level between 10 and 90 to prevent going out of bounds
    level = Math.floor(Math.random() * 80) + 10;
    levels.push(level);

    for (let i = 1; i < length; i++) {
        let change = Math.floor(Math.random() * 3) + 1; // Change of 1 to 3

        if (isIncreasing) {
            level += change;
            if (level > 99) level = 99;
        } else {
            level -= change;
            if (level < 1) level = 1;
        }

        // Ensure that adjacent levels are not equal
        if (level === levels[levels.length - 1]) {
            level += isIncreasing ? 1 : -1;
            if (level < 1) level = 1;
            if (level > 99) level = 99;
        }

        levels.push(level);
    }

    return levels;
}

function generateUnsafeLevels(length) {
    let levels = [];
    let level = Math.floor(Math.random() * 80) + 10;
    levels.push(level);

    let direction = null; // null, 'increasing', or 'decreasing'

    for (let i = 1; i < length; i++) {
        const violationType = Math.random();

        if (violationType < 0.33) {
            // **Violation 1:** Equal adjacent levels
            // Keep the same level
            levels.push(level);
        } else if (violationType < 0.66) {
            // **Violation 2:** Large difference (>3)
            let change = Math.floor(Math.random() * 5) + 4; // Change of 4 to 8
            if (Math.random() > 0.5) {
                level += change;
            } else {
                level -= change;
            }
            if (level < 1) level = 1;
            if (level > 99) level = 99;
            levels.push(level);
        } else {
            // **Violation 3:** Change direction
            let change = Math.floor(Math.random() * 3) + 1; // Change of 1 to 3

            // Randomly decide to switch direction
            if (direction === 'increasing') {
                level -= change;
                direction = 'decreasing';
            } else if (direction === 'decreasing') {
                level += change;
                direction = 'increasing';
            } else {
                // First step, randomly choose direction
                if (Math.random() > 0.5) {
                    level += change;
                    direction = 'increasing';
                } else {
                    level -= change;
                    direction = 'decreasing';
                }
            }

            if (level < 1) level = 1;
            if (level > 99) level = 99;
            levels.push(level);
        }
    }

    return levels;
}

// Generate data according to the rules
const data = [];
for (let i = 0; i < 2000000; i++) {
    const isSafe = Math.random() > 0.5;
    const length = Math.floor(Math.random() * 4) + 5; // Length between 5 and 8
    let levels = [];

    if (isSafe) {
        // Generate a safe sequence
        const isIncreasing = Math.random() > 0.5;
        levels = generateLevels(isIncreasing, length);
    } else {
        // Generate an unsafe sequence by introducing violations
        levels = generateUnsafeLevels(length);
    }

    const label = isSafe ? 'Safe' : 'Unsafe';
    data.push(`${levels.join(' ')} ${label}`);
}

fs.writeFileSync('data.txt', data.join('\n'));
console.log('Data generated!');

