#!/usr/bin/env node

import { createReadStream } from "fs";
import { createInterface } from "readline";

const lineReader = createInterface({
  input: createReadStream("input.txt"),
});

const left = [];
const right = [];

lineReader.on("line", (str) => {
  const [l, r] = str.trim().split(/\s+/);

  left.push(parseInt(l, 10));
  right.push(parseInt(r, 10));
});

function occurrences(item, items) {
  return items.filter((i) => i === item).length;
}

lineReader.on("close", () => {
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
});
