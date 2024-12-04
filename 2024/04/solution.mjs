import inputByLine from "../inputByLine.mjs";

function collectWord(start, move, count) {
  if (start[0] < 0 || start[1] < 0) {
    return [""];
  }

  const row = wordGrid[start[0]];

  if (!row) {
    return [""];
  }

  const char = row[start[1]];

  if (count - 1 > 0) {
    const next = [start[0] + move[0], start[1] + move[1]];

    return [char, ...collectWord(next, move, count - 1)];
  }

  return [char ?? ""];
}

function partOne(word) {
  const directions = [
    [0, 1], // Forwards
    [0, -1], // Backwards
    [1, 0], // Down
    [-1, 0], // Up,
    [1, 1], // Diagonal down right
    [1, -1], // Diagonal down left
    [-1, -1], // Diagonal up left
    [-1, 1], // Diagonal up right
  ];
  const words = [];

  for (let y = 0; y < wordGrid.length; y++) {
    for (let x = 0; x < wordGrid[y].length; x++) {
      for (const direction of directions) {
        words.push(collectWord([y, x], direction, word.length));
      }
    }
  }

  return words.filter((w) => w.join("") === word || w.reverse().join === word)
    .length;
}

function partTwo(word) {
  const reach = Math.floor(word.length / 2);

  let occurrences = 0;

  for (let y = 0; y < wordGrid.length; y++) {
    for (let x = 0; x < wordGrid[y].length; x++) {
      const criss = collectWord([y - reach, x - reach], [1, 1], word.length);
      const cross = collectWord([y + reach, x - reach], [-1, 1], word.length);

      if (
        (criss.join("") === word || criss.toReversed().join("") === word) &&
        (cross.join("") === word || cross.toReversed().join("") === word)
      ) {
        occurrences++;
      }
    }
  }

  return occurrences;
}

const wordGrid = [];

await inputByLine("input.txt", (line) => {
  wordGrid.push(line.trim().split(""));
});

console.log("Part one", partOne("XMAS"));
console.log("Part two", partTwo("MAS"));
