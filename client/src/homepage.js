import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import BlogCard from './blogcard'

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFeaturedBlogs = async () => {
    try {
      setLoading(true);
      console.log('Fetching blogs from API...');
  
      // Make sure apiUrl is correctly defined
      const apiUrl = process.env.NODE_ENV === 'production'
        ? 'https://sakshirathiblogs.onrender.com/api/v1/allblogs' // Replace with actual deployed backend URL
        : 'http://localhost:5000/api/v1/allblogs'; // Local backend URL
  
      console.log('Using API URL:', apiUrl);
      const { data } = await axios.get(apiUrl);
      console.log('API response:', data);
  
      if (data.blogs && data.blogs.length > 0) {
        setBlogs(data.blogs.slice(0, 3));
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
    getFeaturedBlogs();
  }, []);

  return (
    <div className='home'>
      <div className="welcome-text">
        <h1>WELCOME TO</h1>
        <h2 className="site-name">Your Cozy Corner</h2>
      </div>
      <div className="featured-blogs">
        <h2>Latest Blogs</h2>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading blogs...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button className="retry-button" onClick={getFeaturedBlogs}>Try Again</button>
          </div>
        ) : blogs.length > 0 ? (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="no-blogs">
            <p>No blogs available at the moment.</p>
            <p>Check back soon for new content!</p>
          </div>
        )}
        <Link to="/blogs" className="view-all">View All Blogs</Link>
      </div>
    </div>
  )
}

export default HomePage
