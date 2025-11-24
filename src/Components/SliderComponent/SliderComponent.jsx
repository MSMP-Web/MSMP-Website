import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./SliderComponent.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate, Link } from "react-router-dom";
import { getImageUrl } from "../../utils/imageHelper";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const SliderComponent = () => {
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/slides`);
        if (res.ok) {
          const data = await res.json();
          setSlides(data);
        }
      } catch (err) {
        console.error("Error fetching slides:", err);
      }
    };

    fetchSlides();
  }, []);

  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={30}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link to={`/event/${slide.id}`} className="read-more">
              <div className="slide">
                <img
                  src={getImageUrl(slide.img)}
                  alt={slide.title}
                  className="slide-image"
                />
                <div className="left-shadow"></div>
                <div className="overlay">
                  <h2>{slide.title}</h2>
                  <p>{slide.info}</p>
                  {/* Read More */}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="btn" onClick={() => navigate("/contactus")}>
        Get Involved
      </button>
    </div>
  );
};


export default SliderComponent;
