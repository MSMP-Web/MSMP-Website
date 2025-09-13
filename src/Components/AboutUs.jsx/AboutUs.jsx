import React from "react";
import "./AboutUs.css";
import logo from "../../assets/logo.png";
import placeholderAvtar from "../../assets/placeholder.png";
import RightTitleSection from "../RightTitleSection/RightTitleSection";
import LeftTitleSection from "../LeftTitleSection/LeftTitleSection";
import Footer from "../Footer/Footer";

// ------------------- About Us Section -------------------
const AboutUsSection = () => {
  return (
    <>
      <RightTitleSection title={"About Us"} />
      <section className="aboutus-section">
        <div className="aboutus-grid">
          <div className="aboutus-text">
            <p>
              2025 marks 50 years of declaration of the international women's
              year by the UN in 1975.
              To assess the changes in women's lives through these 50 years, the
              activists and organisations who have been involved in organizing
              the autonomous women's movement since 1975, and the organizations
              and women active in other movements earlier, have come together to
              create this feminist platform called the{" "}
              <strong>Maharashtra Stree Mukti Parishad</strong>.
            </p>
          </div>
          <div className="aboutus-img">
            <img src="/We are united in MSMP.png" alt="Group Photo" />
          </div>
        </div>

        <div className="logo-grid">
          <div className="logo-box">
            <img src={logo} alt="Organization Logo" />
          </div>
          <div className="aboutus-text">
            <p>
              This platform proposes to organise several activities through the
              year.
              To be concluded with a state level Conference, the Maharashtra
              Stree Mukti Parishad, to be held in Mumbai on 20th, 21st and 22nd
              December, 2025.
              The conference is seen as the beginning of the next phase of the
              movement.
              Resolutions to that effect will be announced. The future plans of
              the Parishad will also be announced.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

// ------------------- Meet Our Team Section -------------------
const MeetOurTeamSection = () => {
  const teamMembers = [
    { name: "Sharada Sathe", role: "President" },
    { name: "Dr Chayanika Shah", role: "Vice President" },
    { name: "Dr Chhaya Datar", role: "Treasurer" },
    { name: "Adv Nisha Shiurkar", role: "Secretary" },
    { name: "Dr Pradnya Daya Pawar", role: "Member" },
    { name: "Lata Bhise Sonawane", role: "Member" },
    { name: "Dr Manisha Gupte", role: "Member" },
    { name: "Sunita Bagal", role: "Member" },
    { name: "Hasina Khan", role: "Member" },
    { name: "Shubhada Deshmukh", role: "Member" },
  ];

  return (
    <>
      <LeftTitleSection title={"Meet Our Team"} />
      <section className="team-section">
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">
                <img src={placeholderAvtar} alt="Avatar" />
              </div>
              <h4 className="team-name">{member.name}</h4>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

// ------------------- Purpose In Motion Section -------------------
const PurposeInMotionSection = () => {
  const purposeItems = ["Freedom", "Equality", "Diversity", "Unity"];
  return (
    <>
      <RightTitleSection title={"Purpose In Motion"} />
      <section className="purpose-section">
        <div className="purpose-items">
          {purposeItems.map((item, index) => (
            <div key={index} className="purpose-item">
              {item}
              {index < purposeItems.length - 1 && (
                <div className="purpose-separator"></div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

// ------------------- Our Objectives Section -------------------
const OurObjectivesSection = () => {
  const objectives = [
    "Creating a society that is free of discrimination based on caste, class or ethnicity.",
    "Building a secular society.",
    "To make a democratic India that thrives on harmony, friendship and cooperation.",
    "Creating a society based on sustainable economic development that accommodates all and provides a good quality of life to everyone.",
  ];

  return (
    <section className="card-section">
      <div className="card-container">
        <h2 className="card-title">Our Objectives</h2>
        <div className="card-list">
          {objectives.map((objective, index) => (
            <div key={index} className="card-item">
              <span className="card-bullet"></span>
              <p>{objective}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ------------------- The Way Section -------------------
const TheWaySection = () => {
  const wayItems = [
    "To raise awareness and increase public participation.",
    "Organizing opposition to anti-people policies, laws and activities of the State.",
    "To build a joint campaign for the feminist transformation of society...",
  ];

  return (
    <section className="card-section">
      <div className="card-container">
        <h2 className="card-title">The Way</h2>
        <div className="card-list">
          {wayItems.map((item, index) => (
            <div key={index} className="card-item">
              <span className="card-bullet"></span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




// ------------------- Main Page -------------------
const NewAboutUs = () => {
  return (
    <main className="aboutus-main">
      <AboutUsSection />
      <MeetOurTeamSection />
      <PurposeInMotionSection />
      <OurObjectivesSection />
      <TheWaySection />
  {/* <JoinUsSection /> */}
      <Footer/>
    </main>
  );
};

export default NewAboutUs;
