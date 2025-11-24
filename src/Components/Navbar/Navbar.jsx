import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getImageUrl } from "../../utils/imageHelper";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const Navbar = ({
  showCalendar,
  setShowCalendar,
  showNotice,
  setShowNotice,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch calendar events
        const calRes = await fetch(`${API_BASE}/api/calendar`);
        if (calRes.ok) {
          const cal = await calRes.json();
          setCalendarEvents(cal);
        }

        // Fetch notices
        const notRes = await fetch(`${API_BASE}/api/notices`);
        if (notRes.ok) {
          const nots = await notRes.json();
          setNotices(nots);
        }
      } catch (err) {
        console.error("Error fetching navbar data:", err);
      }
    };

    fetchData();
  }, []);

  const openVideo = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsLoading(true);
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const openImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setSelectedVideo(null);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsLoading(false);
  };
  const closeModal = () => {
    setSelectedVideo(null);
    setSelectedImage(null);
    setIsLoading(false);
  };

  return (
    <header className="navbar">
      {/* Top bar */}
      <div className="top-bar">
        <span className="phone">Dr. Kunda Pramila Nilakanth: 9969148654</span>
        <span className="phone">Sangeeta Saraf: 9819230274</span>
        <span className="phone">Sangeeta Joshi: 9422669036</span>
        <span className="language">Email: streevadiparishad@msmporg.in</span>
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=61578878787699">
            <FaFacebookF />
          </a>
          <a href="https://www.youtube.com/@MSMPCulture">
            <FaYoutube />
          </a>
          <a href="https://www.instagram.com/msmp.culture/">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <div className="main-navbar">
        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo" />
          <div className="title">
            <h1>Maharashtra Stree Mukti Parishad</h1>
            <p>For the Feminist Transformation of Society</p>
          </div>
        </div>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="/">HOME</a>
          <div className="dropdown"></div>
          <div className="dropdown">
            <a href="/about">ABOUT US</a>
          </div>
          <a href="/events">EVENTS</a>
          <div className="dropdown">
            <a href="#">
              BLOG ▾
              <div className="dropdown-content">
                <a href="#">Page Is Under Development !</a>
              </div>
            </a>
          </div>

          <div className="dropdown">
            <a href="#">DOCUMENTATION ▾</a>
            <div className="dropdown-content">
              <a href="#">Page Is Under Development !</a>
            </div>
          </div>

          <div className="dropdown">
            <a href="#">HIGHLIGHTS ▾</a>
            <div className="dropdown-content">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setShowNotice(true);
                }}
              >
                Latest Highlights
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCalendar(true);
                }}
              >
                Event Calendar
              </a>
            </div>
          </div>
          <a href="contactus">CONTACT US</a>
        </nav>
      </div>

      {/* Floating Modal for Calendar */}
      {showCalendar && (
        <div className="calendar-modal">
          <div className="calendar-content">
            <button
              className="calendar-close"
              onClick={() => setShowCalendar(false)}
            >
              ✕
            </button>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              height="auto"
            />
          </div>
        </div>
      )}

      {/* Notice Modal */}
      {showNotice && (
        <div className="notice-modal-overlay">
          <div className="notice-modal-content">
            <button
              className="notice-close"
              onClick={() => setShowNotice(false)}
            >
              ✕
            </button>
            <h2 className="noticeboard-title">Latest Highlights</h2>
            <div className="noticeboard-list">
              {notices.map((notice) => (
                <div className="noticeboard-item" key={notice._id || notice.id}>
                  <div className="noticeboard-text">
                    <h3 className="noticeboard-heading">{notice.title}</h3>
                    <p
                      className="noticeboard-description"
                      dangerouslySetInnerHTML={{
                        __html: notice.text.replace(/\n/g, "<br />"),
                      }}
                    ></p>
                    {/* Video Preview if available */}
                    {notice.videoUrl && (
                      <div
                        className="video-preview"
                        onClick={() => openVideo(notice.videoUrl)}
                      >
                        <video
                          src={notice.videoUrl}
                          muted
                          preload="metadata"
                          className="noticeboard-video-thumb"
                        />
                        <div className="play-overlay">▶</div>
                      </div>
                    )}{" "}
                    {!notice.videoUrl && notice.imageUrl && (
                      <div
                        className="image-preview"
                        onClick={() => openImage(getImageUrl(notice.imageUrl))}
                      >
                        <img
                          src={getImageUrl(notice.imageUrl)}
                          alt={notice.title}
                          className="noticeboard-image-thumb"
                        />
                      </div>
                    )}
                  </div>

                  <img
                    src="new-notice.png"
                    alt="New Notice"
                    className="noticeboard-icon"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Video Modal */}
          {selectedVideo && (
            <div className="video-modal" onClick={closeVideo}>
              <div
                className="video-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="close-btn" onClick={closeVideo}>
                  ✕
                </span>

                {/* Loader */}
                {isLoading && (
                  <div className="video-loader">
                    <div className="spinner"></div>
                    <p>Loading video...</p>
                  </div>
                )}

                <video
                  src={selectedVideo}
                  controls
                  autoPlay
                  onLoadedData={handleVideoLoaded}
                  className={`modal-video-player ${isLoading ? "hidden" : ""}`}
                />
              </div>
            </div>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <div className="image-modal" onClick={closeModal}>
              <div
                className="image-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="close-btn" onClick={closeModal}>
                  ✕
                </span>
                <img
                  src={selectedImage}
                  alt="Notice"
                  className="modal-image-viewer"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
