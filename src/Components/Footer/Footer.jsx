import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../assets/logo.png";
import bottomMandela from "../../assets/mandalaBottom.png";
import "./Footer.css"; // external CSS
import meshCraftLogo from "../../assets/MESH.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + Name */}
        <div className="footer-logo">
          <img src={logo} alt="Logo" className="footer-logo-img" />
          <span className="footer-logo-text">
            Maharashtra Stree Mukti Parishad
          </span>
        </div>

        {/* Bottom Section: Contact, Mandala, Social */}
        <div className="footer-bottom">
          {/* Contact Info */}
          <div className="footer-contact">
            <h3>
              Contact <span className="highlight">Us</span>
            </h3>
            <p className="phone">Dr. Kunda Pramila Nilakanth: 9969148654</p>
            <p className="phone">Sangeeta Saraf: 9819230274</p>
            <p className="phone">Jyoti Mhapasekar: 9867724529</p>
            <p className="language">Email: streevadiparishad@msmporg.in</p>
          </div>

          {/* Mandala Image */}
          <div className="footer-mandala">
            <img src={bottomMandela} alt="Mandala" />
          </div>

          {/* Social Links */}
          <div className="footer-social">
            <h3>
              Follow Us <span className="highlight">On</span>
            </h3>
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
        <div className="footer-credit">
          {/* <img src="MESH.png" alt="Meshcraft" /> */}
          <img src={meshCraftLogo} alt="Meshcraft" />
          <span>made by Meshcraft Pvt Ltd</span> @2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
