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

  for (let [match, left, right] of section.matchAll(
    /(?:do\(\)|don't\(\)|mul\((\d+),(\d+)\))/g,
  )) {
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

const input = await Deno.readTextFile("input.txt", "utf8");

console.log("Part one", partOne(input));
console.log("Part two", partTwo(input));
