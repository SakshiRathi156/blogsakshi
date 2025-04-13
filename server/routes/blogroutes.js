const express = require('express')
const mongoose = require('mongoose')
const Blog = require('../models/schema')

const router = express.Router()
const { getAllBlogs, createNewBlog, deleteBlog, updateBlog, singleBlog } = require('../controllers/blogcontroller');

// Add debugging middleware
router.use((req, res, next) => {
    console.log('Route hit:', req.method, req.path);
    next();
});

router.get('/api/v1/allblogs', getAllBlogs)
router.post('/api/v1/blog', createNewBlog)
router.delete('/api/v1/blog/:id', deleteBlog)
router.patch('/api/v1/blog/:id', updateBlog)
router.get('/api/v1/singleblog/:id', singleBlog)
module.exports = router;