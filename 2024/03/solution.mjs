function partOne(section) {
  return [...section.matchAll(/mul\((\d+),(\d+)\)/g)].reduce(
    (total, [, left, right]) => {
      return total + left * right;
    },
    0,
  );
}

function partTwo(section) {
  let enabled = true;
  let total = 0;

  for (
    const [match, left, right] of section.matchAll(
      /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g,
    )
  ) {
    if (match === "don't()") {
      enabled = false;
    } else if (match === "do()") {
      enabled = true;
    } else if (enabled) {
      total += left * right;
    }
  }

  return total;
}

export async function run({ input }) {
  const text = await input();

  return [partOne(text), partTwo(text)];
}
