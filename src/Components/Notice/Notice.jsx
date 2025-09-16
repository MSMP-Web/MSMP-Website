import React from "react";
import "./Notice.css";
import { notices } from "../../data/alldata";

const NoticeBoard = () => {
    // const notices = [
    //   {
    //     title: "Highlight 1: Mahila Sahitya Sammelan, Thane",
    //     text: "13th September 2025\n\n10:30 am - <b>Inauguration Ushakiran Atram and Saniya</b>\n\n12:30 pm - <b>Parisanwad Marathi Sahityatil Stree - Neeraja, Ashwini Torane, Heena Kausar</b>\n\n2:30 pm - <b>Talk Show Rahi Bhide, Indumati Jondhale, Chinmayi Sumit & Chayanika</b>\n\n4:30 pm - <b>Kavita Vachan Chhaya Koregaokar, Sandhya Lagad, Lakshmi Yadav</b>",
    //   },
    //   {
    //     title: "Highlight 2: Residential Workshop at Pune",
    //     text: "8, 9 & 10th September 2025\n\nResidential workshop at Pune. Consolidation of Safety Audit data collected from 35 districts of Maharashtra. Collective efforts to analyse the data. Preparation of report.",
    //   },
    //   {
    //     title: "Highlight 3: Nariwadi Sanwad - Webinar Series",
    //     text: "24th August - <b>Sexual Violence</b>\nSpeakers - Adv. Vrinda Grover, Sandhya Gokhale, Chayanika\n\n14th September - <b>Aggressive Communalism</b>\nSpeakers - Tista Setalvad, Shama Dalwai",
    //   },
    // ];

  return (
    <section className="noticeboard-container">
      <h2 className="noticeboard-title">Latest Highlights</h2>
      <div className="noticeboard-list">
        {notices.map((notice, index) => (
          <div className="noticeboard-item" key={index}>
            <div className="noticeboard-text">
              <h3 className="noticeboard-heading">{notice.title}</h3>
              <p
                className="noticeboard-description"
                dangerouslySetInnerHTML={{
                  __html: notice.text.replace(/\n/g, "<br />"),
                }}
              ></p>
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
