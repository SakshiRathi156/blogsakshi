import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogContent = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setError('Invalid blog ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching blog details from API...');

        // Use the full URL in development
        const apiUrl = process.env.NODE_ENV === 'production'
          ? `/api/v1/singleblog/${id}`
          : `http://localhost:5000/api/v1/singleblog/${id}`;

        console.log('Using API URL:', apiUrl);
        const response = await axios.get(apiUrl);
        console.log('API response:', response.data);
        console.log('Blog category:', response.data.blog.category);

        setBlog(response.data.blog);
        setError(null);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        console.error('Error details:', error.response ? error.response.data : 'No response data');
        setError('Error fetching blog details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Format the date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <Link to="/blogs" className="back-button">Back to Blogs</Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="error-container">
        <p className="error-message">Blog post not found</p>
        <Link to="/blogs" className="back-button">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className='blog-content-page'>
      <div className="blog-header">
        <h1 className='blog-title'>{blog.title}</h1>
        <div className="blog-meta">
          {blog.category && blog.category.trim() !== '' && (
            <span className="blog-category">{blog.category}</span>
          )}
        </div>
      </div>

      <div className="blog-featured-image">
        <img src={blog.image} alt={blog.title} />
      </div>

      <div className='blog-content-container'>
        {/* Render the introductory content */}
        {blog.content && blog.content.intro && (
          <div className="blog-intro">
            <p className='blog-paragraph'>{blog.content.intro}</p>
          </div>
        )}

        {/* Render each section of the blog */}
        {blog.content && blog.content.sections && blog.content.sections.map((section, index) => (
          <div key={index} className="blog-section">
            <h2 className='section-heading'>{section.heading}</h2>
            <p className='blog-paragraph'>{section.paragraph}</p>
          </div>
        ))}

        {/* If you want to add the conclusion or last paragraph */}
        {blog.content && blog.content.conclusion && (
          <div className="blog-conclusion">
            <h2 className='section-heading'>Conclusion</h2>
            <p className='blog-paragraph'>{blog.content.conclusion}</p>
          </div>
        )}
      </div>

      <div className="blog-navigation">
        <Link to="/blogs" className="back-to-blogs">← Back to All Blogs</Link>
      </div>
    </div>
  );
};

export default BlogContent;
