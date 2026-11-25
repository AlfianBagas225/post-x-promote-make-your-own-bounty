// Entry for post-x-promote-make-your-own-bounty-01 (Node 22, standard library only).
//
// The entry is one post on X. This program does the only thing the repository
// has to do: read POST.json from the repository root, check that it names a
// real X post address, and copy it unchanged to /output/POST.json, where the
// house reads it. It never touches the network, never reads the clock, never
// reads a secret, and never reads a file outside the repository. Running it
// twice on the same repository writes the same bytes twice.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// An X post address, as X shows it: https://x.com/<handle>/status/<digits>,
// the same on twitter.com, with an optional www. or mobile. in front, or the
// /i/web/status/<digits> form. A query string or fragment after the digits is
// allowed by the house and read past, so it is accepted here too.
const POST_URL_PATTERN =
  /^https:\/\/(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/(?:[A-Za-z0-9_]{1,15}\/status|i\/web\/status)\/[0-9]+(?:[?#].*)?$/;

function readPostFile(): { url: string } {
  const path = join(BOT_DIR, 'POST.json');
  let raw: string;
  try {
    raw = readFileSync(path, 'utf8');
  } catch (err) {
    throw new Error(`cannot read ${path}: ${(err as Error).message}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`POST.json is not valid JSON: ${(err as Error).message}`);
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('POST.json must hold a JSON object, not an array or a bare value');
  }
  const url = (parsed as Record<string, unknown>).url;
  if (typeof url !== 'string' || url.length === 0) {
    throw new Error('POST.json must hold a "url" string naming the post on X');
  }
  if (url !== url.trim()) {
    throw new Error('POST.json url has leading or trailing whitespace');
  }
  if (!POST_URL_PATTERN.test(url)) {
    throw new Error(`POST.json url is not an X post address: ${url}`);
  }
  return { url };
}

function main(): void {
  const post = readPostFile();
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const source = join(BOT_DIR, 'POST.json');
  const target = join(OUTPUT_DIR, 'POST.json');
  try {
    copyFileSync(source, target);
  } catch (err) {
    throw new Error(`cannot write ${target}: ${(err as Error).message}`);
  }
  // Guard against a partial write: the copy must read back identical.
  if (!readFileSync(source).equals(readFileSync(target))) {
    throw new Error(`${target} does not match ${source} after copying`);
  }
  void post;
}

try {
  main();
} catch (err) {
  console.error(`main.ts: ${(err as Error).message}`);
  process.exit(1);
}
