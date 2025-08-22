import { sql } from "../config/db.js";

export const getHomePage = async(req, res) => {
  try {
    const blogs=await sql `
    SELECT * FROM blogs
    ORDER BY created_at DESC
    LIMIT 2
    `
    res.render("index", {
      category: "Home",
      blogs: blogs,
    });
  } catch (error) {
    console.log("Error loading Home Page: ", error);
    res.sendStatus(500);
  }
};

export const getCategoryBlog = async (req, res) => {
  const { category } = req.params;
  console.log (category);
  try {
    const blogs = await sql`
    SELECT * FROM blogs
    WHERE category=${category}
    ORDER BY created_at DESC
    `;

    res.render("CategoryWiseBlogs",{
        category:category,
        blogs:blogs,
    });
  } catch (error) {
    console.log (`Error in fetching blogs for category ${category}: `,error);
    res.sendStatus(404);
  }
};
// need to update view blog or getBlog function after creating viewBlog.ejs
export const getBlog = async (req, res) => {
    const {id}=req.params;
  try {
    const blog = await sql`
        SELECT * FROM blogs
        WHERE id=${id}
        `;
    console.log("Fetched blog: ", blog);
    
    res.status(200).render("");
  } catch (error) {
    console.log("Error fetching blog: ", error);
    res.status(500).send("Internal server error!");
  }
};

export const getCreateBlog=(req,res)=>{
    try {
    res.render("createBlog", {
      category: "none",
    });
  } catch (error) {
    console.log("Error loading Home Page: ", error);
    res.sendStatus(500);
  }
}

export const createBlog = async (req, res) => {
    console.log(req.body);
    const {author, blogcontent, image, category,title}=req.body;
    if (!title || !author|| !blogcontent || !category ||!image) {
        return res.status(400).send("All fields are required");
    }
    // const image=req.file.buffer;
    // console.log("Body: ",req.body);
    // console.log("image: ",req.file);
    try {
        const submittedBlog=await sql `
        INSERT INTO blogs(title, author, image, blogcontent, category )
        VALUES (${title},${author},${image},${blogcontent},${category})
        RETURNING *
        `
        console.log(submittedBlog);
        res.render("checkBlog",{
            submittedBlog:submittedBlog[0].id,
            category:"none",
        })
    } catch (error) {
        console.log("Error in submitting blog: ",error);
        return res.status(500).send("Internal Server error!");
    }
};

export const deleteBlog = async (req, res) => {
    const {id}=req.params;
    
    try {
        const deleteBlog=await sql `
    DELETE FROM blogs WHERE id=${id} 
    RETURNING *`
    if(deleteBlog.length===0){
        return res.status(404).send("Blog does not exists!")
    }
    const blogs = await sql`
    SELECT * FROM blogs
    WHERE category = ${deleteBlog[0].category}
    ORDER BY created_at DESC
`;
    res.render("CategoryWiseBlogs",{
        category:deleteBlog[0].category,
        blogs:blogs,
    })
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error!"})
    }

};

export const updateBlog = async (req, res) => {
    const {id}=req.params;
    const {title, author,image, blogcontent,category}=req.body;
    if (!title || !author || !image || !blogcontent || !category) {
        return res.status(400).send("All fields are required");
    }
    try {
        const updatedBlog=await sql `
        UPDATE blogs
        SET title=${title},author=${author},image= ${image},blogcontent=${blogcontent},category=${category}
        WHERE id=${id}
        RETURNING *
        `;
        if(updatedBlog.length===0){
            console.log("No such blog found!")
            return res.status(404).send("No such blog found!");
        }
        res.redirect(`/api/blogs/${updatedBlog[0].category}`);
    } catch (error) {
        console.log("Error in updating blog: ",error);
        res.status(500).send("Unable to update blog at this moment!");
    }
};


