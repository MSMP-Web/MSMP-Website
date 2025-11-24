import React, { useState, useEffect } from "react";
import "./Login.css";
import ManageGrid from "../ManageGrid/ManageGrid";
import LeftTitleSection from "../../LeftTitleSection/LeftTitleSection";
import AddEventsToCalendar from "../AddEventsToCalendar/AddEventsToCalendar";
import AddABlog from "../AddABlog/AddABlog";
import AddAnEvent from "../AddAnEvent/AddAnEvent";
import ManageHighlights from "../ManageHighlights/ManageHighlights";
import ManageCarousal from "../ManageCarousal/ManageCarousal";
import ManageVoicesInAction from "../ManageVoicesInAction/ManageVoicesInAction"
function Login() {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "" });

  // 🔹 Track which sub-component is active
  const [currentComponent, setCurrentComponent] = useState("ManageGrid");
  const [currentTitle, setCurrentTitle] = useState("Welcome To Admin");
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Check login status on mount
  useEffect(() => {
    const storedLogin = localStorage.getItem("loginData");
    if (storedLogin) {
      const { timestamp } = JSON.parse(storedLogin);
      const currentTime = new Date().getTime();

      if (currentTime - timestamp < 3600000) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("loginData");
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = import.meta.env.VITE_USER_NAME;
    const password = import.meta.env.VITE_PASSWORD;

    if (
      formData.name.trim() === username &&
      formData.password.trim() === password
    ) {
      const loginData = {
        username: formData.name,
        timestamp: new Date().getTime(),
      };

      localStorage.setItem("loginData", JSON.stringify(loginData));
      setIsLoggedIn(true);
      showPopup("✅ Login successful!", "success");
      setCurrentTitle("Welcome To Admin")
    } else {
      showPopup("❌ Incorrect username or password", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setIsLoggedIn(false);
    setCurrentComponent("ManageGrid");
    setCurrentTitle("Welcome To Admin Login");
    showPopup("👋 Logged out successfully", "success");
  };

  // 🔹 Switch view and title
  const handleNavigate = (componentName) => {
    setCurrentComponent(componentName);

    if (componentName === "AddEventsToCalendar") {
      setCurrentTitle("Add Events To Calendar");
    }
    if (componentName === "AddABlog") {
      setCurrentTitle("Add A Blog");
    }
    if (componentName === "AddAnEvent") {
      setCurrentTitle("Add An Event");
    }
    if (componentName === "ManageHighlights") {
      setCurrentTitle("Add Highlights To The Board");
    }
    if (componentName === "ManageCarousal") {
      setCurrentTitle("Add Carousal");
    }
    if (componentName === "ManageVoicesInAction") {
      setCurrentTitle("Manage Voices In Action Bulletins");
    } else if (componentName === "ManageGrid") {
      setCurrentTitle("Welcome To Admin");
    }
  };

  return (
    <>
      <div className="homepage-she-speaks">
        <LeftTitleSection title={currentTitle} />
      </div>

      <div className="login-container">
        {popup.message && (
          <div className={`floating-popup ${popup.type}`}>{popup.message}</div>
        )}

        {!isLoggedIn ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Login</h2>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="login-input"
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="login-input"
                required
              />

              {/* Eye Button */}
              <span
                className="toggle-eye"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        ) : (
          <>
            {currentComponent === "ManageGrid" && (
              <ManageGrid onLogout={handleLogout} onNavigate={handleNavigate} />
            )}

            {currentComponent === "AddEventsToCalendar" && (
              <AddEventsToCalendar
                onBack={() => handleNavigate("ManageGrid")}
              />
            )}
            {currentComponent === "AddABlog" && (
              <AddABlog onBack={() => handleNavigate("ManageGrid")} />
            )}
            {currentComponent === "AddAnEvent" && (
              <AddAnEvent onBack={() => handleNavigate("ManageGrid")} />
            )}
            {currentComponent === "ManageHighlights" && (
              <ManageHighlights onBack={() => handleNavigate("ManageGrid")} />
            )}
            {currentComponent === "ManageCarousal" && (
              <ManageCarousal onBack={() => handleNavigate("ManageGrid")} />
            )}
            {currentComponent === "ManageVoicesInAction" && (
              <ManageVoicesInAction onBack={() => handleNavigate("ManageGrid")} />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Login;
