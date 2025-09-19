import emailjs from "emailjs-com";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Footer from "../Footer/Footer";
import "./ContactUs.css";

// ------------------- Join Us Section -------------------
import { useState } from "react";

const JoinUsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          setShowPopup(true);
          setFormData({ name: "", email: "", message: "" });

          // Hide popup after 3 seconds
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);
        },
        (error) => {
          console.error(error.text);
          alert("Failed to send message.");
        }
      );
  };

  return (
    <div className="join-us-section">
      <h2>
        <span>Join </span>Us
      </h2>
      <form className="join-us-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="join-us-input"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          className="join-us-input"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          className="join-us-textarea"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="join-us-button">
          Send Message
        </button>
      </form>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Thank you!</h3>
            <p>We’ll get to you soon!</p>
          </div>
        </div>
      )}
    </div>
  );
};

const ContactUs = () => {
  return (
    <>
      <div className="contact-container">
        <h1>
          Contact <span className="highlight">Us</span>
        </h1>

        <div className="contact-info">
          <div className="contact-item">
            <h2>Phone Numbers</h2>
            <p>
              Dr. Kunda Pramila Nilakanth:{" "}
              <a href="tel:+919969148654">
                <br />
                9969148654
              </a>
            </p>
            <p>
              Sangeeta Saraf:{" "}
              <a href="tel:+919819230274">
                <br />
                9819230274
              </a>
            </p>
            <p>
              Sangeeta Joshi:{" "}
              <a href="tel:+919422669036">
                <br />
                9422669036
              </a>
            </p>
          </div>

          <div className="contact-item">
            <h2>Email</h2>
            <p>
              <a href="mailto:streevadiparishad@msmporg.in">
                streevadiparishad@msmporg.in
              </a>
            </p>
          </div>

          <div className="contact-item">
            <h2>Follow Us</h2>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/profile.php?id=61578878787699"
                className="social facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.youtube.com/@MSMPCulture"
                className="social youtube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.instagram.com/msmp.culture/"
                className="social instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <div className="join-us-wrapper">
          <JoinUsSection />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
