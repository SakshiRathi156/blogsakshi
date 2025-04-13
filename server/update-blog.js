const mongoose = require('mongoose');
const Blog = require('./models/schema');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Blog ID to update
const blogId = '67f9053e08d1b3e7d85b93eb'; // Replace with your blog ID
const category = 'Productivity'; // Replace with your category

// Update the blog
async function updateBlog() {
    try {
        console.log(`Updating blog with ID: ${blogId}`);
        console.log(`Setting category to: ${category}`);

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { category },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            console.error('Blog not found');
            process.exit(1);
        }

        console.log('Blog updated successfully:');
        console.log(updatedBlog);
        process.exit(0);
    } catch (error) {
        console.error('Error updating blog:', error);
        process.exit(1);
    }
}

// Run the update
updateBlog(); 