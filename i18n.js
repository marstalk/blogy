/**
 * Internationalization (i18n) System for Blog
 * Supports: Chinese (Simplified) and English
 */

const i18n = {
    // Current language
    currentLang: localStorage.getItem('blog-lang') || 'zh',
    
    // Available languages
    languages: {
        zh: {
            name: '中文',
            flag: '🇨🇳'
        },
        en: {
            name: 'English',
            flag: '🇬🇧'
        }
    },
    
    // Translations
    translations: {
        // Site
        'site_name': {
            zh: '代码之韵',
            en: 'Code Rhythm'
        },
        
        // Navigation
        'nav_home': {
            zh: '首页',
            en: 'Home'
        },
        'nav_articles': {
            zh: '文章',
            en: 'Articles'
        },
        'nav_architecture': {
            zh: '架构',
            en: 'Architecture'
        },
        'nav_projects': {
            zh: '项目',
            en: 'Projects'
        },
        'nav_about': {
            zh: '关于',
            en: 'About'
        },
        'nav_contact': {
            zh: '联系',
            en: 'Contact'
        },
        
        // Search
        'search_placeholder': {
            zh: '搜索文章...',
            en: 'Search articles...'
        },
        'search_no_results': {
            zh: '未找到包含 "{query}" 的文章',
            en: 'No articles found matching "{query}"'
        },
        'search_draft': {
            zh: '草稿',
            en: 'Draft'
        },
        
        // Articles section
        'latest_articles': {
            zh: '最新文章',
            en: 'Latest Articles'
        },
        'filter_all': {
            zh: '全部',
            en: 'All'
        },
        'filter_java': {
            zh: 'Java',
            en: 'Java'
        },
        'filter_architecture': {
            zh: '架构',
            en: 'Architecture'
        },
        'filter_spring': {
            zh: 'Spring',
            en: 'Spring'
        },
        'filter_microservices': {
            zh: '微服务',
            en: 'Microservices'
        },
        'show_drafts': {
            zh: '显示草稿',
            en: 'Show drafts'
        },
        'read_more': {
            zh: '阅读全文',
            en: 'Read more'
        },
        'no_articles': {
            zh: '暂无文章',
            en: 'No articles yet'
        },
        
        // Sidebar
        'about_me': {
            zh: '关于我',
            en: 'About Me'
        },
        'about_description': {
            zh: '10年经验的全栈架构师，专注于Java生态、微服务架构和云原生技术。热爱分享技术实践与架构思考。',
            en: 'Full-stack architect with 10 years of experience, specializing in Java ecosystem, microservices, and cloud-native technologies. Passionate about sharing technical practices and architectural insights.'
        },
        'heatmap_title': {
            zh: '写作热力图',
            en: 'Writing Heatmap'
        },
        'heatmap_less': {
            zh: '少',
            en: 'Less'
        },
        'heatmap_more': {
            zh: '多',
            en: 'More'
        },
        'categories': {
            zh: '文章分类',
            en: 'Categories'
        },
        'category_java': {
            zh: 'Java开发',
            en: 'Java Development'
        },
        'category_architecture': {
            zh: '软件架构',
            en: 'Software Architecture'
        },
        'category_microservices': {
            zh: '微服务',
            en: 'Microservices'
        },
        'category_database': {
            zh: '数据库',
            en: 'Database'
        },
        'category_devops': {
            zh: 'DevOps',
            en: 'DevOps'
        },
        'category_cloud': {
            zh: '云原生',
            en: 'Cloud Native'
        },
        'category_uncategorized': {
            zh: '未分类',
            en: 'Uncategorized'
        },
        'tag_cloud': {
            zh: '标签云',
            en: 'Tags'
        },
        'recent_articles': {
            zh: '最近文章',
            en: 'Recent Articles'
        },
        
        // Articles page
        'all_articles_title': {
            zh: '所有文章',
            en: 'All Articles'
        },
        'all_articles_desc': {
            zh: '这里收录了所有的技术文章，涵盖Java开发、软件架构、微服务、云原生等多个技术领域。',
            en: 'A collection of all technical articles covering Java development, software architecture, microservices, cloud-native, and more.'
        },
        'article_categories': {
            zh: '文章分类',
            en: 'Article Categories'
        },
        'articles_count': {
            zh: '{count}篇文章',
            en: '{count} articles'
        },
        'view_all_articles': {
            zh: '查看全部{count}篇文章',
            en: 'View all {count} articles'
        },
        
        // Architecture page
        'architecture_title': {
            zh: '架构专栏',
            en: 'Architecture Column'
        },
        'architecture_desc': {
            zh: '深入探讨软件架构设计原则、模式与实践，分享架构师成长路径与思考。',
            en: 'In-depth exploration of software architecture design principles, patterns, and practices, sharing the architect journey and insights.'
        },
        'architecture_principles': {
            zh: '架构设计原则',
            en: 'Architecture Design Principles'
        },
        'architecture_intro': {
            zh: '良好的软件架构是系统成功的基石。在多年的架构设计实践中，我总结了一些重要的原则：',
            en: 'Good software architecture is the foundation of system success. After years of architectural design practice, I have summarized some important principles:'
        },
        'srp_title': {
            zh: '1. 单一职责原则',
            en: '1. Single Responsibility Principle'
        },
        'srp_desc': {
            zh: '每个模块、类或函数应该只有一个改变的原因。这有助于降低系统的复杂性，提高可维护性。',
            en: 'Each module, class, or function should have only one reason to change. This helps reduce system complexity and improve maintainability.'
        },
        'ocp_title': {
            zh: '2. 开闭原则',
            en: '2. Open/Closed Principle'
        },
        'ocp_desc': {
            zh: '软件实体应该对扩展开放，对修改关闭。这意味着应该通过添加新代码来扩展功能，而不是修改现有代码。',
            en: 'Software entities should be open for extension but closed for modification. This means extending functionality by adding new code, not modifying existing code.'
        },
        'dip_title': {
            zh: '3. 依赖倒置原则',
            en: '3. Dependency Inversion Principle'
        },
        'dip_desc': {
            zh: '高层模块不应该依赖低层模块，两者都应该依赖抽象。抽象不应该依赖细节，细节应该依赖抽象。',
            en: 'High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.'
        },
        'isp_title': {
            zh: '4. 接口隔离原则',
            en: '4. Interface Segregation Principle'
        },
        'isp_desc': {
            zh: '客户端不应该被迫依赖它们不使用的接口。将庞大的接口拆分成更小、更具体的接口。',
            en: 'Clients should not be forced to depend on interfaces they do not use. Split large interfaces into smaller, more specific ones.'
        },
        'lsp_title': {
            zh: '5. 里氏替换原则',
            en: '5. Liskov Substitution Principle'
        },
        'lsp_desc': {
            zh: '子类型必须能够替换它们的基类型。这是面向对象设计的重要原则。',
            en: 'Subtypes must be substitutable for their base types. This is an important principle of object-oriented design.'
        },
        'view_architecture_articles': {
            zh: '查看架构相关文章',
            en: 'View architecture articles'
        },
        
        // Projects page
        'projects_title': {
            zh: '项目展示',
            en: 'Projects'
        },
        'projects_desc': {
            zh: '这里展示了我参与或主导的一些技术项目，包括开源项目和企业级解决方案。',
            en: 'Here are some technical projects I have participated in or led, including open source projects and enterprise solutions.'
        },
        'my_projects': {
            zh: '我的项目',
            en: 'My Projects'
        },
        'projects_intro': {
            zh: '以下是我近年来参与的一些有代表性的项目，涵盖了从个人开源项目到企业级系统。',
            en: 'Here are some representative projects I have participated in recent years, ranging from personal open source projects to enterprise systems.'
        },
        'project_1_title': {
            zh: '微服务治理平台',
            en: 'Microservices Governance Platform'
        },
        'project_1_desc': {
            zh: '一个企业级的微服务治理平台，提供服务注册发现、配置中心、流量管理、服务监控等核心功能。',
            en: 'An enterprise-level microservices governance platform providing service discovery, configuration center, traffic management, and service monitoring.'
        },
        'project_2_title': {
            zh: '分布式事务解决方案',
            en: 'Distributed Transaction Solution'
        },
        'project_2_desc': {
            zh: '基于Saga模式的分布式事务解决方案，支持多种事务模式，提供完整的可视化监控和管理界面。',
            en: 'A distributed transaction solution based on Saga pattern, supporting multiple transaction modes with complete visual monitoring and management interface.'
        },
        'project_3_title': {
            zh: '代码生成工具',
            en: 'Code Generator Tool'
        },
        'project_3_desc': {
            zh: '一款高效的代码生成工具，支持根据数据库表结构自动生成CRUD代码、接口文档和前端页面。',
            en: 'An efficient code generation tool that supports automatic generation of CRUD code, API documentation, and front-end pages based on database schema.'
        },
        'view_details': {
            zh: '查看详情',
            en: 'View details'
        },
        
        // About page
        'about_page_title': {
            zh: '关于我',
            en: 'About Me'
        },
        'about_page_desc': {
            zh: '10年经验的全栈架构师，专注于Java生态、微服务架构和云原生技术',
            en: 'Full-stack architect with 10 years of experience, specializing in Java ecosystem, microservices, and cloud-native technologies'
        },
        'about_name': {
            zh: '王明 - 全栈架构师',
            en: 'Wang Ming - Full-stack Architect'
        },
        'about_intro': {
            zh: '拥有10年软件开发与架构设计经验，曾在多家知名互联网公司担任架构师和技术负责人。',
            en: 'With 10 years of software development and architectural design experience, served as architect and tech lead at several well-known internet companies.'
        },
        'skills_title': {
            zh: '专业技能',
            en: 'Professional Skills'
        },
        'skill_1': {
            zh: 'Java生态：Spring全家桶、MyBatis、Netty、JVM调优',
            en: 'Java Ecosystem: Spring ecosystem, MyBatis, Netty, JVM tuning'
        },
        'skill_2': {
            zh: '微服务架构：Spring Cloud、Dubbo、服务网格、服务治理',
            en: 'Microservices: Spring Cloud, Dubbo, Service Mesh, service governance'
        },
        'skill_3': {
            zh: '云原生：Docker、Kubernetes、Service Mesh、CI/CD',
            en: 'Cloud Native: Docker, Kubernetes, Service Mesh, CI/CD'
        },
        'skill_4': {
            zh: '数据库：MySQL、PostgreSQL、Redis、MongoDB、Elasticsearch',
            en: 'Database: MySQL, PostgreSQL, Redis, MongoDB, Elasticsearch'
        },
        'skill_5': {
            zh: '架构设计：DDD、事件驱动、CQRS、六边形架构',
            en: 'Architecture: DDD, Event-driven, CQRS, Hexagonal architecture'
        },
        'experience_title': {
            zh: '工作经历',
            en: 'Work Experience'
        },
        'exp_1_title': {
            zh: '2020年至今 - 某一线互联网公司 | 高级架构师',
            en: '2020-Present - Top-tier Internet Company | Senior Architect'
        },
        'exp_1_desc': {
            zh: '负责公司核心业务系统的架构设计与演进，主导了从单体架构到微服务架构的转型。',
            en: 'Responsible for core business system architecture design and evolution, led the transformation from monolithic to microservices architecture.'
        },
        'exp_2_title': {
            zh: '2016-2020年 - 某金融科技公司 | 技术专家',
            en: '2016-2020 - FinTech Company | Tech Expert'
        },
        'exp_2_desc': {
            zh: '负责交易系统的架构设计，优化系统性能，将系统的吞吐量提升了300%。',
            en: 'Responsible for trading system architecture design, optimized system performance, improved throughput by 300%.'
        },
        'exp_3_title': {
            zh: '2013-2016年 - 某软件公司 | 高级开发工程师',
            en: '2013-2016 - Software Company | Senior Developer'
        },
        'exp_3_desc': {
            zh: '参与多个企业级项目的开发，积累了丰富的业务系统开发经验。',
            en: 'Participated in multiple enterprise projects, accumulated rich business system development experience.'
        },
        
        // Contact page
        'contact_title': {
            zh: '联系我',
            en: 'Contact Me'
        },
        'contact_desc': {
            zh: '如果您有任何技术问题、合作意向或想交流技术，欢迎通过以下方式联系我',
            en: 'If you have any technical questions, collaboration ideas, or just want to chat about tech, feel free to contact me'
        },
        'keep_in_touch': {
            zh: '保持联系',
            en: 'Keep in Touch'
        },
        'keep_in_touch_desc': {
            zh: '我乐于与同行交流技术，分享经验。如果您有技术问题、合作机会，或者只是想聊聊天，请随时联系我。',
            en: 'I enjoy connecting with peers and sharing experiences. If you have technical questions, collaboration opportunities, or just want to chat, please reach out.'
        },
        'email': {
            zh: '电子邮件',
            en: 'Email'
        },
        'email_address': {
            zh: 'contact@codeblog.dev',
            en: 'contact@codeblog.dev'
        },
        'github': {
            zh: 'GitHub',
            en: 'GitHub'
        },
        'github_url': {
            zh: 'github.com/code-architect',
            en: 'github.com/code-architect'
        },
        'twitter': {
            zh: 'Twitter',
            en: 'Twitter'
        },
        'twitter_handle': {
            zh: '@code_architect',
            en: '@code_architect'
        },
        'linkedin': {
            zh: 'LinkedIn',
            en: 'LinkedIn'
        },
        'linkedin_url': {
            zh: 'linkedin.com/in/code-architect',
            en: 'linkedin.com/in/code-architect'
        },
        'send_message': {
            zh: '发送消息',
            en: 'Send Message'
        },
        'form_name': {
            zh: '姓名 *',
            en: 'Name *'
        },
        'form_email': {
            zh: '邮箱 *',
            en: 'Email *'
        },
        'form_subject': {
            zh: '主题',
            en: 'Subject'
        },
        'form_message': {
            zh: '消息 *',
            en: 'Message *'
        },
        'send_button': {
            zh: '发送消息',
            en: 'Send Message'
        },
        'message_sent': {
            zh: '消息已发送！我会尽快回复您。',
            en: 'Message sent! I will get back to you soon.'
        },
        
        // Articles page
        'article_categories_desc': {
            zh: '我们按照技术领域对文章进行了分类，方便您快速找到感兴趣的内容。',
            en: 'We have categorized articles by technical domain to help you quickly find content of interest.'
        },
        
        // Statistics
        'stats_title': {
            zh: '阅读统计',
            en: 'Reading Stats'
        },
        'total_views': {
            zh: '总阅读',
            en: 'Total Views'
        },
        'total_articles': {
            zh: '篇文章',
            en: 'Articles'
        },
        'popular_posts': {
            zh: '热门文章',
            en: 'Popular Posts'
        },
        'reading_time': {
            zh: '{time} 分钟阅读',
            en: '{time} min read'
        },
        
        // Footer
        'about_site': {
            zh: '关于本站',
            en: 'About This Site'
        },
        'about_site_desc': {
            zh: '分享软件开发、架构设计与技术管理方面的经验与思考，专注于Java生态与云原生技术。',
            en: 'Sharing experiences and thoughts on software development, architecture design, and tech management, focusing on Java ecosystem and cloud-native technologies.'
        },
        'quick_links': {
            zh: '快速链接',
            en: 'Quick Links'
        },
        'quick_home': {
            zh: '首页',
            en: 'Home'
        },
        'quick_articles': {
            zh: '所有文章',
            en: 'All Articles'
        },
        'quick_about': {
            zh: '关于作者',
            en: 'About Author'
        },
        'quick_projects': {
            zh: '项目展示',
            en: 'Projects'
        },
        'tech_categories': {
            zh: '技术分类',
            en: 'Tech Categories'
        },
        'contact_us': {
            zh: '联系我',
            en: 'Contact'
        },
        'contact_footer_desc': {
            zh: '如有技术问题或合作意向，欢迎通过邮件联系。',
            en: 'For technical questions or collaboration inquiries, please email me.'
        },
        'copyright': {
            zh: '© 2026 代码之韵博客. 保留所有权利.',
            en: '© 2026 Code Rhythm Blog. All rights reserved.'
        },
        
        // Modal
        'close': {
            zh: '关闭',
            en: 'Close'
        },
        
        // Date formatting
        'year_suffix': {
            zh: '年',
            en: ''
        },
        'month_suffix': {
            zh: '月',
            en: '/'
        },
        'day_suffix': {
            zh: '日',
            en: ''
        }
    },
    
    /**
     * Get translation for a key
     * @param {string} key - Translation key
     * @param {object} params - Parameters for interpolation
     * @returns {string} Translated text
     */
    t(key, params = {}) {
        const translation = this.translations[key];
        if (!translation) {
            console.warn(`Missing translation key: ${key}`);
            return key;
        }
        
        let text = translation[this.currentLang] || translation['en'] || key;
        
        // Interpolate parameters
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        
        return text;
    },
    
    /**
     * Set current language
     * @param {string} lang - Language code ('zh' or 'en')
     */
    setLanguage(lang) {
        if (this.languages[lang]) {
            this.currentLang = lang;
            localStorage.setItem('blog-lang', lang);
            this.updatePageLanguage();
            
            // Update HTML lang attribute
            document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
            
            // Dispatch event for other components
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        }
    },
    
    /**
     * Update all elements with data-i18n attribute
     */
    updatePageLanguage() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (key) {
                const translation = this.t(key);
                
                // Check if element has child elements (preserve structure)
                if (element.children.length === 0) {
                    element.textContent = translation;
                } else {
                    // For elements with children, only update text nodes
                    this.updateTextNodes(element, translation);
                }
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (key) {
                element.placeholder = this.t(key);
            }
        });
        
        // Update language switcher
        this.updateLanguageSwitcher();
        
        // Update document title
        this.updateDocumentTitle();
    },
    
    /**
     * Update text nodes while preserving child elements
     */
    updateTextNodes(element, text) {
        // Find the first text node and update it
        for (let i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeType === Node.TEXT_NODE) {
                element.childNodes[i].textContent = text;
                return;
            }
        }
        // If no text node found, prepend one
        element.insertBefore(document.createTextNode(text), element.firstChild);
    },
    
    /**
     * Update language switcher UI
     */
    updateLanguageSwitcher() {
        const switcher = document.getElementById('languageSwitcher');
        if (switcher) {
            const currentFlag = this.languages[this.currentLang].flag;
            const currentName = this.languages[this.currentLang].name;
            switcher.innerHTML = `${currentFlag} ${currentName} <i class="fas fa-chevron-down"></i>`;
        }
    },
    
    /**
     * Update document title based on current page
     */
    updateDocumentTitle() {
        const pageTitles = {
            'home': this.t('nav_home'),
            'articles': this.t('nav_articles'),
            'architecture': this.t('nav_architecture'),
            'projects': this.t('nav_projects'),
            'about': this.t('nav_about'),
            'contact': this.t('nav_contact')
        };
        
        const activePage = document.querySelector('.page.active');
        if (activePage) {
            const pageId = activePage.id.replace('-page', '');
            const pageTitle = pageTitles[pageId] || '';
            const siteName = this.currentLang === 'zh' ? '代码之韵' : 'Code Rhythm';
            document.title = pageTitle ? `${pageTitle} - ${siteName}` : siteName;
        }
    },
    
    /**
     * Format date based on current language
     * @param {string} dateStr - Date string (YYYY-MM-DD)
     * @returns {string} Formatted date
     */
    formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        if (this.currentLang === 'zh') {
            return `${year}年${month}月${day}日`;
        } else {
            return `${year}/${month}/${day}`;
        }
    },
    
    /**
     * Get category name in current language
     * @param {string} category - Category key
     * @returns {string} Localized category name
     */
    getCategoryName(category) {
        const key = `category_${category}`;
        return this.translations[key] ? this.t(key) : category;
    },
    
    /**
     * Initialize i18n system
     */
    init() {
        // Set initial language
        document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en';
        
        // Update page on load
        this.updatePageLanguage();
        
        // Listen for language change events
        window.addEventListener('languageChanged', () => {
            this.updatePageLanguage();
        });
        
        console.log(`i18n initialized with language: ${this.currentLang}`);
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
}
