const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");

const getUsers = () => {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const register = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Barcha maydonlarni to‘ldiring!" });
    }
    const users = getUsers();
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "Bu email allaqachon mavjud!" });
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    saveUsers(users);
    res.status(201).json({ message: "Foydalanuvchi ro'yxatdan o'tdi!" });
};

const login = (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(400).json({ message: "Email yoki parol noto‘g‘ri!" });
    }
    res.json({ message: "Tizimga kirdingiz!" });
};

module.exports = { register, login };
