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
  "has_chat",
  "has_email",
  "has_local",
  "has_selfhosted",
  "schemas",
  "sample_urls",
  "source",
  "group",
  "limits",
  "ended",
  "has_sponsorship",
  "sponsorship_level",
  "sponsorship_weight",
  "sponsor_since",
  "sponsor_message",
  "keywords",
]);

const ROOT = process.cwd();
const FIX = process.argv.includes("--fix");
const CANONICAL_SPONSOR_LOCALE =
  process.env.APPRISE_DOCS_SPONSOR_LOCALE || "en";
const SPONSORSHIP_LEVEL_MIN = 1;
const SPONSORSHIP_LEVEL_MAX = 100;
const SPONSORSHIP_WEIGHT_MIN = 1;
const SPONSORSHIP_WEIGHT_MAX = 5;
const SPONSOR_MESSAGE_MAX_LENGTH = 160;
const SPONSOR_DESCRIPTION_MAX_LENGTH = 260;
const POPULAR_SERVICES_MAX_ITEMS_MIN = 1;
const POPULAR_SERVICES_MAX_ITEMS_MAX = 50;
const SERVICE_SPONSOR_CONTROL_KEYS = [
  "has_sponsorship",
  "sponsorship_level",
  "sponsorship_weight",
  "sponsor_since",
];
const COMPANY_SPONSOR_ALLOWED_KEYS = new Set([
  "name",
  "website",
  "since",
  "level",
  "weight",
  "description",
  "sponsor_message",
  "sponsorMessage",
  "message",
]);

const POPULAR_SERVICES_ALLOWED_KEYS = new Set(["services", "max_items"]);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".git" ||
        entry.name === ".github"
      )
        continue;
      out.push(...walk(p));
      continue;
    }
    if (
      entry.isFile() &&
      (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))
    ) {
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

function splitFrontmatter(text) {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) return null;

  return {
    before: text.slice(0, 4),
    frontmatter: text.slice(4, end + 1),
    after: text.slice(end),
  };
}

function readMarkdownDocument(file) {
  const text = fs.readFileSync(file, "utf8");
  const parts = splitFrontmatter(text);
  if (!parts) return null;

  const doc = parseDocument(parts.frontmatter);
  const data = doc.toJS();
  return { text, parts, doc, data };
}

function rel(file) {
  return path.relative(ROOT, file);
}

function fail(message) {
  failed = true;
  console.error(message);
}

function warn(message) {
  console.warn(message);
}

function isPlainObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function parseBooleanLike(value) {
  if (value === true || value === false) return value;
  if (typeof value !== "string") return null;

  const normalized = value.trim().toLowerCase();
  if (["true", "yes", "1"].includes(normalized)) return true;
  if (["false", "no", "0"].includes(normalized)) return false;
  return null;
}

function validateIntegerRange(value, min, max, label, file) {
  if (!Number.isInteger(value)) {
    fail(
      `[sponsorship] ${rel(file)}: ${label} must be an integer ${min}-${max}`,
    );
    return null;
  }

  if (value < min || value > max) {
    fail(
      `[sponsorship] ${rel(file)}: ${label} must be between ${min} and ${max}`,
    );
    return null;
  }

  return value;
}

function validateYearMonth(value, label, file) {
  const m = typeof value === "string" ? value.match(/^(\d{4})-(\d{2})$/) : null;
  const month = m ? Number.parseInt(m[2], 10) : 0;
  if (!m || month < 1 || month > 12) {
    fail(`[sponsorship] ${rel(file)}: ${label} must be YYYY-MM when provided`);
  }
}

function validateLocalizedText(value, label, file, options = {}) {
  const { allowEmpty = false, maxLength = null } = options;

  function validateString(text, suffix = "") {
    if (typeof text !== "string") {
      fail(`[sponsorship] ${rel(file)}: ${label}${suffix} must be a string`);
      return;
    }

    if (!allowEmpty && text.trim() === "") {
      fail(`[sponsorship] ${rel(file)}: ${label}${suffix} cannot be empty`);
      return;
    }

    if (maxLength != null && text.length > maxLength) {
      fail(
        `[sponsorship] ${rel(file)}: ${label}${suffix} must be ${maxLength} characters or fewer`,
      );
    }
  }

  if (typeof value === "string") {
    validateString(value);
    return;
  }

  if (isPlainObject(value)) {
    if (Object.keys(value).length === 0) {
      fail(
        `[sponsorship] ${rel(file)}: ${label} localized object cannot be empty`,
      );
      return;
    }

    for (const [locale, text] of Object.entries(value)) {
      if (!/^[a-z]{2}(?:-[A-Za-z0-9]+)?$/.test(locale)) {
        fail(
          `[sponsorship] ${rel(file)}: ${label} has invalid locale key "${locale}"`,
        );
      }
      validateString(text, `.${locale}`);
    }
    return;
  }

  fail(
    `[sponsorship] ${rel(file)}: ${label} must be a string or localized object`,
  );
}

