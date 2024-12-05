function safe(report) {
  const sign = Math.sign(report[0] - report[1]);

  for (let i = 1; i < report.length; i++) {
    const diff = report[i - 1] - report[i];

    if (Math.sign(diff) !== sign) {
      return false;
    }

    const absDiff = Math.abs(diff);

    if (absDiff > 3 || absDiff === 0) {
      return false;
    }
  }

  return true;
}

export async function run({ inputByLine }) {
  let partOne = 0;
  let partTwo = 0;

  await inputByLine((line) => {
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

  return [partOne, partOne + partTwo];
}
