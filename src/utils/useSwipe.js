import { useEffect, useRef, useState } from "react";

const useSwipe = () => {
  const containerRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
    isDragging = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    isDragging = false;

    const container = containerRef.current;
    if (!container) return;

    const cardWidth = container.firstChild ? container.firstChild.offsetWidth : 300;
    const swipeDistance = touchStartX - touchEndX;
    const swipeThreshold = 1000;

    if (swipeDistance > swipeThreshold) {
      smoothScroll(container.scrollLeft + cardWidth);
    } else if (swipeDistance < -swipeThreshold) {
      smoothScroll(container.scrollLeft - cardWidth);
    }
  };

  const smoothScroll = (targetPosition) => {
    const container = containerRef.current;
    if (!container) return;

    const startPosition = container.scrollLeft;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animateScroll = (time) => {
      if (!startTime) startTime = time;
      const timeElapsed = time - startTime;
      const progress = Math.min(timeElapsed / 300, 1);

      container.scrollLeft = startPosition + distance * progress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return {
    containerRef,
    isTouchDevice,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useSwipe;