function validateServiceSponsorship(data, file) {
  const hasSponsorship =
    data.has_sponsorship == null
      ? null
      : parseBooleanLike(data.has_sponsorship);

  if (data.has_sponsorship != null && hasSponsorship === null) {
    fail(
      `[sponsorship] ${rel(file)}: has_sponsorship must be a boolean or boolean-like string`,
    );
  }

  const level =
    data.sponsorship_level == null
      ? null
      : validateIntegerRange(
          data.sponsorship_level,
          SPONSORSHIP_LEVEL_MIN,
          SPONSORSHIP_LEVEL_MAX,
          "sponsorship_level",
          file,
        );

  const activeSponsorship = level != null || hasSponsorship === true;

  if (level != null && hasSponsorship === true) {
    warn(
      `[sponsorship] ${rel(file)}: has_sponsorship is redundant when sponsorship_level is set`,
    );
  }

  if (data.sponsorship_weight != null) {
    validateIntegerRange(
      data.sponsorship_weight,
      SPONSORSHIP_WEIGHT_MIN,
      SPONSORSHIP_WEIGHT_MAX,
      "sponsorship_weight",
      file,
    );

    if (!activeSponsorship) {
      fail(
        `[sponsorship] ${rel(file)}: sponsorship_weight requires sponsorship_level or has_sponsorship`,
      );
    }
  }

  if (data.sponsor_since != null) {
    validateYearMonth(data.sponsor_since, "sponsor_since", file);

    if (!activeSponsorship) {
      fail(
        `[sponsorship] ${rel(file)}: sponsor_since requires sponsorship_level or has_sponsorship`,
      );
    }
  }

  if (data.sponsor_message != null) {
    validateLocalizedText(data.sponsor_message, "sponsor_message", file, {
      allowEmpty: true,
      maxLength: SPONSOR_MESSAGE_MAX_LENGTH,
    });

    if (!activeSponsorship) {
      fail(
        `[sponsorship] ${rel(file)}: sponsor_message requires sponsorship_level or has_sponsorship`,
      );
    }
  }
}

function validateUrlString(value, label, file) {
  if (value == null || value === "") return;

  if (typeof value !== "string") {
    fail(`[sponsorship] ${rel(file)}: ${label} must be a string URL`);
    return;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      fail(`[sponsorship] ${rel(file)}: ${label} must be an http(s) URL`);
    }
  } catch {
    fail(`[sponsorship] ${rel(file)}: ${label} must be a valid URL`);
  }
}

function validateCompanySponsorMeta(file) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    fail(`[sponsorship] ${rel(file)}: invalid JSON (${msg})`);
    return;
  }

  if (!isPlainObject(data)) {
    fail(`[sponsorship] ${rel(file)}: meta.json must contain a JSON object`);
    return;
  }

  for (const key of Object.keys(data)) {
    if (!COMPANY_SPONSOR_ALLOWED_KEYS.has(key)) {
      fail(`[sponsorship] ${rel(file)}: unsupported key "${key}"`);
    }
  }

  if (typeof data.name !== "string" || data.name.trim() === "") {
    fail(
      `[sponsorship] ${rel(file)}: name is required and must be a non-empty string`,
    );
  }

  validateUrlString(data.website, "website", file);

  validateIntegerRange(
    data.level,
    SPONSORSHIP_LEVEL_MIN,
    SPONSORSHIP_LEVEL_MAX,
    "level",
    file,
  );

  if (data.weight != null) {
    validateIntegerRange(
      data.weight,
      SPONSORSHIP_WEIGHT_MIN,
      SPONSORSHIP_WEIGHT_MAX,
      "weight",
      file,
    );
  }

  if (data.since != null) {
    validateYearMonth(data.since, "since", file);
  }

  if (data.description != null) {
    validateLocalizedText(data.description, "description", file, {
      allowEmpty: false,
      maxLength: SPONSOR_DESCRIPTION_MAX_LENGTH,
    });
  }

  const sponsorMessage =
    data.sponsor_message ?? data.sponsorMessage ?? data.message;
  if (sponsorMessage != null) {
    validateLocalizedText(sponsorMessage, "sponsor_message", file, {
      allowEmpty: true,
      maxLength: SPONSOR_MESSAGE_MAX_LENGTH,
    });
  }
}

