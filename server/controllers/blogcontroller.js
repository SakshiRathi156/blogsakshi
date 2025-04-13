const Blog = require('../models/schema')
const getAllBlogs = async (req, res) => {
    try {
        console.log('Fetching all blogs...');
        const blogs = await Blog.find();
        console.log(`Found ${blogs.length} blogs`);

        // Log the first blog to see its structure
        if (blogs.length > 0) {
            console.log('First blog:', blogs[0]);
        }

        const totalBlogs = await Blog.countDocuments();
        res.status(200).json({ totalBlogs, blogs })
    } catch (error) {
        console.error('Error in getAllBlogs:', error);
        res.status(500).json({ "mssg": "Error fetching blogs", "error": error.message });
    }
};
const createNewBlog = async (req, res) => {
    try {
        console.log('Creating new blog with data:', req.body);
        const { title, image, content, date, category } = req.body;
        console.log('Extracted category:', category);

        // Ensure category is a string and not empty
        const blogCategory = category && typeof category === 'string' ? category.trim() : 'Uncategorized';
        console.log('Using category:', blogCategory);

        const newBlog = await Blog.create({
            title,
            image,
            content,
            date,
            category: blogCategory
        });
        console.log('Created blog:', newBlog);

        // Use sendStatus for success response
        res.status(201).json(newBlog);
    } catch (error) {
        console.error('Error in createNewBlog:', error);
        // Use sendStatus for error response
        res.status(500).json({ "mssg": "Error creating blog", "error": error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedblog = await Blog.findByIdAndDelete(id);
        if (!deletedblog) {
            return res.status(404).json({ message: "Blog not found" })
        }
        return res.status(200).json({ message: "Blog deleted successfully" })
    } catch (error) {
        console.log(error)
        return res.status(502).json({ message: "Error deleting Blog" })
    }
}
const updateBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        console.log('Updating blog with ID:', id);
        console.log('Update data:', updateData);

        const updatedblog = await Blog.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedblog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        console.log('Updated blog:', updatedblog);
        return res.status(200).json({ message: "Blog updated successfully", blog: updatedblog });
    } catch (error) {
        console.error('Error updating blog:', error);
        return res.status(502).json({ message: "Error updating Blog", error: error.message });
    }
};
// Define an asynchronous function for getting a single blog
const singleBlog = async (req, res) => {
    try {
        // Correct the typo in req.params.id
        const id = req.params.id; // Get the ID from the request parameters
        console.log('Fetching blog with ID:', id);

        // Correct the method name and call it with the ID
        const blog = await Blog.findById(id); // Fetch the blog post by ID
        console.log('Found blog:', blog);

        // Check if the blog exists
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" }); // If no blog is found, send a 404 error
        }

        // Send the found blog as a JSON response
        res.status(200).json({ blog }); // Send the blog as a response with a 200 status
    } catch (error) {
        console.log(error); // Log the error to the console
        res.status(500).json({ message: "Error fetching blog" }); // Send a 500 error response
    }
};



module.exports = { getAllBlogs, createNewBlog, deleteBlog, updateBlog, singleBlog };