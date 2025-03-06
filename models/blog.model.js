const fs = require('fs');
const path = require('path');
const blogFilePath = path.join(__dirname, '../data/blog.json');

const getBlogs = () => {
    const data = fs.readFileSync(blogFilePath);
    return JSON.parse(data);
};

const addBlog = (blog) => {
    const blogs = getBlogs();
    blogs.push(blog);
    fs.writeFileSync(blogFilePath, JSON.stringify(blogs, null, 2));
};

const updateBlog = (id, updatedData) => {
    let blogs = getBlogs();
    blogs = blogs.map(blog => blog.id === id ? { ...blog, ...updatedData } : blog);
    fs.writeFileSync(blogFilePath, JSON.stringify(blogs, null, 2));
};

const deleteBlog = (id) => {
    let blogs = getBlogs();
    blogs = blogs.filter(blog => blog.id !== id);
    fs.writeFileSync(blogFilePath, JSON.stringify(blogs, null, 2));
};

module.exports = { getBlogs, addBlog, updateBlog, deleteBlog };