function validateSponsorshipDirectory() {
  const sponsorshipsDir = path.join(ROOT, "sponsorships");
  if (!fs.existsSync(sponsorshipsDir)) return;

  for (const entry of fs.readdirSync(sponsorshipsDir, {
    withFileTypes: true,
  })) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;

    const metaPath = path.join(sponsorshipsDir, entry.name, "meta.json");
    if (!fs.existsSync(metaPath)) {
      fail(`[sponsorship] sponsorships/${entry.name}: missing meta.json`);
      continue;
    }

    validateCompanySponsorMeta(metaPath);
  }
}

function validatePopularServicesFile(file) {
  // The popular-services file is intentionally small and public-repo
  // controlled. It drives only the URL Builder's default dropdown ordering; it
  // does not hide services from search and does not override sponsorship.
  //
  // Entries are service directory IDs, not translated titles. That keeps this
  // file locale-specific while avoiding fragile matching against display names.
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    fail(`[popular] ${rel(file)}: invalid JSON (${msg})`);
    return;
  }

  if (!isPlainObject(data)) {
    fail(`[popular] ${rel(file)}: must contain a JSON object`);
    return;
  }

  for (const key of Object.keys(data)) {
    if (!POPULAR_SERVICES_ALLOWED_KEYS.has(key)) {
      fail(`[popular] ${rel(file)}: unsupported key "${key}"`);
    }
  }

  const canonicalServicesDir = path.join(
    ROOT,
    "locales",
    CANONICAL_SPONSOR_LOCALE,
    "services",
  );
  const knownServiceIds = fs.existsSync(canonicalServicesDir)
    ? new Set(
        fs
          .readdirSync(canonicalServicesDir, { withFileTypes: true })
          .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
          .map((entry) => entry.name),
      )
    : new Set();

  if (!Array.isArray(data.services)) {
    fail(`[popular] ${rel(file)}: services is required and must be an array`);
  } else {
    // Duplicate names are almost always accidental because the site de-dupes
    // sponsored-vs-popular at render time. Catching duplicates here makes the
    // public JSON easier to reason about in review.
    const seen = new Set();
    for (const [index, serviceId] of data.services.entries()) {
      if (typeof serviceId !== "string" || serviceId.trim() === "") {
        fail(
          `[popular] ${rel(file)}: services[${index}] must be a non-empty string`,
        );
        continue;
      }

      if (seen.has(serviceId)) {
        fail(
          `[popular] ${rel(file)}: duplicate service "${serviceId}" in services`,
        );
      }
      seen.add(serviceId);

      if (knownServiceIds.size > 0 && !knownServiceIds.has(serviceId)) {
        warn(
          `[popular] ${rel(file)}: services[${index}] references unknown service id "${serviceId}" and will be ignored during site sync`,
        );
      }
    }
  }

  if (data.max_items != null) {
    // max_items is optional by design. If maintainers ever decide the default
    // dropdown is too long, they can cap the rendered popular subset without
    // deleting lower-priority names from the curated list.
    if (!Number.isInteger(data.max_items)) {
      fail(`[popular] ${rel(file)}: max_items must be an integer`);
    } else if (
      data.max_items < POPULAR_SERVICES_MAX_ITEMS_MIN ||
      data.max_items > POPULAR_SERVICES_MAX_ITEMS_MAX
    ) {
      fail(
        `[popular] ${rel(file)}: max_items must be between ${POPULAR_SERVICES_MAX_ITEMS_MIN} and ${POPULAR_SERVICES_MAX_ITEMS_MAX}`,
      );
    }
  }
}

