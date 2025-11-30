const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const methodOverride = require("method-override");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const dotenv = require("dotenv");
const indexRoutes = require("./routes/viewRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "supersecret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 }
    })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use("/", indexRoutes);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
