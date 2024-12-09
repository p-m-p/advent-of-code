function partOne(grid, antenna) {
  const antiNodes = [];

  for (const name of Object.keys(antenna)) {
    const locations = antenna[name];

    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];

      for (let j = i + 1; j < locations.length; j++) {
        const nextLocation = locations[j];

        const gapY = nextLocation[0] - location[0];
        const gapX = nextLocation[1] - location[1];

        const placements = [
          [location[0] - gapY, location[1] - gapX],
          [nextLocation[0] + gapY, nextLocation[1] + gapX],
        ];

        for (const placement of placements) {
          const row = grid[placement[0]];

          if (row) {
            if (
              row[placement[1]] === undefined ||
              antiNodes.find(
                ([y, x]) => placement[0] === y && placement[1] === x,
              )
            ) {
              continue;
            }

            antiNodes.push(placement);
          }
        }
      }
    }
  }

  //console.log(grid.map((r) => r.join("")).join("\n"));
  return antiNodes.length;
}

function partTwo(grid, antenna) {
  const antiNodes = [];

  for (const name of Object.keys(antenna)) {
    const locations = [...antenna[name]];

    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];

      for (let j = i + 1; j < locations.length; j++) {
        const nextLocation = locations[j];

        const gapY = nextLocation[0] - location[0];
        const gapX = nextLocation[1] - location[1];

        const placements = [];

        let y = location[0] - gapY;
        let x = location[1] - gapX;

        while (y > -1 && x > -1 && y < grid.length && x < grid[0].length) {
          placements.push([y, x]);
          y = y - gapY;
          x = x - gapX;
        }

        y = nextLocation[0] + gapY;
        x = nextLocation[1] + gapX;

        while (y > -1 && x > -1 && y < grid.length && x < grid[0].length) {
          placements.push([y, x]);
          y = y + gapY;
          x = x + gapX;
        }

        for (const placement of placements) {
          const row = grid[placement[0]];

          if (row) {
            if (
              antiNodes.find(
                ([f, y, x]) =>
                  f === name && placement[0] === y && placement[1] === x,
              )
            ) {
              continue;
            }

            antiNodes.push([name, ...placement]);
          }
        }
      }
    }
  }

  antiNodes.forEach(([, y, x]) => {
    if (grid[y][x] === ".") {
      grid[y][x] = "#";
    }
  });
  console.log(grid.map((r) => r.join("")).join("\n"));

  Object.keys(antenna).forEach((freq) => {
    console.log(
      antenna[freq],
      antiNodes.filter(([f, y, x]) => f === freq),
    );
  });
  return antiNodes.length;
}

export async function run({ inputByLine }) {
  const antenna = {};
  const grid = [];

  await inputByLine((line) => {
    const row = line.split("");

    for (let i = 0; i < row.length; i++) {
      const location = row[i];

      if (location !== ".") {
        if (!antenna[location]) {
          antenna[location] = [];
        }

        antenna[location].push([grid.length, i]);
      }
    }

    grid.push(row);
    //});
  }, "test.txt");

  return [partOne(grid, antenna), partTwo(grid, antenna)];
}
