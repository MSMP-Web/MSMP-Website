import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import allData from "../../data/alldata";
import "./SingleBlog.css";
import Footer from "../Footer/Footer";

const SingleBlog = () => {
  const { id } = useParams();
  const blog = allData.find((b) => b.id.toString() === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  if (!blog) {
    return <h2>Blog not found</h2>;
  }

  return (
    <>
      <div className="blog-detail">
        <h1 className="blog-detail-title">{blog.title}</h1>
        <span className="blog-detail-data">
          {blog.date} • {blog.readTime}
        </span>
        <img
          className="blog-detail-image"
          src={`/${blog.image}`}
          alt={blog.title}
        />
  <p className="blog-description" dangerouslySetInnerHTML={{ __html: blog.description.replace(/\n/g, '<br/>') }} />
      </div>
      <Footer />
    </>
  );
};

export default SingleBlog;
