// single blog box in home page
import React from "react";
import { useNavigate } from "react-router-dom";

import "./Blog.css";
const Blog = ({ blog,id }) => {
  const navigate = useNavigate();

  return (
    <div className="main-blog-container">
      <div className="blog-gradient"></div>
      <div className="blog">
        <div className="blog-image-container">
          <img src={blog.image} alt="blogimage" className="blog-image" />
        </div>
        <div className="blog-text-container">
          <h2 className="blog-title">{blog.title}</h2>
          <p className="blog-text">{blog.text.substr(0, 100)}...</p>
          <button
            onClick={() => navigate(`/events/${id}`)}
            className="blog-home-btn"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
