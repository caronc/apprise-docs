# Apprise Documentation

This repository contains the source for the Apprise documentation site, built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

## 🚀 Project Structure

```
.
├── public/              # Static assets
├── src/
│   ├── content/
│   │   └── docs/       # Documentation markdown files
│   │       ├── getting-started/
│   │       ├── guides/
│   │       ├── notify/
│   │       └── reference/
│   └── styles/         # Custom CSS
├── astro.config.mjs    # Astro configuration
├── package.json
└── tsconfig.json
```

## 📝 Writing Documentation

All documentation is written in Markdown (`.md`) or MDX (`.mdx`) format and stored in the `src/content/docs/` directory.

### Adding a New Page

1. Create a new `.md` or `.mdx` file in the appropriate directory under `src/content/docs/`
2. Add frontmatter at the top:

```md
---
title: Your Page Title
description: A brief description of the page
---

# Your Content Here
```

3. The page will automatically appear in the navigation if it's in an `autogenerate` directory

### Organizing Content

- **Getting Started**: Installation, quick start, and basic setup guides
- **Guides**: Step-by-step tutorials and how-to guides
- **Notifications**: Service-specific configuration and examples
- **Reference**: API documentation and advanced configuration

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🏁 Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Start the development server**

```bash
npm run dev
```

3. **Open your browser**

Navigate to `http://localhost:4321` to see the documentation site.

## 📚 Migration from Apprise Wiki

This documentation site is gradually migrating content from the [Apprise Wiki](https://github.com/caronc/apprise/wiki). The goal is to provide a more maintainable, searchable, and collaborative documentation platform.

### How to Help

If you'd like to help migrate wiki content:

1. Choose a wiki page to migrate
2. Create a corresponding markdown file in the appropriate `src/content/docs/` directory
3. Convert the wiki content to markdown format
4. Submit a pull request

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a branch** for your changes
3. **Make your changes** to the documentation
4. **Test locally** with `npm run dev`
5. **Submit a pull request**

### Contribution Guidelines

- Keep language clear and concise
- Include code examples where appropriate
- Follow the existing documentation structure
- Test your changes locally before submitting
- Check for spelling and grammar errors

## 📄 License

This documentation is open source and available under the same license as the main Apprise project.

## 🔗 Links

- [Apprise GitHub Repository](https://github.com/caronc/apprise)
- [Apprise Wiki](https://github.com/caronc/apprise/wiki)
- [Astro Documentation](https://docs.astro.build)
- [Starlight Documentation](https://starlight.astro.build/)

## 💬 Support

For questions about Apprise itself, please refer to the [main Apprise repository](https://github.com/caronc/apprise).

For documentation-specific issues, please open an issue in this repository.
