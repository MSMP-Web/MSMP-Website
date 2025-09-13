import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

// FullCalendar imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Navbar = ({
  showCalendar,
  setShowCalendar,
  showNotice,
  setShowNotice,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Example events for calendar
  const events = [
    { title: "Women Empowerment Workshop", date: "2025-09-10" },
    {
      title: "Community Awareness Drive",
      date: "2025-09-15",
      color: "#d65a84",
    },
  ];

  return (
    <header className="navbar">
      {/* Top bar */}
      <div className="top-bar">
        <span className="phone">Dr. Kunda Pramila Nilakanth: 9969148654</span>
        <span className="phone">Sangeeta Saraf: 9819230274</span>
        <span className="phone">Jyoti Mhapasekar: 9867724529</span>
        <span className="language">Email: streevadiparishad@msmporg.in</span>
        <span className="language">Language</span>
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

        {/* Hamburger Button */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Links */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="/">HOME</a>
          <div className="dropdown"></div>
          <div className="dropdown">
            <a href="/about">ABOUT US</a>
          </div>
          <a href="/events">EVENTS</a>
          {/* <a href="/blogs">BLOG</a> */}
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
            <a href="#">ANNOUNCEMENTS ▾</a>
            <div className="dropdown-content">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setShowNotice(true);
                }}
              >
                Latest Announcement
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
          <a href="contactus  ">CONTACT US</a>
          {/* <a href="#">
            <i className="fas fa-search"></i>
          </a> */}
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
              events={events}
              height="auto"
            />
          </div>
        </div>
      )}

      {showNotice && (
        <div className="notice-modal">
          <div className="notice-content">
            <button
              className="notice-close"
              onClick={() => setShowNotice(false)}
            >
              ✕
            </button>
            <h1 className="notice-modal-heading">Announcements</h1>

            <div className="scrollable">
              <div className="notice">
                <div>
                  <h1 className="notice-heading">
                    Notice: Mahila Sabha (Women’s Meeting)
                  </h1>
                  <p>
                    All self-help group (SHG) leaders are invited to discuss
                    upcoming empowerment initiatives and skill development
                    workshops.
                  </p>
                </div>
                <img src="new-notice.png" className="new-notice-icon" alt="" />
              </div>

              <div className="notice">
                <div>
                  <h1 className="notice-heading">
                    Notice: Mahila Sabha (Women’s Meeting)
                  </h1>
                  <p>
                    All self-help group (SHG) leaders are invited to discuss
                    upcoming empowerment initiatives and skill development
                    workshops.
                  </p>
                </div>
                <img src="new-notice.png" className="new-notice-icon" alt="" />
              </div>

              <div className="notice">
                <div>
                  <h1 className="notice-heading">
                    Notice: Mahila Sabha (Women’s Meeting)
                  </h1>
                  <p>
                    All self-help group (SHG) leaders are invited to discuss
                    upcoming empowerment initiatives and skill development
                    workshops.
                  </p>
                </div>
                <img src="new-notice.png" className="new-notice-icon" alt="" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
