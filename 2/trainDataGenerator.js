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

    // For decreasing sequences, start at a higher number to prevent going below 1
    if (isIncreasing) {
        level = Math.floor(Math.random() * 90) + 1; // Start level between 1 and 90
    } else {
        level = Math.floor(Math.random() * 15) + length * 3; // Start level higher to avoid negative levels
    }
    levels.push(level);

    for (let i = 1; i < length; i++) {
        let change = Math.floor(Math.random() * 3) + 1; // Change of 1 to 3

        if (isIncreasing) {
            level += change;
        } else {
            level -= change;
            if (level < 1) {
                level = 1;
            }
        }

        // Ensure that adjacent levels are not equal
        while (level === levels[levels.length - 1]) {
            // Adjust the change to avoid equal adjacent numbers
            change = Math.floor(Math.random() * 3) + 1;
            if (isIncreasing) {
                level += change;
            } else {
                level -= change;
                if (level < 1) {
                    level = 1;
                }
            }
        }

        levels.push(level);
    }

    return levels;
}

// Generate data according to the rules
const data = [];
for (let i = 0; i < 2000000; i++) {
    const isSafe = Math.random() > 0.5;
    const length = Math.floor(Math.random() * 4) + 5; // Length between 5 and 8

    let levels;

    if (isSafe) {
        // Levels are strictly increasing or strictly decreasing by 1 to 3
        const isIncreasing = Math.random() > 0.5;
        levels = generateLevels(isIncreasing, length);
    } else {
        // Generate unsafe data that violates the rules
        levels = [];
        let level = Math.floor(Math.random() * 90) + 1;
        levels.push(level);

        for (let j = 1; j < length; j++) {
            const action = Math.random();
            let change = Math.floor(Math.random() * 3) + 1;

            if (action < 0.1) {
                // Introduce no change (equal adjacent levels)
                // Level remains the same
                levels.push(level);
            } else  {
                // Change direction or make invalid change
                if (Math.random() > 0.5) {
                    // Change direction
                    if (Math.random() > 0.5) {
                        level += change;
                    } else {
                        level -= change;
                        if (level < 1) {
                            level = 1;
                        }
                    }
                } else {
                    // Make a change larger than 3 (invalid)
                    change = Math.floor(Math.random() * 5) + 4; // Change of 4 to 8
                    if (Math.random() > 0.5) {
                        level += change;
                    } else {
                        level -= change;
                        if (level < 1) {
                            level = 1;
                        }
                    }
                }
                levels.push(level);
            }
        }
    }

    const label = isSafe ? 'Safe' : 'Unsafe';
    data.push(`${levels.join(' ')},${label}`);
}

fs.writeFileSync('data.txt', data.join('\n'));
console.log('Data generated!');
