# Tamilarasu Saravanakangeyan - Portfolio & Blog

A modern, hierarchical portfolio website and technical blog built with Hugo, featuring advanced navigation, responsive design, and accessibility-first approach.

## Features

### 🏗️ Hierarchical Navigation
- Multi-level navigation with unlimited nesting depth
- Collapsible/expandable menu items
- Breadcrumb navigation with schema markup
- Mobile-friendly accordion menu
- Auto-expansion for active pages

### 🎨 Modern Design
- Dark/light theme toggle with system preference detection
- Responsive design with mobile-first approach
- CSS custom properties for consistent theming
- Performance-optimized with critical CSS inlining

### ♿ Accessibility First
- WCAG 2.1 AA compliant
- Full keyboard navigation support
- Screen reader optimized
- ARIA attributes and semantic HTML
- Color contrast AAA rating

### 🚀 Performance Optimized
- Hugo static site generation for fast loading
- Optimized images with responsive sizing
- Minified CSS and JavaScript
- Lighthouse score 95+

## Project Structure

```
├── .github/
│   └── workflows/
│       ├── hugo.yml                 # GitHub Actions deployment
│       └── mlc_config.json          # Markdown link checker config
├── content/
│   ├── _index.md                    # Homepage content
│   ├── about.md                     # About page
│   ├── contact.md                   # Contact page
│   ├── blog/
│   │   ├── _index.md
│   │   └── web-development/
│   │       ├── _index.md
│   │       ├── frontend/
│   │       │   ├── _index.md
│   │       │   └── react-advanced-techniques.md
│   │       └── backend/
│   │           └── _index.md
│   └── projects/
│       ├── _index.md
│       └── web-development/
│           ├── _index.md
│           └── portfolio-navigation-system.md
├── layouts/
│   ├── _default/
│   │   ├── baseof.html              # Base template with navigation
│   │   ├── home.html                # Homepage layout
│   │   ├── single.html              # Single page layout
│   │   └── list.html                # List page layout
│   └── partials/
│       └── navigation/
│           ├── hierarchical-menu.html
│           ├── breadcrumbs.html
│           ├── mobile-menu.html
│           └── quick-links.html
├── static/
│   ├── css/
│   │   ├── styles.css               # Main stylesheet
│   │   └── navigation.css           # Navigation-specific styles
│   └── js/
│       ├── navigation.js            # Navigation functionality
│       └── theme-toggle.js          # Theme switching logic
└── hugo.yaml                        # Hugo configuration
```

## Quick Start

### Prerequisites
- [Hugo Extended](https://gohugo.io/installation/) (v0.120.4 or later)
- [Git](https://git-scm.com/)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/tamilarasusaravanakangeyan/tamilarasusaravanakangeyan.github.io.git
   cd tamilarasusaravanakangeyan.github.io
   ```

2. **Start the development server**
   ```bash
   hugo server -D
   ```

3. **Open your browser**
   Navigate to `http://localhost:1313`

### Building for Production

```bash
# Build the site
hugo --minify

# The generated site will be in the ./public directory
```

## Configuration

### Hugo Configuration (`hugo.yaml`)

Key configuration options:

```yaml
# Site settings
title: "Tamilarasu Saravanakangeyan"
baseURL: "https://tamilarasusaravanakangeyan.github.io"

# Hierarchical navigation menus
menus:
  main:
    - name: "Home"
      url: "/"
      weight: 10
    - name: "Blog"
      url: "/blog/"
      weight: 20
      # Nested menu structure supported
```

### Navigation Customization

Edit `hugo.yaml` to modify the hierarchical menu structure:

```yaml
menus:
  main:
    - name: "Parent Item"
      url: "/parent/"
      weight: 10
      parent: ""  # Top level item
    - name: "Child Item"
      url: "/parent/child/"
      weight: 11
      parent: "Parent Item"  # Creates hierarchy
```

## Content Management

### Creating New Posts

```bash
# Create a new blog post
hugo new blog/web-development/frontend/new-post.md

# Create a new project
hugo new projects/web-development/new-project.md
```

### Front Matter Template

```yaml
---
title: "Your Post Title"
description: "Brief description"
date: 2024-01-15T10:00:00Z
categories: ["Web Development", "Frontend"]
tags: ["react", "javascript"]
series: ["Advanced React Patterns"]
draft: false
---
```

## Deployment

### Automatic Deployment with GitHub Actions

The site automatically deploys to GitHub Pages when you push to the `main` branch.

### Manual Deployment

1. **Build the site**
   ```bash
   hugo --minify
   ```

2. **Deploy to GitHub Pages**
   ```bash
   # Push the public directory to gh-pages branch
   cd public
   git init
   git remote add origin https://github.com/tamilarasusaravanakangeyan/tamilarasusaravanakangeyan.github.io.git
   git add .
   git commit -m "Deploy site"
   git push -f origin main:gh-pages
   ```

## Customization

### Theming

The site uses CSS custom properties for easy theming:

```css
:root {
  /* Light theme colors */
  --color-primary: #2c3e50;
  --color-background: #ffffff;
}

[data-theme="dark"] {
  /* Dark theme colors */
  --color-primary: #ffffff;
  --color-background: #1a1d23;
}
```

### Adding New Navigation Levels

1. **Update `hugo.yaml`** with new menu items
2. **Create corresponding content files** with `_index.md`
3. **Update navigation partials** if needed for styling

## Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimization Features
- Critical CSS inlining
- Image optimization with Hugo's built-in processing
- Asset minification and compression
- Efficient JavaScript with modern ES6+ features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Hugo](https://gohugo.io/) - Fast static site generator
- [GitHub Pages](https://pages.github.com/) - Free hosting
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set
- [Inter Font](https://rsms.me/inter/) - Modern typography

---

**Built with ❤️ using Hugo and modern web technologies**