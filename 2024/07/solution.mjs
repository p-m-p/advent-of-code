function isCalibrated(total, numbers, operators) {
  const tree = [[numbers[0]]];

  for (let i = 1; i < numbers.length; i++) {
    const num = numbers[i];
    const level = tree[i - 1];
    const results = [];

    for (let j = 0; j < level.length; j++) {
      results.push(...operators.map((op) => op(level[j], num)));
    }

    if (i === numbers.length - 1 && results.includes(total)) {
      return true;
    }

    tree.push(results);
  }

  return false;
}

export async function run({ inputByLine }) {
  let partOne = 0;
  let partTwo = 0;

  await inputByLine((line) => {
    const [left, right] = line.split(":");
    const total = parseInt(left, 10);
    const numbers = right.trim().split(/\s+/).map(Number);
    const operators = [(a, b) => a + b, (a, b) => a * b];

    if (isCalibrated(total, numbers, operators)) {
      partOne += total;
    }

    if (
      isCalibrated(total, numbers, [
        ...operators,
        (a, b) => parseInt(`${a}${b}`, 10),
      ])
    ) {
      partTwo += total;
    }
  });

  return [partOne, partTwo];
}
