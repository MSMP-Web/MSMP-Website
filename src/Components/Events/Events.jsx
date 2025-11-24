import { useLayoutEffect, useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import RightTitleSection from "../RightTitleSection/RightTitleSection";
import BlogCardLeft from "../blogCardRight/blogCardLeft";
import { getImageUrl } from "../../utils/imageHelper";
import "./Events.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const Events = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch events from MongoDB
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/alldata`);
        if (res.ok) {
          const data = await res.json();
          setAllData(data);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <>
        <div className="event-title">
          <RightTitleSection title={"Our Events"} />
        </div>
        <div className="event-page-container">
          <p>Loading events...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="event-title">
        <RightTitleSection title={"Our Events"} />
      </div>
      <div className="event-page-container">
        {allData.map((event) => (
          <BlogCardLeft
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            readTime={event.readTime}
            image={getImageUrl(event.image)}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Events;
