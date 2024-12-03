#!/usr/bin/env node

import { readFile } from "fs/promises";

const input = await readFile("input.txt", "utf8");

function partOne(section) {
  return [...section.matchAll(/mul\((\d+),(\d+)\)/g)].reduce(
    (total, [, left, right]) => {
      return total + left * right;
    },
    0,
  );
}

console.log("Part one", partOne(input));

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

console.log("Part two", partTwo(input));
