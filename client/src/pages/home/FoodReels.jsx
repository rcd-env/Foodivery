import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

function FoodReels() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    // Fetch reel data from API
    const fetchReels = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://foodivery.onrender.com/api/food"
        ); // Adjust the endpoint as needed
        const data = response.data;
        if (Array.isArray(data.foodItems) && data.foodItems.length > 0) {
          setReels(data.foodItems);
        }
      } catch (error) {
        console.log("Error fetching reels:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReels();
  }, []); // Added empty dependency array to prevent infinite re-renders

  // Handle scroll to change current video index
  const handleScroll = () => {
    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const newIndex = Math.round(scrollTop / containerHeight);

    if (
      newIndex !== currentVideoIndex &&
      newIndex >= 0 &&
      newIndex < reels.length
    ) {
      setCurrentVideoIndex(newIndex);
    }
  };

  useEffect(() => {
    const snapScroll = () => {
      const container = containerRef.current;
      const containerHeight = container.clientHeight;
      const targetScrollTop = currentVideoIndex * containerHeight;

      container.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    };

    snapScroll();
  }, [currentVideoIndex]);

  // Handle video play/pause based on current index
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.currentTime = 0;
          video.play().catch((e) => console.log("Video play failed:", e));
        } else {
          video.pause();
        }
      }
    });
  }, [currentVideoIndex]);

  const truncateDescription = (text, maxLines = 2) => {
    const words = text.split(" ");
    const maxWordsPerLine = 8; // Approximate words per line
    const maxWords = maxLines * maxWordsPerLine;

    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div
      ref={containerRef}
      className="reel-container fixed top-16 left-0 w-full overflow-y-scroll snap-y snap-mandatory bottom-26 sm:bottom-20"
      onScroll={handleScroll}
    >
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-lg">Loading foods...</div>
        </div>
      ) : reels.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-lg">No food available</div>
        </div>
      ) : (
        reels.map((reel, index) => (
          <div
            key={reel._id}
            className="relative w-full h-full snap-start snap-always flex items-center justify-center bg-black"
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="reel-video w-full h-full"
              src={reel.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            {/* Overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              {/* Description */}
              <div className="mb-3 sm:mb-4">
                <p className="text-white text-md font-bold sm:text-sm leading-4 sm:leading-5 mb-2">
                  {truncateDescription(reel.name)}
                </p>
              </div>
              <div className="mb-3 sm:mb-4">
                <p className="text-white text-xs sm:text-sm leading-4 sm:leading-5 mb-2">
                  {truncateDescription(reel.description)}
                </p>
              </div>

              {/* Visit Store Button */}
              {/* <Link
                to={`/store/${reel.foodPartner}`}
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 shadow-lg text-sm sm:text-base text-center"
              >
                Visit {reel.name}
              </Link> */}
            </div>
            {/* Video indicator dots */}
            <div className="absolute top-4 right-4 flex flex-col gap-1.5 sm:gap-2">
              {reels.map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
                    dotIndex === currentVideoIndex
                      ? "bg-orange-500"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FoodReels;
