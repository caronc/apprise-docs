/* Basic linter for all Apprise Docs */
import fs from "node:fs";
import path from "node:path";
import { parseDocument } from "yaml";

// ---------------------------------------------------------------------------
// MDX safety helpers
// ---------------------------------------------------------------------------

// Angle-bracket autolinks (<https://...>) are valid in plain .md but are
// illegal in .mdx
// Every such link must be written as [url](url) in .mdx prose.
const AUTOLINK_RE = /<https?:\/\//;

/**
 * Strip fenced code blocks and inline code spans from MDX/Markdown text so
 * that only prose is checked for pattern violations.  Angle brackets inside
 * code examples are intentional and must not be flagged.
 */
function stripCode(text) {
  // Remove fenced code blocks (``` or ~~~, optional info string)
  text = text.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\1[ \t]*$/gm, "");
  // Remove inline code spans
  text = text.replace(/`+[^`]*`+/g, "");
  return text;
}

const ALLOWED_KEYS = new Set([
  // Common Starlight keys used
  "title",
  "description",
  "sidebar",
  "tableOfContents",
  "draft",
  "editUrl",
  "prev",
  "next",
  "head",

  // custom keys
  "has_attachments",
  "has_image",
  "has_sms",
  "has_selfhosted",
  "schemas",
  "sample_urls",
  "source",
  "group",
  "limits",
  "ended",
]);

const ROOT = process.cwd();

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git" || entry.name === ".github") continue;
      out.push(...walk(p));
      continue;
    }
    if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      out.push(p);
    }
  }
  return out;
}

function extractFrontmatter(text) {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) return null;
  return text.slice(4, end + 1);
}

let failed = false;
const files = walk(ROOT);

/**
 * Disallow `.md` + `.mdx` siblings with the same basename.
 * During the migration, this causes route/content ambiguity and stale pages
 * can win unexpectedly.
 */
const byDir = new Map();
for (const file of files) {
  const dir = path.dirname(file);
  const ext = path.extname(file);
  const base = path.basename(file, ext);

  if (!byDir.has(dir)) byDir.set(dir, new Map());
  const byBase = byDir.get(dir);
  if (!byBase.has(base)) byBase.set(base, new Set());
  byBase.get(base).add(ext);
}

for (const [dir, byBase] of byDir.entries()) {
  for (const [base, exts] of byBase.entries()) {
    if (exts.has(".md") && exts.has(".mdx")) {
      failed = true;
      console.error(
        `[docs] ${path.relative(ROOT, dir)}: ambiguous page slug "${base}" exists as both "${base}.md" and "${base}.mdx"`
      );
    }
  }
}

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");

  // MDX-specific check: angle-bracket URLs (<https://...>) are illegal in
  // .mdx. Produce error to prevent linter from passing so this doesn't
  // make it upstream
  if (file.endsWith(".mdx")) {
    const prose = stripCode(text);
    const lines = prose.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (AUTOLINK_RE.test(lines[i])) {
        failed = true;
        console.error(
          `[mdx] ${path.relative(ROOT, file)}:${i + 1}: angle-bracket URL in MDX prose -- replace <url> with [url](url)`
        );
      }
    }
  }

  const fm = extractFrontmatter(text);
  if (!fm) continue;

  const doc = parseDocument(fm);
  const data = doc.toJS();

  if (!data || typeof data !== "object" || Array.isArray(data)) continue;

  for (const key of Object.keys(data)) {
    if (!ALLOWED_KEYS.has(key)) {
      failed = true;
      console.error(
        `[frontmatter] ${path.relative(ROOT, file)}: unsupported key "${key}"`
      );
    }
  }
}

if (failed) process.exit(2);
