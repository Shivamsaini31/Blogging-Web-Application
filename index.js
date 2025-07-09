import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import {dirname} from "path";
import  {fileURLToPath}  from "url";
const _fileName=fileURLToPath(import.meta.url);
const _dirName=dirname(_fileName);
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(_dirName, "public")));
// app.use('/submissions', express.static(path.join(__dirname, 'submissions')));
app.use("/submissions", express.static(path.join(_dirName,"submissions")));
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
  const categoryPath = path.join(_dirName,"submissions", category);
  fs.readdir(categoryPath, (err, authors) => {
    if (err) return res.status(404).send("Category not found!");
    let blogs = [];
    let sz = authors.length;
    if (!sz)
      res.render("categoryWiseBlogs.ejs", {
        category: category,
        blogs: [],
      });
    authors.forEach((author) => {
      const authorPath = path.join(categoryPath, author);
      fs.readdir(authorPath, (err, titles) => {
        if (titles) {
          let titleCount = titles.length;
          titles.forEach((title) => {
            fs.readFile(
              path.join(authorPath, title, "blogContent.txt"),
              (err, blogContent) => {
                blogs.push({
                  author: author,
                  title: title,
                  path: "/" + path.join(authorPath, title),
                  blogContent: blogContent,
                });
                titleCount--;
                if (titleCount === 0) sz--;
                if (sz === 0) {
                  console.log(blogs);
                  res.render("categoryWiseBlogs", {
                    category: category,
                    blogs: blogs,
                  });
                }
              }
            );
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
  const blogDir = path.join(_dirName,"submissions", category, author, safeTitle);
  const oldPath = req.file.path;
  const newPath = path.join(blogDir,req.file.filename);
  var content = req.body["blogContent"];
  fs.mkdir(blogDir, { recursive: true }, (err) => {
    if (err)
      return res.status(500).send("Error creating directory: " + err.message);

    fs.rename(oldPath, newPath, (err) => {
      if (err) return res.status(500).send("Error moving file: " + err.message);
      fs.writeFile(path.join(blogDir,"blogContent.txt"), content, (err) => {
        if (err)
          return res.status(500).send("Error writing file: " + err.message);
        res.send("Blog and Image saved successfully!");
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Listening at port ${port}.`);
});
