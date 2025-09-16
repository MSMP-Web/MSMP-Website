import { useLayoutEffect } from "react";
import {allData} from "../../data/alldata";
import Footer from "../Footer/Footer";
import RightTitleSection from "../RightTitleSection/RightTitleSection";
import BlogCardLeft from "../blogCardRight/blogCardLeft";
import "./Events.css";

const Events = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    console.log("this is running");
  }, []);
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
            image={event.image}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Events;
