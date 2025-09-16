import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Impact from "../Impact/Impact";
import LeftTitleSection from "../LeftTitleSection/LeftTitleSection";
import NoticeBoard from "../Notice/Notice";
import RightTitleSection from "../RightTitleSection/RightTitleSection";
import ImageSlider from "../SliderComponent/SliderComponent";
import "./Homepage.css";
import {allData,CalendarEvents} from "../../data/alldata";

// const CalendarEvents = [
//   { title: "Sangli Parishad", date: "2025-09-06" },
//   { title: "Safety Audit Workshop @ Pune", date: "2025-09-08" },
//   { title: "Safety Audit Workshop @ Pune", date: "2025-09-09" },
//   { title: "Safety Audit Workshop @ Pune", date: "2025-09-10" },
//   { title: "Mahila Sahitya Sammelan, Thane", date: "2025-09-13" },
//   { title: "Mahila Adhikar Parishad, Vardha", date: "2025-09-14" },
//   { title: "Press Conference, Dharashiv", date: "2025-09-15" },
//   { title: "Chandrapur Parishad", date: "2025-10-04" },
//   { title: "Yavatmal Parishad", date: "2025-10-05" },
//   { title: "Latur Parishad", date: "2025-10-12" },
//   { title: "Maharashtra Stree Mukti Parishad @ Mumbai", date: "2025-12-20" },
//   { title: "Maharashtra Stree Mukti Parishad @ Mumbai", date: "2025-12-21" },
//   { title: "Maharashtra Stree Mukti Parishad @ Mumbai", date: "2025-12-22" },
// ];

// const events = [
//   {
//     id: 1,
//     date: "September 2024",
//     title: "First meeting at Shramik, Dadar",
//     img: "1.png",
//     link: "#",
//     details:
//       "First gathering of the MSMP committee in September 2024, attended by 32 activists from Mumbai. Discussions focused on upcoming social initiatives and coordination strategies.",
//   },
//   {
//     id: 2,
//     date: "January 2024",
//     title:
//       "District-level programme on birth anniversary of Krantijyoti Savitribai Phule",
//     img: "2.png",
//     link: "#",
//     details:
//       "Cultural programs, lectures, and workshops were organized across districts to celebrate the legacy of Krantijyoti Savitribai Phule, emphasizing women’s empowerment and education reforms.",
//   },
//   {
//     id: 3,
//     date: "March 2024",
//     title: "Sukanu Samiti press conference, Mumbai",
//     img: "3.png",
//     link: "#",
//     details:
//       "Press conference held in Mumbai to highlight local issues and the committee’s action plans. Attended by journalists and social workers.",
//   },
//   {
//     id: 4,
//     date: "19th August 2025",
//     title: "Nagpur Region – Gadchiroli District Workshop",
//     img: "Gadchiroli meeting.png",
//     link: "#",
//     details:
//       "‘Vichar Manthan’ workshop on women’s issues organized by Gadchiroli district MSMP. Senior social worker Sumtibai Munghate was present as chief guest.",
//   },
// {
//   id: 5,
//   date: "8th March 2025",
//   title: "Marathwada Region – Parbhani International Women’s Day Program",
//   img: "parbhani 8th march program.png",
//   link: "#",
//   details:
//     "A cultural and activist event held in Parbhani on International Women’s Day with wide participation from the community.",
// },
// {
//   id: 6,
//   date: "2025",
//   title: "Kolhapur Regional Meeting",
//   img: "kolhapur team.png",
//   link: "#",
//   details:
//     "Regional workshop and conference of MSMP Kolhapur team, part of the calendar of regional workshops across Maharashtra.",
// },
// {
//   id: 7,
//   date: "March – August 2025",
//   title: "Campaign: No to Manusmruti, Yes to Samvidhan",
//   img: "manusmruti nako banner.png",
//   link: "#",
//   details:
//     "Workshops and discussions across Maharashtra defending constitutional values and resisting Manusmruti ideology. Events held in Mumbai (29 Mar), Chiplun (9 May), Kudal (11 May), Online (8 Jun), Vashi (22 Jul), Majalgaon (3 Aug).",
// },
// {
//   id: 8,
//   date: "October 2025",
//   title: "Safety Audit of Public Transport Spaces",
//   img: "safety audit of ambejogai.png",
//   link: "#",
//   details:
//     "Audits conducted at ST stands, bus depots, and railway stations across Maharashtra. Surveys at Dharashiv, Ambejogai, Pulgaon highlighted gaps in women’s safety. A consolidated report was released in October 2025.",
// },
// {
//   id: 9,
//   date: "2025",
//   title: "College Campaign",
//   img: "college campaign.png",
//   link: "#",
//   details:
//     "Youth campaign with intercollegiate competitions, skits, poster contests, documentaries, and panel discussions on themes like dowry, toxic masculinity, democracy, feminism, superstition, and equality.",
// },
// {
//   id: 10,
//   date: "May – July 2025",
//   title: "Community Meetings",
//   img: "trade union meet.png",
//   link: "#",
//   details:
//     "Online and offline meetings with men’s groups (May 4), queer and trans activists, trade union representatives, and Muslim women activists (July 13). Discussions on gender equality and feminist struggles.",
// },
// {
//   id: 11,
//   date: "20–22 December 2025",
//   title: "State-Level Conference at Yashwantrao Chavan Pratishthan, Mumbai",
//   img: "conference banner.png",
//   link: "#",
//   details:
//     "Grand three-day conference marking the 50th anniversary of International Women’s Year. Resolutions announced and next phase of the feminist movement launched.",
// },
// ];

