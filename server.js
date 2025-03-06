const express = require("express");
const path = require("path");
const config = require("./config/app.config");
const userRoutes = require("./routes/user.routes");
const blogRoutes = require("./routes/blog.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

app.use((req, res) => {
    res.status(404).render("404", { message: "Sahifa topilmadi!" });
});

app.listen(config.APP_PORT, () => console.log(`Server ${config.APP_PORT}-portda ishlayapti...`));
