import React from "react";
import "./Notice.css";

const NoticeBoard = () => {
  // You can later fetch notices from API or props
  const notices = [
    {
      title: "Notice: Mahila Sabha (Women’s Meeting)",
      text: "All self-help group (SHG) leaders are invited to discuss upcoming empowerment initiatives and skill development workshops.",
    },
    {
      title: "Notice: Training Workshop",
      text: "A free skill development workshop will be conducted for rural women to enhance entrepreneurship skills.",
    },
    {
      title: "Notice: Awareness Drive",
      text: "Join us for a community awareness drive on health and hygiene this weekend at the town hall.",
    },
  ];

  return (
    <section className="noticeboard-container">
      <h2 className="noticeboard-title">Latest Notices</h2>
      <div className="noticeboard-list">
        {notices.map((notice, index) => (
          <div className="noticeboard-item" key={index}>
            <div className="noticeboard-text">
              <h3 className="noticeboard-heading">{notice.title}</h3>
              <p className="noticeboard-description">{notice.text}</p>
            </div>
            <img
              src="new-notice.png"
              alt="New Notice"
              className="noticeboard-icon"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NoticeBoard;
