import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./SliderComponent.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate, Link } from "react-router-dom";
import { slides } from "../../data/alldata";

const ImageSlider = () => {
  const navigate = useNavigate();

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
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link to={`/event/${slide.id}`} className="read-more">
              <div className="slide">
                <img
                  src={slide.img}
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

export default ImageSlider;
