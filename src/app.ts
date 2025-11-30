import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import methodOverride from "method-override";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import "express-session";
import dotenv from "dotenv";
import indexRoutes from "./routes/viewRoutes";

dotenv.config();
declare module "express-session" {
    interface SessionData {
        user?: {
            username: string;
            uuid: string;
        };
    }
}
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

export default app;
