const fs = require("fs");
const path = require("path");

const readFile = (filePath) => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, "..", filePath), "utf-8"));
};

const writeFile = (filePath, data) => {
    fs.writeFileSync(path.join(__dirname, "..", filePath), JSON.stringify(data, null, 2));
};

module.exports = { readFile, writeFile };
