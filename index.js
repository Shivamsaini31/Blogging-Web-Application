import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { serialize } from "v8";
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "temp/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, "thumbnail" + ext);
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.render("index", {
    category: "Home",
  });
});

app.get("/createBlog", (req, res) => {
  res.render("createBlog", {
    category: "None",
  });
});

app.get("/:category", (req, res) => {
  const category = req.params.category;
  const categoryPath = path.join("submissions", category);
  fs.readdir(categoryPath, (err, authors) => {
    if (err) return res.status(404).send("Category not found!");
    let blogs = [];
    let sz = authors.length;
    if (!sz)
      res.render("categoryWiseBlogs.ejs", {
        category: category,
        blogs:[],
      });
    authors.forEach((author) => {
      const authorPath = path.join(categoryPath, author);
      fs.readdir(authorPath, (err, titles) => {
        if (titles) {
          titles.forEach((title) => {
            blogs.push({
              author,
              title,
              path: path.join(authorPath, title),
            });
          });
        }
        sz--;
      if (sz == 0) {
        console.log(blogs);
        res.render("categoryWiseBlogs", {
          category: category,
          blogs:blogs,
        });
      }
      });
      
    });
  });
});
app.post("/submitBlog", upload.single("thumbnail"), (req, res) => {
  console.log(req.body);
  const title = req.body["title"].trim();
  const safeTitle = title.replace(/[<>:"\/\\|?*]+/g, "_");
  const category = req.body["categories"].trim();
  const author = req.body["author"].trim();
  const _dirname = path.join("submissions", category, author, safeTitle);
  const oldPath = req.file.path;
  const newPath = _dirname + "/" + req.file.filename;
  var content = req.body["blogContent"];
  fs.mkdir(_dirname, { recursive: true }, (err) => {
    if (err) return res.status(500).send("Error creating directory: " + err);

    fs.rename(oldPath, newPath, (err) => {
      if (err) return res.status(500).send("Error moving file: ", err);
      fs.writeFile(_dirname + "/blogContent.txt", content, (err) => {
        if (err) return res.status(500).send("Error writing file: " + err);
        res.send("Blog and Image saved successfully!");
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Listening at port ${port}.`);
});
