# Modern Personal Blog

A clean, modern, and feature-rich static blog built with vanilla JavaScript, CSS, and Markdown. No build steps, no frameworks - just pure web technologies.

**[Live Demo](https://yourusername.github.io/your-repo-name)** (Update this link after deployment)

## Features

- **Markdown-Based Posts**: Write content in Markdown with YAML frontmatter
- **Dynamic Content**: JavaScript-powered post loading and filtering
- **GitHub-Style Heatmap**: Visual contribution calendar in the sidebar
- **Category Filtering**: Filter posts by category
- **Draft/Published Toggle**: Manage post visibility
- **Responsive Design**: Works on desktop, tablet, and mobile
- **No Build Step**: Pure HTML/CSS/JS - just deploy and go
- **GitHub Pages Ready**: Optimized for hosting on GitHub Pages

## Quick Start

### 1. Clone or Download

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

Or download and extract the ZIP file.

### 2. View Locally

Simply open `index.html` in your browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or use a local server (recommended for full functionality):

```bash
# Python 3
python -m http.server 8000

# Node.js (if you have npx)
npx serve .

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Deploy to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `yourusername.github.io` for a user site, or any name for a project site
3. Do NOT initialize with a README (we already have one)

### Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (replace with your actual repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Select **main** branch and **/(root)** folder
5. Click **Save**
6. Wait 1-2 minutes for the site to deploy
7. Visit `https://yourusername.github.io/your-repo-name`

### Step 4: (Optional) Custom Domain

1. Rename `CNAME.example` to `CNAME`
2. Edit it and replace with your domain:
   ```
   blog.yourdomain.com
   ```
3. Commit and push:
   ```bash
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```
4. Configure DNS with your domain provider (see [GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))

## Folder-Based Post Management

This blog uses a folder-based system for managing posts. Simply drop Markdown files into the `/posts/` folder and update the `posts.json` manifest.

### How to Add a New Post

#### 1. Create a Markdown File

Create a new `.md` file in the `/posts/` folder with the following naming convention:
```
YYYY-MM-DD-post-slug.md
```

Example: `2026-02-10-my-new-post.md`

#### 2. Add Frontmatter

Each post must start with a YAML frontmatter block:

```markdown
---
title: "Your Post Title"
date: "2026-02-10"
category: "java"
tags: ["Java", "Spring", "Tutorial"]
status: "published"
image: "article-1"
---

# Your Post Content

Write your content here using **Markdown** syntax.

## Features Supported

- Headers (H1, H2, H3)
- **Bold** and *italic* text
- `inline code` and code blocks
- [Links](https://example.com)
- Lists (ordered and unordered)
- Tables
- Blockquotes

```

#### 3. Update posts.json

Add your new post to the `posts.json` manifest file:

```json
{
  "posts": [
    {
      "file": "posts/2026-02-10-my-new-post.md",
      "slug": "my-new-post"
    },
    {
      "file": "posts/2026-02-09-architect-mindset.md",
      "slug": "architect-mindset"
    }
  ]
}
```

**Note**: The `slug` should be unique and URL-friendly.

### Using the Manifest Generator Script

You can use the provided bash script to automatically generate the manifest:

```bash
# Make the script executable (first time only)
chmod +x generate-manifest.sh

# Run the script
./generate-manifest.sh
```

This will scan the `/posts/` folder and generate `posts.json` automatically.

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title displayed on cards and detail view |
| `date` | Yes | Publication date in YYYY-MM-DD format |
| `category` | Yes | Post category (java, architecture, microservices, database, devops, cloud) |
| `tags` | Yes | Array of tags for the post |
| `status` | Yes | Either `published` or `draft` |
| `image` | No | Article image style (article-1, article-2, or article-3) |

### Post Status

- **`published`**: Post is visible to all visitors
- **`draft`**: Post is hidden unless "显示草稿" checkbox is checked

### Categories

Available categories and their display names:

| Category ID | Display Name |
|-------------|--------------|
| `java` | Java开发 |
| `architecture` | 软件架构 |
| `microservices` | 微服务 |
| `database` | 数据库 |
| `devops` | DevOps |
| `cloud` | 云原生 |
| `uncategorized` | 未分类 |

### Images

Posts automatically use one of three background images based on the `image` field:
- `article-1`: Blue gradient
- `article-2`: Red gradient  
- `article-3`: Cyan gradient

Or use a custom image URL in the frontmatter:
```yaml
image: "https://picsum.photos/id/48/800/400"
```

### Example Post

See existing posts in `/posts/` folder for reference:
- `2026-02-10-building-blog-with-opencode.md`
- `2026-02-10-opencode-mac-setup.md`
- `2026-02-09-architect-mindset.md`
- `2026-02-05-java-21-features.md`
- `2026-01-28-distributed-transaction.md`

## Project Structure

```
.
├── index.html              # Main HTML file
├── style.css              # All styles
├── script.js              # JavaScript functionality
├── posts.json             # Post manifest
├── posts/                 # Markdown posts folder
│   ├── 2026-02-10-building-blog-with-opencode.md
│   ├── 2026-02-10-opencode-mac-setup.md
│   ├── 2026-02-09-architect-mindset.md
│   ├── 2026-02-05-java-21-features.md
│   └── 2026-01-28-distributed-transaction.md
├── generate-manifest.sh   # Helper script to regenerate manifest
├── .nojekyll              # Prevents Jekyll processing on GitHub Pages
├── .gitignore             # Git ignore file
├── CNAME.example          # Template for custom domain
└── README.md              # This file
```

## Markdown Features Supported

The blog includes a custom Markdown parser that supports:

- **Headers**: `# H1`, `## H2`, `### H3`
- **Text formatting**: `**bold**`, `*italic*`, `` `code` ``
- **Code blocks**: Triple backticks with optional language
- **Lists**: Ordered and unordered
- **Tables**: GitHub-flavored Markdown tables
- **Blockquotes**: `> Quote`
- **Links**: `[text](url)`
- **Horizontal rules**: `---`

## Customization

### Change Colors

Edit CSS variables in `style.css`:

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

### Change Fonts

Update the Google Fonts link in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

### Add/Remove Categories

Edit the category list in `script.js` around line 730-740.

## Tips for Writing Posts

1. **Date format**: Always use `YYYY-MM-DD` format
2. **File naming**: Use lowercase and hyphens for readability
3. **Tags**: Keep tags concise and relevant
4. **Draft first**: Set `status: "draft"` while writing, change to `published` when ready
5. **Preview**: Open the blog in a browser to see your changes immediately (no build step needed!)
6. **Images**: Use a placeholder service like [picsum.photos](https://picsum.photos) for featured images

## Troubleshooting

### Posts not showing up on GitHub Pages

1. Make sure `posts.json` is up to date
2. Check that post files are committed and pushed
3. Verify the file paths in `posts.json` are correct
4. Wait a few minutes for GitHub Pages to update (cache)

### CORS errors when opening locally

The blog has fallback data embedded in `script.js` for local file access. If you see CORS errors:
- Use a local server instead of opening `file://` URLs
- Or add your posts to the `fallbackPosts` array in `script.js`

### Changes not appearing

1. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check browser console for errors

## Contributing

Feel free to fork this project and customize it for your own blog. If you make improvements, consider sharing them back!

## License

MIT License - feel free to use this for personal or commercial projects.

## Credits

Built with [OpenCode](https://opencode.ai) - the AI-powered code assistant.

---

**Happy Blogging!** 📝