const { getBlogs, addBlog } = require("../models/blog.model");

const listBlogs = (req, res) => {
    res.json(getBlogs());
};

const createBlog = (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Barcha maydonlarni to‘ldiring!" });
    }
    const newBlog = { id: Date.now(), title, content, createdAt: new Date() };
    addBlog(newBlog);
    res.status(201).json(newBlog);
};

module.exports = { listBlogs, createBlog };
