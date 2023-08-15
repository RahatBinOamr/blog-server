const express = require('express');
const {
  createBlog,
  findBlogs,
  findSingleBlog,
  updateBlog,
  deleteBlog,
} = require('./blogController');

const router = express.Router();

router.post('/', createBlog).get('/', findBlogs);

router
  .get('/:id', findSingleBlog)
  .put('/:id', updateBlog)
  .delete('/:id', deleteBlog);
module.exports = router;
