import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleBlog.css";
import Footer from "../Footer/Footer";
import Placeholder from "../Placeholder/Placeholder";
import { getImageUrl } from "../../utils/imageHelper";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Fetch blog by id from MongoDB
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/alldata/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <>
        <div className="blog-detail">
          <p>Loading blog...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return <Placeholder />;
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
          src={getImageUrl(blog.image)}
          alt={blog.title}
        />
        <p
          className="blog-description"
          dangerouslySetInnerHTML={{
            __html: blog.description.replace(/\n/g, "<br/>"),
          }}
        />
      </div>
      <Footer />
    </>
  );
};

export default SingleBlog;