const testInput = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
  ];
  
  const inputmap = testInput.map((input) => {
    if (input.length < 2) {
      return false;
    }
    let increasing = false;
    let decreasing = false;
    let safe = true;
    for (let i = 1; i < input.length; i++) {
      if (input[i] > input[i - 1]) {
        increasing = true;
      } else if (input[i] < input[i - 1]) {
        decreasing = true;
      }
      const diff = Math.abs(input[i] - input[i - 1]);
      if (diff < 1 || diff > 3) {
        safe = false;
      }
    }
    if (increasing && decreasing) {
      safe = false;
    }
    return safe;
  });
  
  const safeReports = inputmap.filter(Boolean).length;
  console.log("Test report",safeReports); // Output should be 2

  //do the same
  const fs = require('fs');
  const input = fs.readFileSync('input', 'utf8').split('\n').map(line => {
    const parts = line.split(' ').map(Number);
    return parts;
  }
  );

  const inputmap2 = input.map((input) => {
    if (input.length < 2) {
      return false;
    }
    let increasing = false;
    let decreasing = false;
    let safe = true;
    for (let i = 1; i < input.length; i++) {
      if (input[i] > input[i - 1]) {
        increasing = true;
      } else if (input[i] < input[i - 1]) {
        decreasing = true;
      }
      const diff = Math.abs(input[i] - input[i - 1]);
      if (diff < 1 || diff > 3) {
        safe = false;
      }
    }
    if (increasing && decreasing) {
      safe = false;
    }
    return safe;
  }

  );

  const safeReports2 = inputmap2.filter(Boolean).length;

  console.log("Test report",safeReports2); 