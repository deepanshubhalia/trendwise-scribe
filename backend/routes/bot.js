import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Mock article templates for variety
const mockTemplates = [
    {
        title: "The Future of Web Development",
        excerpt: "Exploring emerging trends and technologies that will shape the future of web development.",
        content: "<h2>The Evolution of Web Development</h2><p>Web development is constantly evolving, with new technologies and methodologies emerging every year. From the rise of JavaScript frameworks to the adoption of WebAssembly, the landscape is changing rapidly.</p><p>Developers need to stay updated with the latest trends to remain competitive in this fast-paced industry. The future belongs to those who can adapt and learn quickly.</p><h3>Key Trends to Watch</h3><ul><li>Progressive Web Apps (PWAs)</li><li>WebAssembly for performance</li><li>AI-powered development tools</li><li>Micro-frontend architecture</li></ul>"
    },
    {
        title: "Mastering TypeScript in 2024",
        excerpt: "A comprehensive guide to TypeScript best practices and advanced features for modern development.",
        content: "<h2>Why TypeScript Matters</h2><p>TypeScript has become the de facto standard for large-scale JavaScript applications. Its type system helps catch errors early and provides better developer experience through enhanced IDE support.</p><p>With the latest features like template literal types and improved inference, TypeScript continues to evolve and provide better tooling for developers.</p><h3>Advanced TypeScript Features</h3><ul><li>Template literal types</li><li>Conditional types</li><li>Mapped types</li><li>Utility types</li></ul>"
    },
    {
        title: "Building Scalable APIs with Node.js",
        excerpt: "Learn how to design and implement scalable REST APIs using Node.js and Express.",
        content: "<h2>API Design Principles</h2><p>Building scalable APIs requires careful planning and adherence to best practices. From proper error handling to efficient database queries, every aspect matters.</p><p>Node.js provides excellent tools for building high-performance APIs, but it's crucial to understand the underlying principles of good API design.</p><h3>Best Practices</h3><ul><li>RESTful design patterns</li><li>Proper error handling</li><li>Authentication and authorization</li><li>Rate limiting and caching</li></ul>"
    },
    {
        title: "CSS Grid vs Flexbox: When to Use What",
        excerpt: "A detailed comparison of CSS Grid and Flexbox to help you choose the right layout method.",
        content: "<h2>Understanding Layout Systems</h2><p>CSS Grid and Flexbox are powerful layout systems that solve different problems. Understanding when to use each is crucial for creating responsive and maintainable layouts.</p><p>While Flexbox is great for one-dimensional layouts, CSS Grid excels at two-dimensional layouts. The key is knowing which tool to use for the job.</p><h3>When to Use Each</h3><ul><li>Flexbox: One-dimensional layouts</li><li>CSS Grid: Two-dimensional layouts</li><li>Combining both for complex layouts</li><li>Browser support considerations</li></ul>"
    },
    {
        title: "Optimizing React Performance",
        excerpt: "Advanced techniques for optimizing React application performance and reducing bundle size.",
        content: "<h2>Performance Optimization Strategies</h2><p>React applications can become slow as they grow in complexity. Understanding performance optimization techniques is essential for maintaining a smooth user experience.</p><p>From code splitting to memoization, there are many strategies to improve React performance. The key is identifying bottlenecks and applying the right solutions.</p><h3>Optimization Techniques</h3><ul><li>Code splitting and lazy loading</li><li>React.memo and useMemo</li><li>Virtual scrolling for large lists</li><li>Bundle size optimization</li></ul>"
    }
];

// 🧪 Mock article generator
router.post("/generate", async (req, res) => {
    try {
        // Get a random template
        const randomTemplate = mockTemplates[Math.floor(Math.random() * mockTemplates.length)];
        
        // Generate unique ID and slug
        const id = uuidv4();
        const timestamp = Date.now();
        const slug = `mock-article-${timestamp}`;
        
        // Create mock article
        const mockArticle = {
            _id: id,
            title: randomTemplate.title,
            slug: slug,
            excerpt: randomTemplate.excerpt,
            content: randomTemplate.content,
            coverImage: `https://source.unsplash.com/random/800x450?${encodeURIComponent(randomTemplate.title)}`,
            createdAt: new Date().toISOString(),
            isMock: true // Flag to identify mock articles
        };

        // Add to articles array using the function from app.locals
        const addArticle = req.app.locals.addArticle;
        const storedArticle = addArticle(mockArticle);
        
        res.json({
            success: true,
            message: "Mock article generated and stored successfully",
            article: storedArticle
        });
        
    } catch (error) {
        console.error('Error generating mock article:', error);
        res.status(500).json({
            success: false,
            message: "Failed to generate mock article",
            error: error.message
        });
    }
});

// Get mock article templates (for admin UI)
router.get("/templates", (req, res) => {
    res.json({
        success: true,
        templates: mockTemplates.map((template, index) => ({
            id: index,
            title: template.title,
            excerpt: template.excerpt
        }))
    });
});

export default router; 