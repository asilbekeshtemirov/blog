const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersFile = path.join(__dirname, "../data/users.json");

const readUsers = () => {
    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, JSON.stringify([])); 
    }
    return JSON.parse(fs.readFileSync(usersFile, "utf-8"));
};

const writeUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

router.get("/", (req, res) => {
    const users = readUsers();
    res.json(users);
});

router.post("/add", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Barcha maydonlarni to‘ldiring!" });
    }

    const users = readUsers();
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: "Foydalanuvchi qo‘shildi!", user: newUser });
});

router.delete("/:id", (req, res) => {
    const users = readUsers();
    const filteredUsers = users.filter(user => user.id !== parseInt(req.params.id));

    if (users.length === filteredUsers.length) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi!" });
    }

    writeUsers(filteredUsers);
    res.json({ message: "Foydalanuvchi o‘chirildi!" });
});

module.exports = router;
