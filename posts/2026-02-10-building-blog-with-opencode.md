---
title: "Building a Modern Personal Blog with OpenCode"
date: "2026-02-10"
category: "DevOps"
tags: ["OpenCode", "Web Development", "Blogging", "Static Site", "JavaScript"]
status: "published"
image: "https://picsum.photos/id/48/800/400"
---

# Building a Modern Personal Blog with OpenCode

Today I want to share my experience building a modern, feature-rich personal blog from scratch using OpenCode. What started as a simple HTML file has evolved into a sophisticated blog platform with dynamic content, beautiful visualizations, and a clean, professional design.

## The Journey

When I first started, I had a single `index.html` file with nearly 1,500 lines of mixed HTML, CSS, and JavaScript. It was functional but messy, hard to maintain, and impossible to scale. With OpenCode's help, we transformed it into a well-structured, modern web application.

## Major Refactoring

The first step was separating concerns. We split the monolithic file into:

- **index.html** - Clean HTML structure
- **style.css** - Comprehensive stylesheet with CSS variables
- **script.js** - Modular JavaScript functionality
- **posts/** - Directory for Markdown blog posts
- **posts.json** - Post manifest for metadata

This separation made the codebase maintainable and allowed for easier updates and feature additions.

## Markdown-Based Content Management

One of the biggest improvements was implementing a Markdown-based content system:

```markdown
---
title: "My Post Title"
date: "2026-02-10"
category: "DevOps"
tags: ["Tag1", "Tag2"]
status: "published"
image: "featured-image-url"
---

# Post Content Here

Write in Markdown - it's clean, portable, and version-control friendly.
```

This approach means:
- No database required
- Content is portable and future-proof
- Easy to write and edit
- Perfect for Git version control
- Supports YAML frontmatter for metadata

## GitHub-Style Contribution Heatmap

Inspired by GitHub's contribution graph, we added a visual heatmap showing posting activity. The heatmap:

- Displays 16 weeks of activity
- Color-codes cells based on post frequency (5 levels)
- Lives in the right sidebar under "About Me"
- Updates automatically based on post dates

The implementation uses CSS custom properties for easy theming:

```css
--heatmap-0: #ebedf0;  /* No posts */
--heatmap-1: #9be9a8;  /* 1 post */
--heatmap-2: #40c463;  /* 2 posts */
--heatmap-3: #30a14e;  /* 3 posts */
--heatmap-4: #216e39;  /* 4+ posts */
```

## Dynamic Features

The blog now includes:

1. **Category Filtering** - Click any category in the sidebar to filter posts
2. **Post Counts** - Real-time counts per category in the sidebar
3. **Draft/Published Toggle** - Show or hide draft posts
4. **Modal Detail View** - Click any post to read in a beautiful modal overlay
5. **Responsive Design** - Works perfectly on mobile, tablet, and desktop
6. **Reading Time** - Automatic estimation based on content length
7. **Markdown Parser** - Custom-built parser supporting headers, lists, code blocks, tables, and blockquotes

## Technical Highlights

### No Framework Dependencies

We built everything with vanilla JavaScript - no React, Vue, or Angular. This keeps the blog:
- Lightweight and fast
- Easy to understand and modify
- No build step required
- Zero dependencies to manage

### CORS Workaround

For local file access (`file://` protocol), we implemented a fallback system that embeds posts directly in the JavaScript, ensuring the blog works even without a server.

### CSS Architecture

We used CSS variables for consistent theming:

```css
:root {
  --black: #000;
  --red: #ff5f56;
  --yellow: #ffbd2e;
  --cyan: #27c93f;
  --blue: #0000ff;
  /* ... more variables ... */
}
```

This makes customizing the color scheme incredibly easy.

## Content Strategy

We've populated the blog with diverse technical content:
- **DevOps**: OpenCode setup guides, CI/CD workflows
- **Java**: Java 21 features, best practices
- **Architecture**: Design patterns, mindset articles
- **Microservices**: Distributed systems, transactions

Each post demonstrates different Markdown features and showcases the blog's capabilities.

## Workflow

Adding new posts is simple:

1. Create a new `.md` file in the `posts/` directory
2. Add YAML frontmatter with metadata
3. Write content in Markdown
4. Run `./generate-manifest.sh` to update the manifest
5. Refresh the browser - done!

## Lessons Learned

### What Worked Well

- **Incremental improvement**: Starting with working code and refactoring gradually
- **Separation of concerns**: Splitting into files made everything manageable
- **Markdown**: The best choice for content - simple, powerful, portable
- **CSS Variables**: Made theming and maintenance much easier

### Challenges Overcome

- **File protocol limitations**: Solved with embedded fallback data
- **Mobile responsiveness**: Implemented hamburger menu and responsive grid
- **Performance**: Optimized with efficient DOM manipulation and lazy loading patterns

## Future Possibilities

The foundation is solid for future enhancements:
- Tag filtering and cloud visualization
- Search functionality
- Pagination for large post collections
- Dark mode toggle
- RSS feed generation
- Comment system integration
- Reading progress indicator
- Social sharing buttons
- Archive view by month/year

## Conclusion

What started as a mess of HTML/CSS/JS has become a clean, modern blog platform. The combination of:
- Static site simplicity
- Dynamic JavaScript features
- Markdown content management
- Beautiful visual design

...creates a blogging experience that's both powerful and enjoyable to use.

Building this blog with OpenCode has been an excellent exercise in web development best practices, from code organization to user experience design. The result is a platform I'm proud to use and excited to continue developing.

---

*Built with vanilla JavaScript, CSS, and Markdown. No frameworks, no build steps, just clean code.*