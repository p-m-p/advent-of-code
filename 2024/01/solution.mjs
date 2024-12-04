import inputByLine from "../inputByLine.mjs";

const left = [];
const right = [];

await inputByLine("input.txt", (line) => {
  const [l, r] = line.trim().split(/\s+/);

  left.push(parseInt(l, 10));
  right.push(parseInt(r, 10));
});

function occurrences(item, items) {
  return items.filter((i) => i === item).length;
}

left.sort();
right.sort();

console.log(
  "Part one",
  left.reduce((sum, location, i) => {
    return sum + Math.abs(location - right[i]);
  }, 0),
);

console.log(
  "Part two",
  left.reduce((sum, location) => {
    return sum + location * occurrences(location, right);
  }, 0),
);
