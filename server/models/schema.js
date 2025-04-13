const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: Schema.Types.Mixed,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true }

)
// Create a Blog model using the schema
const Blog = mongoose.model('Blog', BlogSchema, 'myblogs');

// Export the model to use it in other parts of the application
module.exports = Blog;