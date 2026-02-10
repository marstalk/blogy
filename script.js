// Simple YAML Frontmatter Parser
const Frontmatter = {
    parse: function(content) {
        const result = {
            data: {},
            content: content
        };
        
        // Check for frontmatter (between --- markers)
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);
        
        if (match) {
            const frontmatterText = match[1];
            result.content = match[2].trim();
            
            // Parse simple key-value pairs
            frontmatterText.split('\n').forEach(line => {
                const colonIndex = line.indexOf(':');
                if (colonIndex > 0) {
                    const key = line.substring(0, colonIndex).trim();
                    let value = line.substring(colonIndex + 1).trim();
                    
                    // Remove quotes
                    if ((value.startsWith('"') && value.endsWith('"')) ||
                        (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }
                    
                    // Parse arrays
                    if (value.startsWith('[') && value.endsWith(']')) {
                        value = value.slice(1, -1)
                            .split(',')
                            .map(item => item.trim().replace(/^[\"']|[\"']$/g, ''))
                            .filter(item => item);
                    }
                    
                    result.data[key] = value;
                }
            });
        }
        
        return result;
    }
};

// Simple Markdown Parser
const Markdown = {
    parse: function(text) {
        if (!text) return '';
        
        // Headers
        text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // Bold and Italic
        text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Code blocks
        text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
        text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Links
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // Lists
        text = text.replace(/^\s*- (.*$)/gim, '<li>$1</li>');
        text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // Tables
        text = this.parseTables(text);
        
        // Blockquotes
        text = text.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
        
        // Paragraphs
        text = text.replace(/\n\n/g, '</p><p>');
        text = '<p>' + text + '</p>';
        
        // Clean up empty paragraphs
        text = text.replace(/<p><\/p>/g, '');
        text = text.replace(/<p>(<h[1-6]>)/g, '$1');
        text = text.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
        text = text.replace(/<p>(<ul>)/g, '$1');
        text = text.replace(/(<\/ul>)<\/p>/g, '$1');
        text = text.replace(/<p>(<pre>)/g, '$1');
        text = text.replace(/(<\/pre>)<\/p>/g, '$1');
        text = text.replace(/<p>(<blockquote>)/g, '$1');
        text = text.replace(/(<\/blockquote>)<\/p>/g, '$1');
        text = text.replace(/<p>(<table>)/g, '$1');
        text = text.replace(/(<\/table>)<\/p>/g, '$1');
        
        return text;
    },
    
    parseTables: function(text) {
        const lines = text.split('\n');
        let result = [];
        let inTable = false;
        let tableLines = [];
        
        for (let line of lines) {
            if (line.includes('|')) {
                if (!inTable) {
                    inTable = true;
                    tableLines = [];
                }
                tableLines.push(line);
            } else {
                if (inTable) {
                    // Process table
                    result.push(this.buildTable(tableLines));
                    inTable = false;
                    tableLines = [];
                }
                result.push(line);
            }
        }
        
        if (inTable) {
            result.push(this.buildTable(tableLines));
        }
        
        return result.join('\n');
    },
    
    buildTable: function(lines) {
        if (lines.length < 2) return lines.join('\n');
        
        let html = '<table>';
        
        lines.forEach((line, index) => {
            if (index === 1 && line.match(/^\|[-:\s|]+\|$/)) {
                return; // Skip separator line
            }
            
            const cells = line.split('|').filter(cell => cell.trim() !== '');
            const tag = index === 0 ? 'th' : 'td';
            
            html += '<tr>';
            cells.forEach(cell => {
                html += `<${tag}>${cell.trim()}</${tag}>`;
            });
            html += '</tr>';
        });
        
        html += '</table>';
        return html;
    }
};

// Blog Posts Data - will be loaded from files
let blogPosts = [];
let showDrafts = false;
let currentFilter = 'all';

// Fallback posts data (used when fetch fails due to CORS on local file://)
const fallbackPosts = [
    {
        id: "opencode-mac-setup",
        title: "在Mac上安装和配置OpenCode的完整指南",
        excerpt: "OpenCode是一款强大的AI编程助手，可以帮助开发者更高效地编写代码。本文将详细介绍如何在Mac系统上安装、配置和使用OpenCode...",
        content: `# 在Mac上安装和配置OpenCode的完整指南

OpenCode是一款强大的AI编程助手，可以帮助开发者更高效地编写代码。

## 系统要求

- **操作系统**: macOS 10.15 (Catalina) 或更高版本
- **内存**: 建议8GB以上
- **存储空间**: 至少2GB可用空间

## 安装步骤

### 1. 安装Homebrew

\`\`\`bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
\`\`\`

### 2. 安装OpenCode

\`\`\`bash
brew install opencode
\`\`\`

### 3. 验证安装

\`\`\`bash
opencode --version
\`\`\`

## 配置API密钥

\`\`\`bash
export OPENCODE_API_KEY="your-api-key-here"
\`\`\`

## 常用命令

- \`opencode --help\` - 获取帮助
- \`opencode analyze\` - 分析代码
- \`opencode refactor\` - 代码重构建议

详细内容请查看完整文章。`,
        date: "2026-02-10",
        category: "devops",
        tags: ["OpenCode", "Mac", "开发工具", "教程"],
        status: "published",
        image: "article-3"
    },
    {
        id: "architect-mindset",
        title: "从高级工程师到架构师的思维转变",
        excerpt: "在软件开发的职业道路上，从高级工程师到架构师的转变不仅仅是技术能力的提升，更是思维方式的根本性变化...",
        content: `# 从高级工程师到架构师的思维转变

在软件开发的职业道路上，从高级工程师到架构师的转变不仅仅是技术能力的提升，更是思维方式的根本性变化。

## 核心转变要素

### 1. 从局部到整体的视角变化

高级工程师通常专注于具体的功能实现和技术细节，而架构师需要：
- 理解整个系统的架构
- 考虑各个模块之间的交互
- 权衡不同技术选型的利弊

### 2. 从实现到设计的重心转移

架构师更多的时间是花在设计上：
- **系统边界**的划分
- **接口设计**的合理性
- **扩展性**和**可维护性**的考量

\`\`\`java
// 架构师关注接口设计
public interface PaymentService {
    PaymentResult process(PaymentRequest request);
}
\`\`\`

## 技术债务的平衡

优秀的架构师知道如何平衡业务需求与技术债务。`,
        date: "2026-02-09",
        category: "architecture",
        tags: ["软件架构", "微服务"],
        status: "published",
        image: "article-1"
    },
    {
        id: "java-21-features",
        title: "Java 21新特性在生产环境的应用实践",
        excerpt: "Java 21带来了虚拟线程、模式匹配等重大改进，这些特性在实际生产环境中如何应用？",
        content: `# Java 21新特性在生产环境的应用实践

Java 21带来了虚拟线程、模式匹配等重大改进。

## 虚拟线程 (Virtual Threads)

虚拟线程是Java 21最重要的特性之一：

\`\`\`java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return i;
        });
    });
}
\`\`\`

## 性能测试结果

- **内存使用**: 降低了40%
- **吞吐量**: 提升了3倍
- **延迟**: 减少了50%

## 结论

虚拟线程确实带来了显著的性能提升，值得在生产环境中尝试。`,
        date: "2026-02-05",
        category: "java",
        tags: ["Java", "Spring Boot"],
        status: "published",
        image: "article-2"
    },
    {
        id: "distributed-transaction",
        title: "微服务架构下的分布式事务解决方案比较",
        excerpt: "在微服务架构中，数据一致性是一个复杂的问题。本文详细比较了Saga模式、TCC等主流分布式事务解决方案。",
        content: `# 微服务架构下的分布式事务解决方案比较

在微服务架构中，数据一致性是一个复杂的问题。

## 主流解决方案

### 1. Saga模式

Saga模式将一个长事务拆分成多个本地事务。

### 2. TCC (Try-Confirm-Cancel)

TCC是一种补偿型事务方案：
- **Try**: 预留资源
- **Confirm**: 确认执行业务
- **Cancel**: 取消业务

### 3. 本地消息表

基于消息队列的最终一致性方案。

## 方案比较

| 方案 | 一致性 | 性能 | 复杂度 |
|------|--------|------|--------|
| Saga | 最终一致 | 高 | 中 |
| TCC | 最终一致 | 高 | 高 |
| 本地消息表 | 最终一致 | 中 | 低 |`,
        date: "2026-01-28",
        category: "microservices",
        tags: ["微服务", "架构设计"],
        status: "published",
        image: "article-3"
    },
    {
        id: "building-blog-with-opencode",
        title: "Building a Modern Personal Blog with OpenCode",
        excerpt: "A comprehensive journey of refactoring a messy single-file blog into a clean, modern, feature-rich platform using Markdown and vanilla JavaScript.",
        content: `# Building a Modern Personal Blog with OpenCode

Today I want to share my experience building a modern, feature-rich personal blog from scratch using OpenCode. What started as a simple HTML file has evolved into a sophisticated blog platform with dynamic content, beautiful visualizations, and a clean, professional design.

## The Journey

When I first started, I had a single index.html file with nearly 1,500 lines of mixed HTML, CSS, and JavaScript. It was functional but messy, hard to maintain, and impossible to scale. With OpenCode's help, we transformed it into a well-structured, modern web application.

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

Frontmatter example:
- title
- date
- category
- tags
- status
- image

This approach means no database required, content is portable and future-proof, easy to write and edit, perfect for Git version control.

## GitHub-Style Contribution Heatmap

Inspired by GitHub's contribution graph, we added a visual heatmap showing posting activity in the sidebar.

The heatmap displays activity with 5 color levels and updates automatically based on post dates.

## Dynamic Features

The blog now includes category filtering, post counts, draft/published toggle, modal detail view, responsive design, reading time estimation, and a custom Markdown parser.

## Technical Highlights

Built everything with vanilla JavaScript - no React, Vue, or Angular. This keeps the blog lightweight, easy to understand, and requires no build step.

## Conclusion

What started as a mess of HTML/CSS/JS has become a clean, modern blog platform combining static site simplicity with dynamic JavaScript features and Markdown content management.`,
        date: "2026-02-10",
        category: "devops",
        tags: ["OpenCode", "Web Development", "Blogging"],
        status: "published",
        image: "article-1"
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    if (window.innerWidth <= 768) {
        document.getElementById('mainNav').style.display = 'none';
    }
    
    // Load posts from files (with fallback for local file:// access)
    await loadPostsFromFiles();
    
    // If no posts loaded (CORS issue), use fallback data
    if (blogPosts.length === 0) {
        console.log('Using fallback posts data');
        blogPosts = fallbackPosts;
    }
    
    initPageNavigation();
    initSidebarFilters();
    initContactForm();
    initHeatmap();
    renderPosts();
    initFilters();
    initSearch();
    initLanguageSwitcher();
    
    // Initialize i18n after everything is loaded
    if (typeof i18n !== 'undefined') {
        i18n.init();
    }
});

// Load posts from markdown files
async function loadPostsFromFiles() {
    try {
        // Fetch posts manifest
        const response = await fetch('posts.json');
        if (!response.ok) {
            console.warn('posts.json not found, using default posts');
            return;
        }
        
        const manifest = await response.json();
        
        // Load each post file
        const postPromises = manifest.posts.map(async (postInfo) => {
            try {
                const postResponse = await fetch(postInfo.file);
                if (!postResponse.ok) return null;
                
                const markdownContent = await postResponse.text();
                const parsed = Frontmatter.parse(markdownContent);
                
                return {
                    id: postInfo.slug,
                    title: parsed.data.title || 'Untitled',
                    excerpt: parsed.content.split('\n')[0].replace('#', '').trim().substring(0, 100) + '...',
                    content: parsed.content,
                    date: parsed.data.date || new Date().toISOString().split('T')[0],
                    category: parsed.data.category || 'uncategorized',
                    tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [parsed.data.tags || '未分类'],
                    status: parsed.data.status || 'draft',
                    image: parsed.data.image || 'article-1'
                };
            } catch (error) {
                console.error('Error loading post:', postInfo.file, error);
                return null;
            }
        });
        
        const loadedPosts = await Promise.all(postPromises);
        blogPosts = loadedPosts.filter(post => post !== null);
        
        // Sort by date descending
        blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        console.log(`Loaded ${blogPosts.length} posts from files`);
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

// Mobile menu toggle
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    const nav = document.getElementById('mainNav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
});

// Responsive adjustment
window.addEventListener('resize', function() {
    const nav = document.getElementById('mainNav');
    nav.style.display = window.innerWidth > 768 ? 'block' : 'none';
});

// Render posts from data
function renderPosts() {
    const container = document.getElementById('postsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const filteredPosts = blogPosts.filter(post => {
        if (!showDrafts && post.status === 'draft') return false;
        if (currentFilter !== 'all' && post.category !== currentFilter) return false;
        return true;
    });
    
    if (filteredPosts.length === 0) {
        const noArticlesText = (typeof i18n !== 'undefined' && i18n.t) ? i18n.t('no_articles') : '暂无文章';
        container.innerHTML = `<p style="text-align: center; color: #999; padding: 2rem;">${noArticlesText}</p>`;
        return;
    }
    
    filteredPosts.forEach(post => {
        const card = createPostCard(post);
        container.appendChild(card);
    });
}

// Create post card element
function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'article-card';
    article.setAttribute('data-category', post.category);
    article.setAttribute('data-id', post.id);
    
    const dateStr = formatDate(post.date);
    const draftLabel = (typeof i18n !== 'undefined' && i18n.t) ? i18n.t('search_draft') : '草稿';
    const readMoreText = (typeof i18n !== 'undefined' && i18n.t) ? i18n.t('read_more') : '阅读全文';
    const draftBadge = post.status === 'draft' ? `<span class="draft-badge">${draftLabel}</span>` : '';
    
    article.innerHTML = `
        <div class="article-image ${post.image}"></div>
        <div class="article-content">
            <div class="article-meta">
                <div class="article-date">
                    <i class="far fa-calendar"></i> ${dateStr}
                </div>
                <div class="article-tags">
                    ${post.tags.map(tag => `<span class="tag tag-${post.category}">${tag}</span>`).join('')}
                    ${draftBadge}
                </div>
            </div>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a href="#" class="read-more" onclick="showPostDetail('${post.id}'); return false;">${readMoreText} <i class="fas fa-arrow-right"></i></a>
        </div>
    `;
    
    return article;
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Use i18n format if available
    if (typeof i18n !== 'undefined' && i18n.formatDate) {
        return i18n.formatDate(dateStr);
    }
    
    return `${year}年${month}月${day}日`;
}

// Show post detail in modal
function showPostDetail(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    const modal = document.getElementById('postModal');
    const content = document.getElementById('postModalContent');
    const draftLabel = (typeof i18n !== 'undefined' && i18n.t) ? i18n.t('search_draft') : '草稿';
    
    content.innerHTML = `
        <div class="post-detail">
            <h1>${post.title}</h1>
            <div class="post-meta">
                <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
                <span><i class="far fa-folder"></i> ${getCategoryName(post.category)}</span>
                ${post.status === 'draft' ? `<span class="draft-badge">${draftLabel}</span>` : ''}
            </div>
            <div class="post-tags">
                ${post.tags.map(tag => `<span class="tag tag-${post.category}">${tag}</span>`).join('')}
            </div>
            <div class="post-body">
                ${Markdown.parse(post.content)}
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modal
document.addEventListener('click', function(e) {
    const modal = document.getElementById('postModal');
    if (e.target === modal || e.target.classList.contains('modal-close')) {
        modal.style.display = 'none';
    }
});

// Initialize filters
function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-filter');
            renderPosts();
        });
    });
    
    // Draft toggle
    const draftToggle = document.getElementById('draftToggle');
    if (draftToggle) {
        draftToggle.addEventListener('change', function() {
            showDrafts = this.checked;
            renderPosts();
        });
    }
}

// Page navigation
function initPageNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pageId = this.getAttribute('data-page');
            
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(pageId + '-page').classList.add('active');
            
            if (pageId === 'home') {
                renderPosts();
                initHeatmap();
            }
            
            if (pageId === 'articles') {
                renderAllArticles();
            }
            
            if (window.innerWidth <= 768) {
                document.getElementById('mainNav').style.display = 'none';
            }
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    const viewArticlesBtn = document.querySelector('.view-articles-btn');
    if (viewArticlesBtn) {
        viewArticlesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.nav-link[data-page="home"]').click();
            const archFilterBtn = document.querySelector('.filter-btn[data-filter="architecture"]');
            if (archFilterBtn) archFilterBtn.click();
        });
    }
}

// Sidebar filters
function initSidebarFilters() {
    document.querySelectorAll('.category-filter').forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            document.querySelector('.nav-link[data-page="home"]').click();
            
            currentFilter = category;
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === category) {
                    btn.classList.add('active');
                }
            });
            renderPosts();
        });
    });
    
    document.querySelectorAll('.tag-filter').forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            const tag = this.getAttribute('data-tag');
            document.querySelector('.nav-link[data-page="home"]').click();
            alert(`按标签"${tag}"过滤文章的功能正在开发中...`);
        });
    });
}

// Contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            console.log('Form submitted:', formData);
            const successMsg = (typeof i18n !== 'undefined' && i18n.t) ? i18n.t('message_sent') : '消息已发送！我会尽快回复您。';
            alert(successMsg);
            contactForm.reset();
        });
    }
}

// Heatmap Generation (GitHub-style contribution graph)
function initHeatmap() {
    const heatmapContainer = document.getElementById('contributionHeatmap');
    if (!heatmapContainer) return;
    
    // Check if heatmap is in sidebar (narrower space)
    const isSidebar = heatmapContainer.closest('.sidebar') !== null;
    const totalWeeks = isSidebar ? 16 : 53; // Fewer weeks for sidebar
    const totalDays = totalWeeks * 7;
    
    // Generate data
    const today = new Date();
    const days = [];
    const postCounts = {};
    
    // Count posts per day
    blogPosts.forEach(post => {
        if (post.status === 'published') {
            const date = post.date;
            postCounts[date] = (postCounts[date] || 0) + 1;
        }
    });
    
    // Generate days
    for (let i = totalDays - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        days.push({
            date: dateStr,
            count: postCounts[dateStr] || 0,
            dayOfWeek: date.getDay()
        });
    }
    
    // Create heatmap grid
    let html = '<div class="heatmap-wrapper">';
    if (!isSidebar) {
        html += '<div class="heatmap-legend">文章发布热力图</div>';
    }
    html += '<div class="heatmap-grid">';
    
    // Create columns (weeks)
    for (let week = 0; week < totalWeeks; week++) {
        html += '<div class="heatmap-column">';
        for (let day = 0; day < 7; day++) {
            const index = week * 7 + day;
            if (index < days.length) {
                const dayData = days[index];
                const level = getHeatLevel(dayData.count);
                html += `<div class="heatmap-cell level-${level}" title="${dayData.date}: ${dayData.count}篇文章"></div>`;
            }
        }
        html += '</div>';
    }
    
    html += '</div>';
    const lessText = (typeof i18n !== 'undefined' && i18n.t) ? i18n.t('heatmap_less') : '少';
    const moreText = (typeof i18n !== 'undefined' && i18n.t) ? i18n.t('heatmap_more') : '多';
    
    html += '<div class="heatmap-footer">';
    html += `<span>${lessText}</span>`;
    html += '<div class="heatmap-cell level-0"></div>';
    html += '<div class="heatmap-cell level-1"></div>';
    html += '<div class="heatmap-cell level-2"></div>';
    html += '<div class="heatmap-cell level-3"></div>';
    html += '<div class="heatmap-cell level-4"></div>';
    html += `<span>${moreText}</span>`;
    html += '</div>';
    html += '</div>';
    
    heatmapContainer.innerHTML = html;
}

// Get heat level based on post count
function getHeatLevel(count) {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count <= 4) return 3;
    return 4;
}

// Render all articles for articles page
function renderAllArticles() {
    const container = document.getElementById('allArticlesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const publishedPosts = blogPosts.filter(p => p.status === 'published');
    
    if (publishedPosts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">暂无文章</p>';
        return;
    }
    
    // Group by category
    const grouped = {};
    publishedPosts.forEach(post => {
        if (!grouped[post.category]) {
            grouped[post.category] = [];
        }
        grouped[post.category].push(post);
    });
    
    Object.keys(grouped).forEach(category => {
        const posts = grouped[category];
        const articlesCountText = (typeof i18n !== 'undefined' && i18n.t) ? 
            i18n.t('articles_count', { count: posts.length }) : 
            `${posts.length}篇文章`;
        const viewAllText = (typeof i18n !== 'undefined' && i18n.t) ? 
            i18n.t('view_all_articles', { count: posts.length }) : 
            `查看全部${posts.length}篇文章`;
        
        const categoryHtml = `
            <div class="category-item" style="padding: 1.5rem; background: #f8f9fa; border-radius: 8px; margin-bottom: 1rem;">
                <h3>${getCategoryName(category)}</h3>
                <p>${articlesCountText}</p>
                <div style="margin-top: 1rem;">
                    ${posts.slice(0, 3).map(post => `
                        <div style="padding: 0.5rem 0; border-bottom: 1px solid #ddd;">
                            <a href="#" onclick="showPostDetail('${post.id}'); return false;" style="color: var(--color-blue);">${post.title}</a>
                            <span style="color: #999; font-size: 0.85rem; margin-left: 1rem;">${formatDate(post.date)}</span>
                        </div>
                    `).join('')}
                </div>
                ${posts.length > 3 ? `<a href="#" class="btn" style="margin-top: 1rem;" onclick="document.querySelector('.nav-link[data-page=home]').click(); return false;">${viewAllText}</a>` : ''}
            </div>
        `;
        container.innerHTML += categoryHtml;
    });
}

// Get category display name
function getCategoryName(category) {
    // Use i18n if available
    if (typeof i18n !== 'undefined' && i18n.getCategoryName) {
        return i18n.getCategoryName(category);
    }
    
    const names = {
        'java': 'Java开发',
        'architecture': '软件架构',
        'microservices': '微服务',
        'database': '数据库',
        'devops': 'DevOps',
        'cloud': '云原生',
        'uncategorized': '未分类'
    };
    return names[category] || category;
}

// Initialize language switcher
function initLanguageSwitcher() {
    const switcherWrapper = document.getElementById('languageSwitcherWrapper');
    const switcher = document.getElementById('languageSwitcher');
    const dropdown = document.getElementById('langDropdown');
    
    if (!switcher || !dropdown) return;
    
    // Toggle dropdown
    switcher.addEventListener('click', function(e) {
        e.stopPropagation();
        switcherWrapper.classList.toggle('active');
    });
    
    // Handle language selection
    dropdown.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            
            if (typeof i18n !== 'undefined' && i18n.setLanguage) {
                i18n.setLanguage(lang);
            }
            
            // Update active state
            dropdown.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Close dropdown
            switcherWrapper.classList.remove('active');
            
            // Re-render dynamic content
            renderPosts();
            initHeatmap();
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        switcherWrapper.classList.remove('active');
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    let searchTimeout;
    
    // Search on input with debounce
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length === 0) {
            hideSearchResults();
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    // Search on button click
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query.length > 0) {
                performSearch(query);
            }
        });
    }
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query.length > 0) {
                performSearch(query);
            }
        }
    });
    
    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.header-search')) {
            hideSearchResults();
        }
    });
    
    // Focus on search input when clicking inside search box
    searchInput.addEventListener('focus', function() {
        if (this.value.trim().length > 0) {
            performSearch(this.value.trim());
        }
    });
}

// Perform search
function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    
    if (!query || blogPosts.length === 0) {
        hideSearchResults();
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    // Search through all posts
    const results = blogPosts.filter(post => {
        const searchText = [
            post.title,
            post.excerpt,
            post.content,
            ...(Array.isArray(post.tags) ? post.tags : [post.tags]),
            getCategoryName(post.category)
        ].join(' ').toLowerCase();
        
        return searchText.includes(lowerQuery);
    });
    
    displaySearchResults(results, query);
}

// Display search results
function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    const isEnglish = typeof i18n !== 'undefined' && i18n.currentLang === 'en';
    
    if (results.length === 0) {
        const noResultsText = isEnglish ? 
            `No articles found matching "${escapeHtml(query)}"` : 
            `未找到包含 "${escapeHtml(query)}" 的文章`;
        searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px; opacity: 0.5;"></i>
                <p>${noResultsText}</p>
            </div>
        `;
        searchResults.classList.add('active');
        return;
    }
    
    let html = '';
    results.forEach(post => {
        const highlightedTitle = highlightText(post.title, query);
        const highlightedExcerpt = highlightText(post.excerpt.substring(0, 100) + '...', query);
        const draftLabel = isEnglish ? 'Draft' : '草稿';
        
        html += `
            <div class="search-result-item" onclick="openSearchResult('${post.id}')">
                <h4>${highlightedTitle}</h4>
                <p>${highlightedExcerpt}</p>
                <div class="search-meta">
                    <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
                    <span><i class="far fa-folder"></i> ${getCategoryName(post.category)}</span>
                    ${post.status === 'draft' ? `<span style="color: var(--color-yellow);"><i class="fas fa-pencil-alt"></i> ${draftLabel}</span>` : ''}
                </div>
            </div>
        `;
    });
    
    searchResults.innerHTML = html;
    searchResults.classList.add('active');
}

// Highlight search text
function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Escape regex special characters
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Hide search results
function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.classList.remove('active');
    }
}

// Open search result
function openSearchResult(postId) {
    hideSearchResults();
    
    // Switch to home page if not already there
    const homePage = document.getElementById('home-page');
    if (!homePage.classList.contains('active')) {
        document.querySelector('.nav-link[data-page="home"]').click();
    }
    
    // Show post detail
    setTimeout(() => {
        showPostDetail(postId);
    }, 100);
}
