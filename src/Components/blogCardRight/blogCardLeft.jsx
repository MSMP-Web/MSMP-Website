import React, { useState } from "react";
import "./blogCardLeft.css";
import mandala from "../../assets/mandalaRight.png";
import Separator from "../Separator/Separator";
import { Link } from "react-router-dom";

const BlogCardLeft = ({ id, title, description, date, readTime, image }) => {
  return (
    <>
      <div className="blog-card">
        {/* Blog Image */}
        <img src={image} alt="Blog" className="blog-image" />

        {/* Overlay Content */}
        <div className="blog-content">
          <h2 className="blog-title">{title}</h2>

          {/* Date + Read Time */}
          <div className="blog-meta">
            <span className="blog-date">{date}</span>
            <span className="blog-separator">•</span>
            <span className="blog-readtime">{readTime}</span>
          </div>

          <p className={`blog-text collapsed`}>
            {description}
          </p>

          <Link to={`/blog/${id}`} className="read-more" >
            Read now →
          </Link>
        </div>
      <img src={mandala} alt="Mandala" className="mandala-right" />
      </div>
      <Separator/>
    </>
  );
};

export default BlogCardLeft;
