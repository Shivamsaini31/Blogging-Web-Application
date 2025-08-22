import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import {sql} from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import { getHomePage } from "./controllers/blogControllers.js";
import morgan from "morgan"

const _fileName = fileURLToPath(import.meta.url);
const _dirName = dirname(_fileName);
const app = express();


dotenv.config();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(_dirName, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.get("/", getHomePage);
app.use("/api/blogs", blogRoutes);
app.use("/blogs", blogRoutes);

async function initDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS blogs(
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        image TEXT NOT NULL,
        blogContent TEXT NOT NULL,
        category TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `
    console.log("Database initialized succesfully!");
  } catch (error) {
    console.log("Error initializing DB: ", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}.`);
  });
});

