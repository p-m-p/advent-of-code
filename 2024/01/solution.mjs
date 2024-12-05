function occurrences(item, items) {
  return items.filter((i) => i === item).length;
}

export async function run({ inputByLine }) {
  const left = [];
  const right = [];

  await inputByLine((line) => {
    const [l, r] = line.trim().split(/\s+/);

    left.push(parseInt(l, 10));
    right.push(parseInt(r, 10));
  });

  left.sort();
  right.sort();

  return [
    left.reduce((sum, location, i) => {
      return sum + Math.abs(location - right[i]);
    }, 0),

    left.reduce((sum, location) => {
      return sum + location * occurrences(location, right);
    }, 0),
  ];
}
