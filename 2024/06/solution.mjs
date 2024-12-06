const directions = [
  [0, -1], // Up
  [1, 0], // Right
  [0, 1], // Down
  [-1, 0], // Left
];

function partOne(floor, start) {
  const width = floor[0].length;
  const length = floor.length;
  const visited = new Set();
  const obstacles = new Set();

  let isLoop = false;
  let [y, x] = start;
  let direction = 0;

  while (true) {
    visited.add(`${y},${x}`);

    const [mx, my] = directions[direction];
    const vX = x + mx;
    const vY = y + my;

    if (vX === -1 || vX >= width || vY === -1 || vY >= length) {
      break;
    }

    const tile = floor[vY][vX];

    if (tile !== "#") {
      x = vX;
      y = vY;
    } else {
      const obstacle = `${vY},${vX},${direction}`;

      if (obstacles.has(obstacle)) {
        isLoop = true;
        break;
      }

      obstacles.add(obstacle);

      const nextDirection = direction + 1;
      direction = nextDirection === directions.length ? 0 : nextDirection;
    }
  }

  return isLoop ? -1 : visited.size;
}

function partTwo(floor, start) {
  let loops = 0;

  for (let y = 0; y < floor.length; y++) {
    for (let x = 0; x < floor[y].length; x++) {
      if (y === start[0] && x === start[1]) {
        continue;
      }

      const toTry = [...floor.map((t) => [...t])];
      toTry[y][x] = "#";

      if (partOne(toTry, start) === -1) {
        loops++;
      }
    }
  }

  return loops;
}

export async function run({ inputByLine }) {
  const floor = [];

  let start;

  await inputByLine((line) => {
    const row = line.split("");
    const startIndex = row.findIndex((t) => t === "^");

    if (startIndex !== -1) {
      start = [floor.length, startIndex];
    }

    floor.push(row);
  });

  return [partOne(floor, start), partTwo(floor, start)];
}