function validatePopularServicesFiles() {
  // Locale files are optional. Missing file means "no popular services for
  // this locale" and is handled by apprise-site sync/render code. We only lint
  // files that actually exist so translations can be added incrementally.
  const localesDir = path.join(ROOT, "locales");
  if (!fs.existsSync(localesDir)) return;

  for (const localeEntry of fs.readdirSync(localesDir, {
    withFileTypes: true,
  })) {
    if (!localeEntry.isDirectory() || localeEntry.name.startsWith("."))
      continue;

    const file = path.join(
      localesDir,
      localeEntry.name,
      "popular-services.json",
    );
    if (fs.existsSync(file)) validatePopularServicesFile(file);
  }
}

function serviceInfo(file) {
  const parts = path.relative(ROOT, file).split(path.sep);
  if (parts.length < 5) return null;
  if (parts[0] !== "locales" || parts[2] !== "services") return null;

  const base = path.basename(file);
  if (base !== "index.md" && base !== "index.mdx") return null;

  return {
    locale: parts[1],
    slug: parts[3],
  };
}

function buildServiceFileMap() {
  const map = new Map();

  for (const file of files) {
    const info = serviceInfo(file);
    if (!info) continue;
    map.set(`${info.locale}:${info.slug}`, file);
  }

  return map;
}

function sponsorControlSnapshot(data) {
  const out = {};
  for (const key of SERVICE_SPONSOR_CONTROL_KEYS) {
    if (data && Object.hasOwn(data, key)) out[key] = data[key];
  }
  return out;
}

function stableJson(value) {
  return JSON.stringify(value, Object.keys(value || {}).sort());
}

function writeSponsorControlSnapshot(file, snapshot) {
  const parsed = readMarkdownDocument(file);
  if (!parsed || !isPlainObject(parsed.data)) return false;

  for (const key of SERVICE_SPONSOR_CONTROL_KEYS) {
    parsed.doc.delete(key);
  }

  for (const [key, value] of Object.entries(snapshot)) {
    parsed.doc.set(key, value);
  }

  const nextText = `${parsed.parts.before}${parsed.doc.toString()}${parsed.parts.after}`;
  if (nextText === parsed.text) return false;

  fs.writeFileSync(file, nextText, "utf8");
  return true;
}

function validateSponsorControlLocaleAlignment() {
  const serviceMap = buildServiceFileMap();
  const canonicalPrefix = `${CANONICAL_SPONSOR_LOCALE}:`;

  for (const [key, canonicalFile] of serviceMap.entries()) {
    if (!key.startsWith(canonicalPrefix)) continue;

    const info = serviceInfo(canonicalFile);
    if (!info) continue;

    const canonicalParsed = readMarkdownDocument(canonicalFile);
    if (!canonicalParsed || !isPlainObject(canonicalParsed.data)) continue;

    const canonicalSnapshot = sponsorControlSnapshot(canonicalParsed.data);

    for (const [candidateKey, candidateFile] of serviceMap.entries()) {
      if (candidateKey === key || !candidateKey.endsWith(`:${info.slug}`)) {
        continue;
      }

      const candidateParsed = readMarkdownDocument(candidateFile);
      if (!candidateParsed || !isPlainObject(candidateParsed.data)) continue;

      const candidateSnapshot = sponsorControlSnapshot(candidateParsed.data);
      if (stableJson(candidateSnapshot) === stableJson(canonicalSnapshot)) {
        continue;
      }

      if (FIX) {
        if (writeSponsorControlSnapshot(candidateFile, canonicalSnapshot)) {
          warn(
            `[sponsorship] ${rel(candidateFile)}: synchronized sponsor control fields from ${CANONICAL_SPONSOR_LOCALE}`,
          );
        }
        continue;
      }

      fail(
        `[sponsorship] ${rel(candidateFile)}: sponsor control fields must match locales/${CANONICAL_SPONSOR_LOCALE}/services/${info.slug}/index.md[x] (run pnpm lint:fix to synchronize)`,
      );
    }
  }
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
      fail(
        `[docs] ${path.relative(ROOT, dir)}: ambiguous page slug "${base}" exists as both "${base}.md" and "${base}.mdx"`,
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
        fail(
          `[mdx] ${path.relative(ROOT, file)}:${i + 1}: angle-bracket URL in MDX prose -- replace <url> with [url](url)`,
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
      fail(
        `[frontmatter] ${path.relative(ROOT, file)}: unsupported key "${key}"`,
      );
    }
  }

  validateServiceSponsorship(data, file);
}

validateSponsorshipDirectory();
validateSponsorControlLocaleAlignment();
validatePopularServicesFiles();

if (failed) process.exit(2);
