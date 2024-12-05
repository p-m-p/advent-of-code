import inputByLine from "../inputByLine.mjs";

function isValid(update) {
  for (let i = 0; i < update.length; i++) {
    for (let j = i; j < update.length; j++) {
      const rule = rules.find(([a, b]) => a === update[j] && b === update[i]);

      if (rule) {
        return false;
      }
    }
  }

  return true;
}

function sortUpdate(update) {
  return update.sort((a, b) => {
    const rule = rules.find(([x, y]) => x === a && y === b);

    if (rule) {
      return -1;
    }

    return 1;
  });
}

const rules = [];

let partOne = 0;
let partTwo = 0;

await inputByLine("input.txt", function (line) {
  if (/\d+\|\d+/.test(line)) {
    rules.push(line.split("|").map(Number));
  } else if (/,/.test(line)) {
    const update = line.split(",").map(Number);

    if (isValid(update)) {
      partOne += update[Math.floor(update.length / 2)];
    } else {
      partTwo += sortUpdate(update)[Math.floor(update.length / 2)];
    }
  }
});

console.log("Part one", partOne);
console.log("Part two", partTwo);
