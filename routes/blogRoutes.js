const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.post('/blog', blogController.createBlog);
router.get('/blogs', blogController.getAllBlogs);
router.get('/blog/:slug', blogController.getBlogBySlug);
// Add routes for updating and deleting as well

module.exports = router;
