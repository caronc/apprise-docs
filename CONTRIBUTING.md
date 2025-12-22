# Contributing to Apprise Documentation

Thank you for your interest in contributing to Apprise documentation! This guide will help you get started.

## Ways to Contribute

- **Fix typos and errors**: Found a mistake? Submit a fix!
- **Improve existing content**: Make documentation clearer or more comprehensive
- **Add new content**: Write guides, examples, or reference documentation
- **Migrate wiki content**: Help move content from the GitHub wiki to this site
- **Suggest improvements**: Open issues for documentation that needs attention

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/apprise-docs.git
   cd apprise-docs
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Make your changes** in the `src/content/docs/` directory

## Documentation Structure

```
src/content/docs/
├── getting-started/    # Installation and setup guides
├── guides/            # Tutorials and how-to guides
├── notify/            # Service-specific documentation
└── reference/         # API and configuration reference
```

## Writing Guidelines

### Markdown Format

- Use Markdown (`.md`) or MDX (`.mdx`) for documentation files
- Start each file with frontmatter:
  ```md
  ---
  title: Page Title
  description: Brief description for SEO and navigation
  ---
  ```

### Style Guidelines

- **Be Clear**: Write in simple, straightforward language
- **Be Concise**: Get to the point quickly
- **Be Consistent**: Follow existing documentation patterns
- **Use Examples**: Include code examples where appropriate
- **Test Code**: Ensure code examples actually work

### Code Examples

Use appropriate syntax highlighting:

````md
```bash
# Shell commands
apprise -t "Title" -b "Body" service://url
```

```python
# Python code
import apprise
apobj = apprise.Apprise()
```
````

### Section Organization

- Use descriptive headings (H2 `##`, H3 `###`)
- Keep sections focused on a single topic
- Use lists for step-by-step instructions
- Add links to related documentation

## Migrating from Wiki

When migrating content from the [Apprise Wiki](https://github.com/caronc/apprise/wiki):

1. **Choose a wiki page** that hasn't been migrated yet
2. **Create a corresponding file** in the appropriate directory
3. **Convert the content**:
   - Update the format to standard Markdown
   - Add proper frontmatter
   - Update any broken links
   - Improve formatting and organization as needed
4. **Add a note** in the wiki page indicating it has been migrated

## Submitting Changes

1. **Create a branch** for your changes:
   ```bash
   git checkout -b docs/your-topic-name
   ```
2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "docs: brief description of changes"
   ```
3. **Push to your fork**:
   ```bash
   git push origin docs/your-topic-name
   ```
4. **Open a Pull Request** on GitHub
5. **Describe your changes** in the PR description
6. **Wait for review** and address any feedback

## Commit Message Guidelines

Use clear, descriptive commit messages:

- `docs: add Discord notification guide`
- `docs: fix typo in installation page`
- `docs: update quick start examples`
- `docs: migrate wiki content for Slack`

## Need Help?

- Open an issue if you're unsure about something
- Ask questions in your pull request
- Check existing documentation for examples

Thank you for contributing! 🎉
