const express = require("express");
const router = express.Router();
const { listBlogs, createBlog } = require("../controller_files/blog.controller");

let blogs = [];

router.get("/", (req, res) => {
    res.render("blog", { blogs });
});

router.post("/add", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Barcha maydonlarni to'ldiring!" });
    }
    
    blogs.push({ title, content, createdAt: new Date(), viewsCount: 0 });
    res.status(201).json({ message: "Blog muvaffaqiyatli qo'shildi!" });
});

module.exports = router;
