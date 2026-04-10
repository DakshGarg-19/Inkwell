import React, { createContext, useState, useEffect } from 'react';

export const BlogContext = createContext();

const sampleBlogs = [
  {
    "id": "1",
    "title": "Getting Started with React Hooks",
    "content": "React Hooks revolutionized the way we write React components. Introduced in React 16.8, Hooks allow you to use state and other React features without writing a class component.\n\n## Why Hooks?\n\nBefore Hooks, if you wanted to use state in a component, you had to use a class component. This led to complex lifecycle methods and hard-to-follow code.\n\n### The useState Hook\n\nThe most basic Hook is useState. It lets you add state to functional components:\n\n```javascript\nconst [count, setCount] = useState(0);\n```\n\n### The useEffect Hook\n\nuseEffect lets you perform side effects in your components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined.\n\n## Conclusion\n\nHooks make React code more readable, reusable, and easier to test. They represent the future of React development.",
    "excerpt": "Learn how React Hooks can simplify your component logic and make your code more reusable.",
    "authorId": "author-1",
    "authorName": "Sarah Chen",
    "published": true,
    "tags": ["React", "JavaScript", "Web Development"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "2",
    "title": "Building Scalable APIs with Node.js",
    "content": "Creating scalable APIs is crucial for modern web applications. Node.js provides excellent tools for building fast, efficient backend services.\n\n## Architecture Patterns\n\nWhen building APIs, consider these patterns:\n\n### RESTful Design\nFollow REST principles for predictable, standardized endpoints.\n\n### Middleware Pattern\nUse middleware for authentication, logging, and error handling.\n\n### Database Optimization\nImplement proper indexing and query optimization for better performance.\n\n## Best Practices\n\n1. Use environment variables for configuration\n2. Implement proper error handling\n3. Add rate limiting for security\n4. Use caching strategically\n\n## Conclusion\n\nA well-designed API forms the backbone of any modern application.",
    "excerpt": "Explore best practices for creating robust and scalable REST APIs using Node.js and Express.",
    "authorId": "author-1",
    "authorName": "Sarah Chen",
    "published": true,
    "tags": ["Node.js", "API", "Backend"],
    "createdAt": "2024-01-20T14:00:00Z",
    "updatedAt": "2024-01-22T09:15:00Z"
  },
  {
    "id": "3",
    "title": "The Art of Clean Code",
    "content": "Writing clean code is more than just making it work—it's about making it understandable and maintainable.\n\n## Principles of Clean Code\n\n### Meaningful Names\nVariables, functions, and classes should have descriptive names that reveal intent.\n\n### Small Functions\nFunctions should do one thing and do it well. Keep them small and focused.\n\n### Comments\nGood code often doesn't need comments. When you do write them, explain why, not what.\n\n## Code Smells to Avoid\n\n- Long methods\n- Large classes\n- Feature envy\n- Data clumps\n\n## Refactoring\n\nRegular refactoring keeps your codebase healthy. Don't be afraid to improve existing code.\n\n## Conclusion\n\nClean code is a skill that improves with practice. Read other people's code, and always be willing to learn.",
    "excerpt": "Discover the principles and practices that separate good code from great code.",
    "authorId": "author-2",
    "authorName": "Marcus Johnson",
    "published": true,
    "tags": ["Programming", "Best Practices", "Software Engineering"],
    "createdAt": "2024-02-01T08:45:00Z",
    "updatedAt": "2024-02-01T08:45:00Z"
  }
];

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('todo')) {
      localStorage.removeItem('todo');
    }

    const storedBlogs = localStorage.getItem('blog');
    
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      localStorage.setItem('blog', JSON.stringify(sampleBlogs));
      setBlogs(sampleBlogs);
    }
  }, []);

  const addBlog = (newBlog) => {
    const updatedBlogs = [...blogs, newBlog];
    setBlogs(updatedBlogs);
    localStorage.setItem('blog', JSON.stringify(updatedBlogs));
  };

  const togglePublish = (id) => {
    const updatedBlogs = blogs.map(blog => 
      blog.id === id ? { ...blog, published: !blog.published, updatedAt: new Date().toISOString() } : blog
    );
    setBlogs(updatedBlogs);
    localStorage.setItem('blog', JSON.stringify(updatedBlogs));
  };

  const deleteBlog = (id) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem('blog', JSON.stringify(updatedBlogs));
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, togglePublish, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};
