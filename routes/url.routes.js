const express = require("express");

const router = express.Router();
let urls = [];

router.post("/shorten", (req, res) => {
    const { originalURL } = req.body;
    if (!originalURL) {
        return res.status(400).json({ message: "URLni kiriting!" });
    }

    const code = Math.random().toString(36).substr(2, 6);
    urls.push({ originalURL, code, createdAt: new Date(), viewersCount: 0 });

    res.json({ shortURL: `http://localhost:${process.env.APP_PORT}/${code}` });
});

router.get("/:code", (req, res) => {
    const url = urls.find((u) => u.code === req.params.code);
    if (url) {
        url.viewersCount += 1;
        return res.redirect(url.originalURL);
    }
    res.status(404).json({ message: "URL topilmadi!" });
});

module.exports = router;

