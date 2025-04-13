import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  // Debug log
  console.log('Blog data:', blog);
  console.log('Category:', blog.category);
  console.log('Blog ID:', blog._id);

  // Extract a short description from the content if available
  const getShortDescription = () => {
    if (blog.content && blog.content.intro) {
      return blog.content.intro.substring(0, 80) + '...';
    }
    return 'Click to read more about this blog post.';
  };

  // Truncate title if it's too long
  const truncateTitle = (title) => {
    if (title.length > 40) {
      return title.substring(0, 40) + '...';
    }
    return title;
  };

  // Check if category exists and is not empty
  const hasCategory = blog.category && blog.category.trim() !== '';

  return (
    <div className="blogcontainer">
      <div className="mainpart">
        <div className="blog-image-container">
          <img src={blog.image} className="blogimg" alt={blog.title} />
          {hasCategory && (
            <div className="blog-category">{blog.category}</div>
          )}
        </div>
        <div className="blog-content">
          <h5 className="blog-title">{truncateTitle(blog.title)}</h5>
          <p className="blog-description">{getShortDescription()}</p>
          <Link to={`/blog/${blog._id}`} className="readmore-link">
            <button className="readmore">Read More →</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;