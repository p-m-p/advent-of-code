function partOne(input) {
  const ret = [...input];
  let free = input.filter((i) => i === ".").length;
  let i = 0;
  let n = free;

  while (n > 0) {
    if (ret[i] === ".") {
      let j = ret.length - 1;

      while (ret[j] === ".") {
        j--;
      }

      const left = ret[i];
      const right = ret[j];

      ret[i] = right;
      ret[j] = left;

      n--;
      i--;
    } else {
      i++;
    }
  }

  let checksum = 0;
  const items = ret.slice(0, ret.length - free);

  for (let i = 0; i < items.length; i++) {
    checksum += i * items[i];
  }

  return checksum;
}

export async function run({ input }) {
  const diskMap = (await input()).split("").map(Number);
  const result = [];

  for (let i = 0, j = 0; i < diskMap.length; i += 2, j++) {
    const file = diskMap[i];
    const freeMem = diskMap[i + 1];

    result.push(...new Array(file).fill(j), ...new Array(freeMem).fill("."));
  }

  return [partOne(result)];
}
