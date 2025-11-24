import React, { useState, useEffect } from "react";
import "./Notice.css";
import { getImageUrl } from "../../utils/imageHelper";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/notices`);
        if (res.ok) {
          const data = await res.json();
          setNotices(data);
        }
      } catch (err) {
        console.error("Error fetching notices:", err);
      }
    };

    fetchNotices();
  }, []);

  const openVideo = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setSelectedImage(null);
    setIsLoading(true);
  };

  const openImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setSelectedVideo(null);
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setSelectedImage(null);
    setIsLoading(false);
  };

  return (
    <section className="noticeboard-container">
      <h2 className="noticeboard-title">Latest Highlights</h2>
      <div className="noticeboard-list">
        {notices.map((notice) => (
          <div className="noticeboard-item" key={notice._id || notice.id}>
            <div className="noticeboard-text">
              <h3 className="noticeboard-heading">{notice.title}</h3>
              <p
                className="noticeboard-description"
                dangerouslySetInnerHTML={{
                  __html: notice.text.replace(/\n/g, "<br />"),
                }}
              ></p>

              {/* Show video preview if videoUrl exists */}
              {notice.videoUrl && (
                <div
                  className="video-preview"
                  onClick={() => openVideo(notice.videoUrl)}
                >
                  <video
                    src={notice.videoUrl}
                    muted
                    preload="metadata"
                    className="noticeboard-video-thumb"
                  />
                  <div className="play-overlay">▶</div>
                </div>
              )}{" "}
              {!notice.videoUrl && notice.imageUrl && (
                <div
                  className="image-preview"
                  onClick={() => openImage(getImageUrl(notice.imageUrl))}
                >
                  <img
                    src={getImageUrl(notice.imageUrl)}
                    alt={notice.title}
                    className="noticeboard-image-thumb"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={closeModal}>
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={`close-btn ${isLoading ? "hidden" : ""}`}
              onClick={closeModal}
            >
              ✕
            </span>

            {/* Loader Overlay */}
            {isLoading && (
              <div className="video-loader">
                <div className="spinner"></div>
                <p>Loading video...</p>
              </div>
            )}

            <video
              src={selectedVideo}
              controls
              autoPlay
              onLoadedData={handleVideoLoaded}
              className={`modal-video-player ${isLoading ? "hidden" : ""}`}
            />
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="close-btn" onClick={closeModal}>
              ✕
            </span>
            <img
              src={selectedImage}
              alt="Notice"
              className="modal-image-viewer"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default NoticeBoard;