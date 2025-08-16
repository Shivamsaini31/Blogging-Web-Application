import express from "express";
import {getBlog, getCreateBlog, createBlog, updateBlog, deleteBlog,getCategoryBlog} from "../controllers/blogControllers.js"

const router=express.Router();
router.get("/category/:category",getCategoryBlog)
router.get("/",getCreateBlog);
router.post("/createBlog",createBlog);
router.put("/:id",updateBlog);
router.delete("/:id",deleteBlog);
router.get("/:id",getBlog);

export default router;