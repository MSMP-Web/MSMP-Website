import React, { useState, useEffect } from "react";
import BlogCardLeft from "../blogCardRight/blogCardLeft";
import Footer from "../Footer/Footer";
import { getImageUrl } from "../../utils/imageHelper";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const BlogPage = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/alldata`);
        if (res.ok) {
          const data = await res.json();
          setBlogData(data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <>
        <div className="blog-page-container">
          <p>Loading blogs...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="blog-page-container">
        {blogData.map((blog) => (
          <BlogCardLeft
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            date={blog.date}
            readTime={blog.readTime}
            image={getImageUrl(blog.image)}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
