import { useEffect, useState } from "react";

const useIntersectionObserver = (reference, threshold) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleIntersect = (entries, observer) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entries[0].target);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: threshold,
    });

    if (reference && reference.current) {
      observer.observe(reference.current);
    }

    // Cleanup on unmount or dependencies change
    return () => {
      observer.disconnect();
    };
  }, [reference, threshold]);

  return isVisible;
};

export default useIntersectionObserver;
