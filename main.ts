// One Line, One Laugh — a single self-contained joke, written to /output/entry.txt.
// The line: a confession to the dentist that flips into the dentist's weary
// familiarity — the laugh lands on "forty times a day", which reframes one
// little lie as the most routine sentence in the building.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I told my dentist I floss daily, and he nodded like a man who hears that lie forty times a day.";

// Gate guards: the entry must be one line of 1-140 characters, not only
// whitespace, with no newline and no leading or trailing space.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`line must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.trim() !== LINE) {
  throw new Error("line must not start or end with whitespace");
}
if (/[\n\r]/.test(LINE)) {
  throw new Error("line must not contain a newline");
}
// Control characters would break the "one readable line" promise even
// without a newline, so reject any of them outright.
if (/[\u0000-\u001F\u007F]/.test(LINE)) {
  throw new Error("line must not contain control characters");
}
const terminators = (LINE.match(/[.!?]/g) ?? []).length;
if (terminators !== 1 || !/[.!?]$/.test(LINE)) {
  throw new Error("line must end with exactly one sentence terminator");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
