import { TextLineStream } from "jsr:@std/streams/text-line-stream";

export default async function (url, fn) {
  const input = await Deno.open(url);
  const readable = input.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());

  for await (const line of readable) {
    fn(line);
  }
}
