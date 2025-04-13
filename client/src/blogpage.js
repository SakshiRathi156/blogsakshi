import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./blogcard";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllBlogs = async () => {
        try {
            setLoading(true);
            console.log('Fetching all blogs from API...');

            // Use the full URL in development
            // const apiUrl = process.env.NODE_ENV === 'production'
            //     ? '/api/v1/allblogs'
            //     : 'http://localhost:5000/api/v1/allblogs';
            const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://sakshirathiblogs.onrender.com/api/v1/allblogs'
    : 'http://localhost:5000/api/v1/allblogs';


            console.log('Using API URL:', apiUrl);
            const { data } = await axios.get(apiUrl);
            console.log('API response:', data);

            if (data.blogs && data.blogs.length > 0) {
                // Log the first blog to see its structure
                console.log('First blog:', data.blogs[0]);
                console.log('First blog category:', data.blogs[0].category);

                setBlogs(data.blogs);
                setError(null);
            } else {
                setError("No blogs found");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
            console.error("Error details:", error.response ? error.response.data : 'No response data');
            setError("An error occurred while fetching blogs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading blogs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button className="retry-button" onClick={getAllBlogs}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="blogpage">
            <h2 className="page-title">All Blogs</h2>
            {blogs.length > 0 ? (
                <div className="blog-grid">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-blogs">
                    <p>No blogs available at the moment.</p>
                    <p>Check back soon for new content!</p>
                </div>
            )}
        </div>
    );
};

export default Blogs;