import inputByLine from "../inputByLine.mjs";

function safe(report) {
  let incrementing = 1;
  let decrementing = 1;

  for (let i = 1; i < report.length; i++) {
    const diff = report[i - 1] - report[i];

    if (diff < 0) {
      incrementing++;
    } else if (diff > 0) {
      decrementing++;
    }

    const absDiff = Math.abs(diff);

    if (absDiff > 3 || absDiff === 0) {
      return false;
    }
  }

  return decrementing === report.length || incrementing === report.length;
}

let partOne = 0;
let partTwo = 0;

await inputByLine("input.txt", (line) => {
  const report = line
    .trim()
    .match(/\d+/g)
    .map((match) => parseInt(match, 10));

  if (safe(report)) {
    partOne++;
  } else if (report.some((_, i) => safe(report.toSpliced(i, 1)))) {
    partTwo++;
  }
});

console.log("Part one", partOne);
console.log("Part two", partOne + partTwo);
