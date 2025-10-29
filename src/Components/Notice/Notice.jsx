import React, { useState } from "react";
import "./Notice.css";
import { notices } from "../../data/alldata";

const NoticeBoard = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

              {/* Show video preview if videoUrl exists */}
                    {/* Video Preview if available */}
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
                        onClick={() => openImage(notice.imageUrl)}
                      >
                        <img
                          src={notice.imageUrl}
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
            <span className={`close-btn ${isLoading ? "hidden" : ""}`} onClick={closeModal}>
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
