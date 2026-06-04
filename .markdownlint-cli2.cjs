module.exports = {
  config: {
    default: true,
	 // line length, disable for docs readability
    MD013: false,
	 // inline HTML, allow (Starlight uses it)
    MD033: false,
	 // Emphasis allowed in text below headers (no new header required)
	 MD036: false,
	 // first header in file does not have to be # (h1)
	 MD041: false,
     // MD051 slug algorithm differs from Starlight's github-slugger (which strips
     // accents); this causes false positives on French headings that contain
     // accented characters. Disabled because the runtime links are correct.
     MD051: false
  },
  globs: ["**/*.md"],
  ignores: ["**/node_modules/**", "**/.git/**"],
  customRules: [
    {
      names: ["CDM001", "no-angle-bracket-urls-in-services"],
      description:
        "Service docs are promoted to .mdx by the sync pipeline when they contain " +
        "SPONSORS:BANNER. Angle-bracket URLs (<https://...>) are invalid in MDX and " +
        "will break the build. Use [text](url) or [url](url) syntax instead.",
      tags: ["mdx", "links", "services"],
      parser: "none",
      function: function (params, onError) {
        // Only enforce on service index files — they all get promoted to .mdx.
        if (!params.name.includes("/services/")) return;

        let inFence = false;
        params.lines.forEach(function (line, idx) {
          // Track fenced code blocks (``` or ~~~).
          if (/^\s*(`{3,}|~{3,})/.test(line)) {
            inFence = !inFence;
            return;
          }
          if (inFence) return;

          // Scan for <http:// or <https:// autolinks outside code spans.
          // Strip inline code spans first so we don't flag URLs inside them.
          const stripped = line.replace(/`[^`]*`/g, function (m) {
            return " ".repeat(m.length);
          });

          let pos = 0;
          while (pos < stripped.length) {
            const i = stripped.indexOf("<http", pos);
            if (i === -1) break;

            // Confirm it's http:// or https://
            const rest = stripped.slice(i + 1);
            if (!/^https?:\/\//.test(rest)) {
              pos = i + 1;
              continue;
            }

            // Find the closing >
            const end = rest.indexOf(">");
            if (end > 0) {
              const url = rest.slice(0, end);
              onError({
                lineNumber: idx + 1,
                detail:
                  "Angle-bracket URL <" +
                  url +
                  "> will break the MDX build. " +
                  "Use [" +
                  url +
                  "](" +
                  url +
                  ") instead.",
                range: [i + 1, end + 2],
                fixInfo: {
                  editColumn: i + 1,
                  deleteCount: end + 2,
                  insertText: "[" + url + "](" + url + ")",
                },
              });
            }
            pos = i + 1;
          }
        });
      },
    },
    {
      names: ["CDM002", "no-bare-jsx-expressions-in-services"],
      description:
        "Service docs are promoted to .mdx by the sync pipeline when they contain " +
        "SPONSORS:BANNER. Bare {expr} in prose is parsed as a JSX expression by the " +
        "MDX compiler and will break the build if not valid JavaScript. " +
        "The most common trigger is the {#heading-id} anchor syntax — remove it and " +
        "rely on Starlight's auto-generated heading IDs instead.",
      tags: ["mdx", "services"],
      parser: "none",
      function: function (params, onError) {
        // Only enforce on service index files — they all get promoted to .mdx.
        if (!params.name.includes("/services/")) return;

        let inFence = false;
        params.lines.forEach(function (line, idx) {
          // Track fenced code blocks.
          if (/^\s*(`{3,}|~{3,})/.test(line)) {
            inFence = !inFence;
            return;
          }
          if (inFence) return;

          // Strip inline code spans so we only inspect prose.
          const stripped = line.replace(/`[^`]*`/g, function (m) {
            return " ".repeat(m.length);
          });

          // Flag {#id} heading anchor syntax — invalid as a JSX expression.
          let pos = 0;
          while (pos < stripped.length) {
            const i = stripped.indexOf("{#", pos);
            if (i === -1) break;

            const end = stripped.indexOf("}", i + 1);
            if (end > i) {
              const expr = stripped.slice(i, end + 1);
              onError({
                lineNumber: idx + 1,
                detail:
                  expr +
                  " uses {#id} heading-anchor syntax which is invalid in MDX. " +
                  "Remove it — Starlight auto-generates matching IDs from the heading text.",
                range: [i + 1, end - i + 1],
                fixInfo: {
                  editColumn: i + 1,
                  deleteCount: end - i + 1,
                  insertText: "",
                },
              });
            }
            pos = i + 1;
          }
        });
      },
    },
    {
      names: ["CDM003", "no-bare-placeholder-vars-in-services"],
      description:
        "Service docs are promoted to .mdx by the sync pipeline when they contain " +
        "SPONSORS:BANNER. Bare {identifier} in prose is parsed as a JSX expression. " +
        "If the identifier is a JavaScript reserved word (e.g. {switch}) it causes a " +
        "build-time parse error; otherwise it references an undefined variable at " +
        "runtime. Wrap placeholder variables in backticks: `{identifier}`.",
      tags: ["mdx", "services"],
      parser: "none",
      function: function (params, onError) {
        // Only enforce on service files — they all get promoted to .mdx.
        if (!params.name.includes("/services/")) return;

        let inFrontmatter = false;
        let frontmatterDone = false;
        let inFence = false;

        params.lines.forEach(function (line, idx) {
          // Skip frontmatter block.
          if (!frontmatterDone && idx === 0 && line.trim() === "---") {
            inFrontmatter = true;
            return;
          }
          if (inFrontmatter) {
            if (line.trim() === "---") {
              inFrontmatter = false;
              frontmatterDone = true;
            }
            return;
          }

          // Track fenced code blocks.
          if (/^\s*(`{3,}|~{3,})/.test(line)) {
            inFence = !inFence;
            return;
          }
          if (inFence) return;

          // Strip inline code spans so we only inspect prose.
          const stripped = line.replace(/`[^`]*`/g, function (m) {
            return " ".repeat(m.length);
          });

          // Flag bare {identifier} patterns (plain identifiers — {#id} is
          // handled by CDM002 and excluded here because # is not [a-zA-Z_]).
          let pos = 0;
          while (pos < stripped.length) {
            const i = stripped.indexOf("{", pos);
            if (i === -1) break;

            const end = stripped.indexOf("}", i + 1);
            if (end > i) {
              const content = stripped.slice(i + 1, end);
              // Match pure identifiers AND expressions containing operator chars
              // that indicate a corrupted placeholder (e.g. {from*email}).
              if (/^[a-zA-Z_][a-zA-Z0-9_*\-./]*$/.test(content)) {
                onError({
                  lineNumber: idx + 1,
                  detail:
                    "{" +
                    content +
                    "} in prose will be evaluated as a JSX expression in MDX. " +
                    "Wrap it in backticks: `{" +
                    content +
                    "}`.",
                  range: [i + 1, end - i + 1],
                  fixInfo: {
                    editColumn: i + 1,
                    deleteCount: end - i + 1,
                    insertText: "`{" + content + "}`",
                  },
                });
              }
            }
            pos = i + 1;
          }
        });
      },
    },
    {
      names: ["CDM004", "no-bare-br-tags-in-services"],
      description:
        "Service docs are promoted to .mdx by the sync pipeline when they contain " +
        "SPONSORS:BANNER. In MDX (JSX), void elements must be self-closing. " +
        "Replace <br> with <br/> and <img ...> with <img .../>.",
      tags: ["mdx", "html", "services"],
      parser: "none",
      function: function (params, onError) {
        if (!params.name.includes("/services/")) return;

        let inFrontmatter = false;
        let frontmatterDone = false;
        let inFence = false;

        params.lines.forEach(function (line, idx) {
          if (!frontmatterDone && idx === 0 && line.trim() === "---") {
            inFrontmatter = true;
            return;
          }
          if (inFrontmatter) {
            if (line.trim() === "---") {
              inFrontmatter = false;
              frontmatterDone = true;
            }
            return;
          }
          if (/^\s*(`{3,}|~{3,})/.test(line)) {
            inFence = !inFence;
            return;
          }
          if (inFence) return;

          const stripped = line.replace(/`[^`]*`/g, function (m) {
            return " ".repeat(m.length);
          });

          // Flag bare <br> tags.
          let pos = 0;
          while (pos < stripped.length) {
            const i = stripped.indexOf("<br>", pos);
            if (i === -1) break;
            onError({
              lineNumber: idx + 1,
              detail:
                "<br> is not valid JSX. Use <br/> in service docs that are promoted to .mdx.",
              range: [i + 1, 4],
              fixInfo: {
                editColumn: i + 1,
                deleteCount: 4,
                insertText: "<br/>",
              },
            });
            pos = i + 1;
          }

          // Flag bare <img ...> tags (closing > not preceded by /).
          const imgRe = /<img\s[^>]*[^/]>/g;
          let m;
          while ((m = imgRe.exec(stripped)) !== null) {
            onError({
              lineNumber: idx + 1,
              detail:
                "<img> must be self-closing in MDX. Add a slash before the closing >: <img .../>.",
              range: [m.index + 1, m[0].length],
            });
          }
        });
      },
    },
  ],
};
