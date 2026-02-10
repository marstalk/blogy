# GitHub Pages Deployment Checklist

Use this checklist to deploy your blog to GitHub Pages:

## Pre-Deployment

- [ ] All posts are in the `/posts/` folder
- [ ] `posts.json` manifest is up to date
- [ ] All posts have proper frontmatter (title, date, category, tags, status)
- [ ] Tested locally and everything works

## Step 1: Create GitHub Repository

- [ ] Go to https://github.com/new
- [ ] Repository name: `yourusername.github.io` (for user site) OR any name (for project site)
- [ ] Visibility: Public (required for GitHub Pages)
- [ ] Do NOT initialize with README
- [ ] Click "Create repository"

## Step 2: Push Code to GitHub

```bash
# Navigate to your blog folder
cd /Users/C5381843/github/blogy

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Modern blog ready for GitHub Pages"

# Add remote (replace with your actual repository URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

- [ ] Go to your repository on GitHub
- [ ] Click "Settings" tab
- [ ] Click "Pages" in the left sidebar
- [ ] Under "Source", select "Deploy from a branch"
- [ ] Branch: Select "main"
- [ ] Folder: Select "/ (root)"
- [ ] Click "Save"
- [ ] Wait 1-2 minutes for deployment

## Step 4: Verify Deployment

- [ ] Visit `https://yourusername.github.io/your-repo-name`
- [ ] All posts are visible
- [ ] Heatmap displays correctly
- [ ] Category filtering works
- [ ] Mobile view works

## Step 5: (Optional) Custom Domain

If you want to use a custom domain:

- [ ] Rename `CNAME.example` to `CNAME`
- [ ] Edit `CNAME` file with your domain (e.g., `blog.yourdomain.com`)
- [ ] Commit and push the CNAME file
- [ ] Configure DNS with your domain provider
- [ ] Enable HTTPS in GitHub Pages settings

## Post-Deployment: Adding New Posts

After deployment, to add new posts:

1. Create new post file in `/posts/` folder
2. Update `posts.json` manifest
3. Commit and push:

```bash
git add .
git commit -m "Add new post: Your Post Title"
git push
```

4. Wait 1-2 minutes for GitHub Pages to update
5. Refresh your site to see the new post

## Troubleshooting

### Posts not showing up?
- [ ] Check that `posts.json` was committed and pushed
- [ ] Verify post file paths are correct
- [ ] Wait a few minutes (GitHub Pages has caching)
- [ ] Check browser console for errors

### Styles not loading?
- [ ] Verify `style.css` is in the root folder
- [ ] Check that file was committed and pushed
- [ ] Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### Custom domain not working?
- [ ] Verify CNAME file exists and has correct domain
- [ ] Check DNS settings with your domain provider
- [ ] Ensure domain points to GitHub Pages (CNAME or A records)
- [ ] Wait up to 24 hours for DNS propagation

## Your Site URLs

- **GitHub Pages URL**: `https://yourusername.github.io/your-repo-name`
- **Custom Domain** (if configured): `https://yourdomain.com`
- **Repository**: `https://github.com/yourusername/your-repo-name`

Replace `yourusername` and `your-repo-name` with your actual GitHub username and repository name.

---

**You're all set! Happy blogging!** 🚀