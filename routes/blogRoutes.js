import express from "express";
import {getBlog, createBlog, updateBlog, deleteBlog,getCategoryBlog} from "../controllers/blogControllers.js"

const router=express.Router();
router.get("/:category",getCategoryBlog)
router.get("/:id",getBlog);
router.post("/",createBlog);
router.put("/:id",updateBlog);
router.delete("/:id",deleteBlog);

export default router;