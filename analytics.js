/**
 * Google Analytics 4 Tracking Module
 * Replaces localStorage-based tracking with GA4
 */

const Analytics = {
    // GA Measurement ID - Update this with your actual ID
    measurementId: 'G-FJBKJ8ZPVT',
    
    // Check if GA is loaded
    isAvailable() {
        return typeof gtag !== 'undefined';
    },
    
    /**
     * Track a page view
     * @param {string} pageName - Name of the page (e.g., 'home', 'articles', 'post-detail')
     * @param {string} pageTitle - Title to display in GA
     */
    trackPageView(pageName, pageTitle) {
        if (!this.isAvailable()) {
            console.warn('Google Analytics not loaded');
            return;
        }
        
        gtag('event', 'page_view', {
            page_title: pageTitle,
            page_location: window.location.href,
            page_path: `/blog/${pageName}`,
            send_to: this.measurementId
        });
        
        console.log(`[GA] Page view: ${pageName} - ${pageTitle}`);
    },
    
    /**
     * Track when a post is viewed
     * @param {string} postId - Post ID
     * @param {string} postTitle - Post title
     * @param {string} category - Post category
     */
    trackPostView(postId, postTitle, category) {
        if (!this.isAvailable()) return;
        
        gtag('event', 'view_item', {
            item_id: postId,
            item_name: postTitle,
            item_category: category,
            content_type: 'blog_post',
            send_to: this.measurementId
        });
        
        // Also track as a custom event for better reporting
        gtag('event', 'post_view', {
            post_id: postId,
            post_title: postTitle,
            category: category,
            send_to: this.measurementId
        });
        
        console.log(`[GA] Post view: ${postTitle}`);
    },
    
    /**
     * Track search queries
     * @param {string} query - Search query
     * @param {number} resultsCount - Number of results found
     */
    trackSearch(query, resultsCount) {
        if (!this.isAvailable()) return;
        
        gtag('event', 'search', {
            search_term: query,
            results_count: resultsCount,
            send_to: this.measurementId
        });
        
        console.log(`[GA] Search: "${query}" (${resultsCount} results)`);
    },
    
    /**
     * Track language switch
     * @param {string} fromLang - Previous language
     * @param {string} toLang - New language
     */
    trackLanguageSwitch(fromLang, toLang) {
        if (!this.isAvailable()) return;
        
        gtag('event', 'language_change', {
            from_language: fromLang,
            to_language: toLang,
            send_to: this.measurementId
        });
        
        console.log(`[GA] Language switch: ${fromLang} -> ${toLang}`);
    },
    
    /**
     * Track category filter usage
     * @param {string} category - Selected category
     */
    trackCategoryFilter(category) {
        if (!this.isAvailable()) return;
        
        gtag('event', 'select_content', {
            content_type: 'category_filter',
            item_id: category,
            send_to: this.measurementId
        });
        
        console.log(`[GA] Category filter: ${category}`);
    },
    
    /**
     * Track contact form submission
     * @param {boolean} success - Whether submission was successful
     */
    trackContactSubmit(success) {
        if (!this.isAvailable()) return;
        
        gtag('event', success ? 'form_submit' : 'form_error', {
            form_name: 'contact_form',
            form_id: 'contactForm',
            send_to: this.measurementId
        });
        
        console.log(`[GA] Contact form: ${success ? 'submitted' : 'error'}`);
    },
    
    /**
     * Track reading time
     * @param {string} postId - Post ID
     * @param {number} minutes - Time spent reading in minutes
     */
    trackReadingTime(postId, minutes) {
        if (!this.isAvailable()) return;
        
        gtag('event', 'timing_complete', {
            name: 'read_article',
            value: Math.round(minutes * 60), // Convert to seconds
            event_category: 'engagement',
            event_label: postId,
            send_to: this.measurementId
        });
    },
    
    /**
     * Track engagement (scroll depth, time on page, etc.)
     * @param {string} metric - Metric name
     * @param {number} value - Metric value
     */
    trackEngagement(metric, value) {
        if (!this.isAvailable()) return;
        
        gtag('event', 'user_engagement', {
            engagement_type: metric,
            engagement_value: value,
            send_to: this.measurementId
        });
    },
    
    /**
     * Initialize analytics tracking
     */
    init() {
        if (!this.isAvailable()) {
            console.warn('Google Analytics not available. Please set up GA_MEASUREMENT_ID');
            return;
        }
        
        console.log('[Analytics] Initialized with GA4');
        
        // Track initial page view
        this.trackPageView('home', '代码之韵 - 程序员博客');
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Analytics;
}
