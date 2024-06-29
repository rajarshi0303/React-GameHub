import React, { useEffect, useRef } from "react";

const LazyVideo = ({
  src,
  type,
  className,
  autoPlay = false,
  loop = false,
  muted = false,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const lazyVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((video) => {
        if (video.isIntersecting) {
          const videoElement = video.target;
          const sources = videoElement.querySelectorAll("source");
          sources.forEach((source) => {
            if (source.tagName === "SOURCE") {
              source.src = source.dataset.src;
            }
          });
          videoElement.load();
          videoElement.classList.remove("lazy");
          lazyVideoObserver.unobserve(videoElement);
        }
      });
    });

    lazyVideoObserver.observe(videoRef.current);

    return () => {
      lazyVideoObserver.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      controls={!autoPlay}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
    >
      <source data-src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default LazyVideo;
