import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
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
  res.render("createBlog");
});

app.get("/Technology", (req, res) => {
  res.render("categoryWiseBlogs", {
    category: "Technology",
  });
});
app.get("/World", (req, res) => {
  res.render("categoryWiseBlogs", {
    category: "World",
  });
});
app.get("/Culture", (req, res) => {
  res.render("categoryWiseBlogs", {
    category: "Culture",
  });
});
app.get("/Politics", (req, res) => {
  res.render("categoryWiseBlogs", {
    category: "Politics",
  });
});
app.get("/Design", (req, res) => {
  res.render("categoryWiseBlogs", {
    category: "Design",
  });
});
app.get("/Business", (req, res) => {
  res.render("categoryWiseBlogs", {
    category: "Business",
  });
});

app.post("/submitBlog", upload.single("thumbnail"), (req, res) => {
  console.log(req.body);
  const title = req.body["title"].trim();
  const category = req.body["categories"].trim();
  const author = req.body["author"].trim();
  const _dirname = "submissions" + "/" + category + "/" + author;
  const oldPath = req.file.path;
  const newPath = _dirname + "/" + req.file.filename;
  var content = req.body["blogContent"];
  fs.mkdir(_dirname, { recursive: true }, (err) => {
    if (err) return res.status(500).send("Error creating directory: " + err);

    fs.rename(oldPath, newPath, (err) => {
      if (err) return res.status(500).send("Error moving file: ", err);
      fs.writeFile(_dirname + "/" + title + ".txt", content, (err) => {
        if (err) return res.status(500).send("Error writing file: " + err);
        res.send("Blog and Image saved successfully!");
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Listening at port ${port}.`);
});
