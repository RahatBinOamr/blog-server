const blogModel = require('./blogModel');

exports.createBlog = async (req, res) => {
  try {
    const blog = new blogModel(req.body);
    console.log(blog);
    const savedBlog = await blog.save();
    res.json({
      status: 'success',
      data: savedBlog,
      message: 'blog added successfully',
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findBlogs = async (req, res) => {
  const { search, category, page, limit } = req.query;
  const query = {};
  if (search) {
    query['$or'] = [
      { title: { $regex: search.toString(), $options: 'i' } },
      { authorName: { $regex: search.toString(), $options: 'i' } },
      { category: { $regex: search.toString(), $options: 'i' } },
    ];
  }
  if (category) {
    query['category'] =
      category.toString() || 'blog is not found !!! please share any blog';
  }
  const sortField = req.query.sortField || 'publicationDate';
  const sortOrder = req.query.sortOrder === 'desc' ? 'asc' : 'desc';
  try {
    const blogs = await blogModel
      .find(query)
      .sort({ [sortField]: sortOrder })
      .limit(Number(limit))
      .skip(Number(limit) * (Number(page) - 1));
    const totalBlog = await blogModel.countDocuments(query);
    res.json({
      blogs: blogs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBlog / Number(limit)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.findSingleBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const updates = req.body;

    const updatedBlog = await blogModel.findByIdAndUpdate(blogId, updates, {
      new: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(updatedBlog);
    console.log(blogId, updates);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await blogModel.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'blog not found' });
    }
    res.json({ message: 'blog deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
