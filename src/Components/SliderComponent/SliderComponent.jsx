
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./SliderComponent.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate, Link } from "react-router-dom";

const ImageSlider = () => {
  const navigate = useNavigate();
  const slides = [
    {
      id: 10,
      img: "We are united in MSMP.png",
      title: "We are united in MSMP",
      info: "",
    },
    {
      id: 1,
      img: "No to Manusmruti Yes to Sanvidhan @ Chiplun.png",
      title: "No to Manusmruti Yes to Sanvidhan",
      info: "",
    },
    {
      // id: null,
      id: 12,
      img: "Mahila Sahitya Sammelan Thane.png",
      title: "Mahila Sahitya Sammelan Thane",
      info: "",
    },
    {
      id: 5,
      img: "Vicharmanthan Gadchiroli.jpg",
      title: "Vicharmanthan Gadchiroli",
      info: "",
    },
    {
      id: 11,
      img: "MSMP press conference on 26th June.png",
      title: "MSMP press conference on 26th June",
      info: "",
    },
    {
      id: 2,
      img: "Safety Audit of Chandrapur railway station.png",
      title: "Safety Audit of Chandrapur railway station",
      info: "",
    },
    {
      id: 8,
      img: "Vidarbh Region meeting.png",
      title: "Vidarbh Region Meeting",
      info: "",
    },
    {
      id: 7,
      img: "Marathwada region meeting.png",
      title: "Marathwada region Meeting",
      info: "",
    },
  ];

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

