import React from "react";
import "./Events.css";
import RightTitleSection from "../RightTitleSection/RightTitleSection";
import BlogCardLeft from "../blogCardRight/blogCardLeft";
import allData from "../../data/alldata";
import Footer from "../Footer/Footer";

const events = [
  {
    id: 1,
    title: "No to Manusmruti, Yes to Sanvidhan",
    img: "no to manusmruti at Pathardi .png",
    description:
      "Exploring the ongoing feminist campaign resisting Brahminical patriarchy and asserting Constitutional values.",
    moreInfo:
      "The campaign highlights how the Manusmruti continues to shape cultural practices, reinforcing caste and gender hierarchies. Through workshops, peace marches, film screenings, and discussions across Maharashtra, activists are building awareness and resistance. The initiative emphasizes that embracing the Constitution requires actively rejecting regressive codes like the Manusmruti.",
    link: "#",
  },
  {
    id: 2,
    title: "Safety Audit of Public Transport",
    img: "Safety Audit of Chandrapur railway station.png",
    description:
      "Assessing women’s safety in public spaces like railway stations, ST stands, and bus depots across Maharashtra.",
    moreInfo:
      "With women increasingly relying on public transport, MSMP initiated a safety audit to identify risks and evaluate existing facilities. Volunteers were trained to conduct day-and-night audits using structured questionnaires. The findings will be compiled into a report with recommendations to the government, highlighting that safety is integral to women’s constitutional rights.",
    link: "#",
  },
  {
    id: 3,
    title: "College Youth Campaign",
    img: "Marathwada region meeting.png",
    description:
      "Engaging young people through skits, poster competitions, film screenings, and discussions on gender equality.",
    moreInfo:
      "This youth campaign aims to instill constitutional values of equality and social justice among college students. Proposed programs include skit competitions, talk shows, and panel discussions on topics such as dowry, toxic masculinity, superstition, feminism, and media portrayals of women. By involving youth, the campaign seeks to foster long-term social transformation.",
    link: "#",
  },
  {
    id: 4,
    title: "Zabardasti Me Kaisi Mardangi?",
    img: "Zabardasti me kaisi mardangi banner.png",
    description:
      "A campaign addressing the harmful effects of coercive masculinity and its role in perpetuating violence.",
    moreInfo:
      "The campaign was inspired by villagers’ observations of religion being misused to justify aggression. It critiques distorted expressions of masculinity that fuel road rage, hate crimes, domestic abuse, and communal violence. Through posters, reels, and films, the initiative sparks dialogue with youth, women, and queer communities to challenge toxic masculinity.",
    link: "#",
  },
  {
    id: 5,
    date: "8th March 2025",
    title: "Marathwada Region – Parbhani International Women’s Day Program",
    img: "parbhani 8th march program.png",
    link: "#",
    details:
      "A cultural and activist event held in Parbhani on International Women’s Day with wide participation from the community.",
  },
  {
    id: 6,
    date: "2025",
    title: "Kolhapur Regional Meeting",
    img: "kolhapur team.png",
    link: "#",
    details:
      "Regional workshop and conference of MSMP Kolhapur team, part of the calendar of regional workshops across Maharashtra.",
  },
  {
    id: 7,
    date: "March – August 2025",
    title: "Campaign: No to Manusmruti, Yes to Samvidhan",
    img: "manusmruti nako banner.png",
    link: "#",
    details:
      "Workshops and discussions across Maharashtra defending constitutional values and resisting Manusmruti ideology. Events held in Mumbai (29 Mar), Chiplun (9 May), Kudal (11 May), Online (8 Jun), Vashi (22 Jul), Majalgaon (3 Aug).",
  },
  {
    id: 8,
    date: "October 2025",
    title: "Safety Audit of Public Transport Spaces",
    img: "safety audit of ambejogai.png",
    link: "#",
    details:
      "Audits conducted at ST stands, bus depots, and railway stations across Maharashtra. Surveys at Dharashiv, Ambejogai, Pulgaon highlighted gaps in women’s safety. A consolidated report was released in October 2025.",
  },
  {
    id: 9,
    date: "2025",
    title: "College Campaign",
    img: "college campaign.png",
    link: "#",
    details:
      "Youth campaign with intercollegiate competitions, skits, poster contests, documentaries, and panel discussions on themes like dowry, toxic masculinity, democracy, feminism, superstition, and equality.",
  },
  {
    id: 10,
    date: "May – July 2025",
    title: "Community Meetings",
    img: "trade union meet.png",
    link: "#",
    details:
      "Online and offline meetings with men’s groups (May 4), queer and trans activists, trade union representatives, and Muslim women activists (July 13). Discussions on gender equality and feminist struggles.",
  },
  {
    id: 11,
    date: "20–22 December 2025",
    title: "State-Level Conference at Yashwantrao Chavan Pratishthan, Mumbai",
    img: "conference banner.png",
    link: "#",
    details:
      "Grand three-day conference marking the 50th anniversary of International Women’s Year. Resolutions announced and next phase of the feminist movement launched.",
  },
];

const Events = () => {
  return (
    <>
      <div className="event-title">
        <RightTitleSection title={"Our Events"} />
      </div>
      <div className="event-page-container">
        {allData.map((event) => (
          <BlogCardLeft
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            readTime={event.readTime}
            image={event.image}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Events;
