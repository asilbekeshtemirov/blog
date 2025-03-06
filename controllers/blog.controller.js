const fs = require("fs");
const path = require("path");
const blogsFilePath = path.join(__dirname, "../data/blog.json");

const getBlogs = () => {
    const data = fs.readFileSync(blogsFilePath);
    return JSON.parse(data);
};

const saveBlogs = (blogs) => {
    fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2));
};

const getAllBlogs = (req, res) => {
    res.json(getBlogs());
};

const createBlog = (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Barcha maydonlarni to‘ldiring!" });
    }
    const blogs = getBlogs();
    const newBlog = { id: Date.now(), title, content };
    blogs.push(newBlog);
    saveBlogs(blogs);
    res.status(201).json({ message: "Blog qo'shildi!" });
};

module.exports = { getAllBlogs, createBlog };
