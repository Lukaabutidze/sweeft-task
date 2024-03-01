import React, { useEffect } from "react";

interface InfiniteScrollProps {
  onLoadMore: () => void;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ onLoadMore }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        onLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onLoadMore]);

  return null;
};

export default InfiniteScroll;
