import express from "express";
import fs from "fs";
import multer from "multer";
const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index",{
        category:"Home"
    });
});

app.get("/createBlog",(req,res)=>{
    res.render("createBlog");
});

app.get("/Technology",(req,res)=>{
    res.render("categoryWiseBlogs",{
        category:"Technology"
    });
});
app.get("/World",(req,res)=>{
    res.render("categoryWiseBlogs",{
        category:"World"
    });
});
app.get("/Culture",(req,res)=>{
    res.render("categoryWiseBlogs",{
        category:"Culture"
    });
});
app.get("/Politics",(req,res)=>{
    res.render("categoryWiseBlogs",{
        category:"Politics"
    });
});
app.get("/Design",(req,res)=>{
    res.render("categoryWiseBlogs",{
        category:"Design"
    });
});
app.get("/Business",(req,res)=>{
    res.render("categoryWiseBlogs",{
        category:"Business"
    });
});

app.post("/submitBlog",(req,res)=>{
    console.log(req.body);
    const title=req.body["title"];
    const category=req.body["categories"];
    const author=req.body["author"];
    const _dirname="submissions"+"/"+category+"/"+author;
    var content=req.body["blogContent"];
    fs.mkdir(_dirname, { recursive: true }, (err) => {
    if (err) return res.status(500).send("Error creating folder: " + err);
    fs.writeFile(_dirname+"/"+title+".txt", content, (err) => {
      if (err) return res.status(500).send("Error writing file: " + err);
      res.send("Blog saved successfully!");
    });
  });

});

app.listen(port,()=>{
    console.log(`Listening at port ${port}.`);
});