// const blogData = [
//   {
//     id: 1,
//     title: "No to Manusmruti, Yes to Sanvidhan",
//     img: "no to manusmruti at Pathardi .png",
//     description:
//       "Exploring the ongoing feminist campaign resisting Brahminical patriarchy and asserting Constitutional values.",
//     moreInfo:
//       "The campaign highlights how the Manusmruti continues to shape cultural practices, reinforcing caste and gender hierarchies. Through workshops, peace marches, film screenings, and discussions across Maharashtra, activists are building awareness and resistance. The initiative emphasizes that embracing the Constitution requires actively rejecting regressive codes like the Manusmruti.",
//     link: "#",
//   },
//   {
//     id: 2,
//     title: "Safety Audit of Public Transport",
//     img: "Safety Audit of Chandrapur railway station.png",
//     description:
//       "Assessing women’s safety in public spaces like railway stations, ST stands, and bus depots across Maharashtra.",
//     moreInfo:
//       "With women increasingly relying on public transport, MSMP initiated a safety audit to identify risks and evaluate existing facilities. Volunteers were trained to conduct day-and-night audits using structured questionnaires. The findings will be compiled into a report with recommendations to the government, highlighting that safety is integral to women’s constitutional rights.",
//     link: "#",
//   },
//   {
//     id: 3,
//     title: "College Youth Campaign",
//     img: "Marathwada region meeting.png",
//     description:
//       "Engaging young people through skits, poster competitions, film screenings, and discussions on gender equality.",
//     moreInfo:
//       "This youth campaign aims to instill constitutional values of equality and social justice among college students. Proposed programs include skit competitions, talk shows, and panel discussions on topics such as dowry, toxic masculinity, superstition, feminism, and media portrayals of women. By involving youth, the campaign seeks to foster long-term social transformation.",
//     link: "#",
//   },
//   {
//     id: 4,
//     title: "Zabardasti Me Kaisi Mardangi?",
//     img: "Zabardasti me kaisi mardangi banner.png",
//     description:
//       "A campaign addressing the harmful effects of coercive masculinity and its role in perpetuating violence.",
//     moreInfo:
//       "The campaign was inspired by villagers’ observations of religion being misused to justify aggression. It critiques distorted expressions of masculinity that fuel road rage, hate crimes, domestic abuse, and communal violence. Through posters, reels, and films, the initiative sparks dialogue with youth, women, and queer communities to challenge toxic masculinity.",
//     link: "#",
//   },
//   {
//     id: 5,
//     title: "Meetings with Communities and Trade Unions",
//     img: "community-meetings.png",
//     description:
//       "Collaborative dialogues with men, queer and trans activists, trade unions, and Muslim women to expand the feminist platform.",
//     moreInfo:
//       "Recent sessions brought together male activists, queer and trans groups, trade unionists, and Muslim women. Discussions covered topics from men’s roles in feminism to the denial of workplace rights for women. These engagements aim to build a united front across diverse communities against patriarchal oppression.",
//     link: "#",
//   },
// ];

function BlogCard({ title, image, details, link }) {
  return (
    <div className="blog-card">
      <img src={image} alt={title} className="blog-img" />
      <div className="blog-content">
        <h2>{title}</h2>
        <p>{details}</p>
        <a href={link} className="info-btn">
          <Link to={"/events"}>Read More</Link>
        </a>
      </div>
    </div>
  );
}

const displayedEvents = allData.slice(0, 4);
function BlogSection() {
  // const displayedBlogs = blogData.slice(0, 4); 

  return (
    <>
      <div className="blog-section-grid">
        {/* {displayedBlogs.map((blog) => ( */}
        {displayedEvents.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
      <div className="btn-container">
        {/* <Link to={"/blogs"} className="more-blogs-btn"> */}
        <Link to={"/events"} className="more-blogs-btn">
          More Events
        </Link>
      </div>
    </>
  );
}

function EventCards() {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <div className="events-container">
        {displayedEvents.map((event) => (
          <div className="event-card" key={event.id}>
            <div className="event-date">{event.date}</div>
            <div className="event-content">
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />
              <div className="event-text">
                <p>{event.title}</p>

                {expanded[event.id] && (
                  <p className="event-details">{event.details}</p>
                )}

                <button
                  className="event-link"
                  onClick={() => toggleExpand(event.id)}
                >
                  {expanded[event.id] ? "less info..." : "more info..."}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="btn-container">
        <Link to={"/events"} className="more-events-btn">
          More Events
        </Link>
      </div>
    </>
  );
}

const Homepage = () => {
  return (
    <>
      <ImageSlider />
      <div className="about-intro">
        Maharashtra Stree Mukti Parishad is a collective working towards the
        feminist transformation of society—empowering women, challenging
        inequalities, and building a future rooted in justice and equality.
      </div>

      <LeftTitleSection title={"Calendar And Highlights"} />

      {/* Flex container for calendar and notice board */}
      <div className="calendar-notice-flex">
        <div className="calendar-wrapper">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={CalendarEvents}
            height="auto"
          />
        </div>
        <div className="noticeboard-wrapper">
          <NoticeBoard />
        </div>
      </div>

      <Impact />
      <div className="homepage-she-speaks">
        <LeftTitleSection title={"Voices In Action"} />
      </div>
      {/* <EventCards />   */}
      {/* <div className="homepage-she-speaks">
        <RightTitleSection title={"She Speaks"} />
      </div> */}
      <BlogSection />
      <Footer />
    </>
  );
};

export default Homepage;
