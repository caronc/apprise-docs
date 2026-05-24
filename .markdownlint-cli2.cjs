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
    // Angle-bracket autolinks break MDX compilation; enabled only for .mdx via overrides below
    "no-mdx-autolink": false,
  },
  customRules: [
    {
      names: ["no-mdx-autolink"],
      description:
        "Angle-bracket autolinks (<https://...> or <email@host>) break MDX compilation — use [text](url) or [email](mailto:email) instead",
      tags: ["links", "mdx"],
      function: function (params, onError) {
        // Track fenced code blocks so we skip content inside them
        let inFence = false;
        params.lines.forEach(function (line, i) {
          if (/^(`{3,}|~{3,})/.test(line)) {
            inFence = !inFence;
            return;
          }
          if (inFence) return;
          // Skip inline code spans (rough check: line has an odd number of backtick pairs)
          // Match URL autolinks: <https://...> or <http://...>
          const urlRe = /<https?:\/\/[^>\s]+>/g;
          // Match email autolinks: <word@word.tld>
          const emailRe = /<[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}>/g;
          for (const re of [urlRe, emailRe]) {
            let m;
            while ((m = re.exec(line)) !== null) {
              onError({
                lineNumber: i + 1,
                detail:
                  "Replace angle-bracket autolink with [text](url) or [text](mailto:email)",
                range: [m.index + 1, m[0].length],
              });
            }
          }
        });
      },
    },
  ],
  globs: ["**/*.md"],
  ignores: ["**/node_modules/**", "**/.git/**"],
  overrides: [
    {
      globs: ["**/*.mdx"],
      config: {
        // Flag angle-bracket autolinks — they compile as JSX in MDX and break the build
        "no-mdx-autolink": true,
      },
    },
  ],
};
