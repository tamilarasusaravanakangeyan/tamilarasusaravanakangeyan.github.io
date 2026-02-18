# Tamilarasu Saravanakangeyan - Portfolio & Blog

[![Deploy Hugo site to GitHub Pages](https://github.com/tamilarasusaravanakangeyan/tamilarasusaravanakangeyan.github.io/actions/workflows/hugo.yml/badge.svg)](https://github.com/tamilarasusaravanakangeyan/tamilarasusaravanakangeyan.github.io/actions/workflows/hugo.yml)

A personal portfolio and technical blog powered by Hugo and the Relearn theme.

## Current Stack

- Hugo Extended (`v0.151.0`)
- Theme: `hugo-theme-relearn` (git submodule)
- Hosting: GitHub Pages
- Deployment: GitHub Actions workflow (`.github/workflows/hugo.yml`)

## Content Structure

The site is organized into category-first sections so posts can be grouped in the sidebar.

```
content/
├── _index.md
├── ai/
│   ├── _index.md
│   └── *.md
├── cloud/
│   ├── _index.md
│   └── *.md
├── devops/
│   ├── _index.md
│   └── *.md
├── dotnet/
│   ├── _index.md
│   └── *.md
└── software-architecture/
    ├── _index.md
    └── *.md
```

## Local Development

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/)
- [Git](https://git-scm.com/)

### Clone

```bash
git clone https://github.com/tamilarasusaravanakangeyan/tamilarasusaravanakangeyan.github.io.git
cd tamilarasusaravanakangeyan.github.io
git submodule update --init --recursive
```

### Run locally

```bash
hugo server -D
```

### Production build

```bash
hugo --minify
```

## Create New Posts

Section-specific archetypes are configured in `archetypes/`.

```bash
hugo new cloud/my-post.md
hugo new ai/my-post.md
hugo new dotnet/my-post.md
hugo new devops/my-post.md
hugo new software-architecture/my-post.md
```

These commands generate front matter with section-aligned `categories`, default `tags`, `author`, and `toc` settings.

## Configuration

Main site configuration lives in `hugo.yaml`.

Key points:

- `theme: "hugo-theme-relearn"`
- `menus.shortcuts` contains utility links (e.g. Gallery, GitHub)
- Main navigation is driven by section structure and `_index.md` weights

## Deployment

Deployment is automatic on push to `main`.

Workflow:

1. GitHub Actions checks out repository with submodules
2. Hugo builds the site (`hugo --gc --minify`)
3. Built output from `public/` is deployed to GitHub Pages

Site URL:

- https://tamilarasusaravanakangeyan.github.io

## Notes

- Relearn uses a documentation-style sidebar; section organization controls content discoverability.
- Legacy `/blogs/...` links are preserved with page aliases on moved posts.

## License

This project is licensed under the MIT License.

**Built with ❤️ using Hugo and modern web technologies**