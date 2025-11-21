import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import ToggleButtons from "./Components/ToggleButtons/ToggleButtons";
import Homepage from "./Components/Homepage/Homepage";
import NewAboutUs from "./Components/AboutUs.jsx/AboutUs";
import BlogPage from "./Components/Blogpage/Blogpage";
import SingleBlog from "./Components/SingleBlog/SingleBlog";
import Events from "./Components/Events/Events";
import ContactUs from "./Components/ContactUs/ContactUs";
import { useState } from "react";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";

function App() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  return (
    <Router>
      <Navbar 
      showCalendar={showCalendar} 
      setShowCalendar={setShowCalendar}
      showNotice={showNotice} 
      setShowNotice={setShowNotice}
      />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<NewAboutUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/event/:id" element={<SingleBlog />} />
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/admin" element={<Dashboard/>}/>
      </Routes>

      <ToggleButtons
      setShowCalendar={setShowCalendar}
      setShowNotice={setShowNotice}
      />

    </Router>
  );
}

export default App;
