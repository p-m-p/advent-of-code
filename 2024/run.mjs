import inputByLine from "./inputByLine.mjs";

const arg = Deno.args[0];

if (arg) {
  const day = parseInt(arg, 10);
  const dir = day < 10 ? `0${day}` : day;
  const label = "Duration";
  const { run } = await import(`./${dir}/solution.mjs`);

  console.time(label);

  const [partOne, partTwo] = await run({
    input: (file = "input.txt") =>
      Deno.readTextFile(`./${dir}/${file}`, "utf8"),
    inputByLine: (fn, file = "input.txt") =>
      inputByLine(`./${dir}/${file}`, fn),
  });

  console.timeEnd(label);
  console.log("Part one", partOne);
  console.log("Part two", partTwo);
}
