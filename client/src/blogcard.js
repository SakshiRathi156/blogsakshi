import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  // Debug logs for development
  console.log('Blog data:', blog);
  console.log('Category:', blog.category);
  console.log('Blog ID:', blog._id);

  // Get a short description from blog intro
  const getShortDescription = () => {
    if (blog.content && blog.content.intro) {
      return blog.content.intro.substring(0, 80) + '...';
    }
    return 'Click to read more about this blog post.';
  };

  // Truncate long titles
  const truncateTitle = (title) => {
    if (title.length > 40) {
      return title.substring(0, 40) + '...';
    }
    return title;
  };

  // Check if category is valid
  const hasCategory = blog.category && blog.category.trim() !== '';

  return (
    <div className="blogcontainer">
      <div className="mainpart">
        <div className="blog-image-container">
          <img
            src={blog.image || '/default-blog.jpg'}
            className="blogimg"
            alt={blog.title || 'Blog Image'}
          />
          {hasCategory && (
            <div className="blog-category">{blog.category}</div>
          )}
        </div>
        <div className="blog-content">
          <h5 className="blog-title">{truncateTitle(blog.title)}</h5>
          <p className="blog-description">{getShortDescription()}</p>
          <Link to={`/blogs/${blog._id}`} className="readmore-link">
            <button className="readmore">Read More →</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
