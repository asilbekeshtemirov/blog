const fs = require("fs");
const path = require("path");
const blogsFile = path.join(__dirname, "../data/blogs.json");

const getBlogs = () => {
    if (!fs.existsSync(blogsFile)) return [];
    const data = fs.readFileSync(blogsFile);
    return JSON.parse(data);
};

const saveBlogs = (blogs) => {
    fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2));
};

const addBlog = (blog) => {
    const blogs = getBlogs();
    blogs.push(blog);
    saveBlogs(blogs);
    return blog;
};

module.exports = { getBlogs, addBlog };
