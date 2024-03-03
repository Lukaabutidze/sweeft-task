import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const api_url = "https://api.unsplash.com/photos";

interface ModalProps {
  imageUrl: string | null;
  likes: number | null;
  onClose: () => void;
  visible: boolean;
  imageId: string;
}

interface StatisticsData {
  id: string;
  downloads: {
    total: number;
  };
  views: {
    total: number;
  };
}

const Modal: React.FC<ModalProps> = ({
  imageUrl,
  likes,
  onClose,
  visible,
  imageId,
}) => {
  const [statistics, setStatistics] = useState<StatisticsData>();

  useEffect(() => {
    axios
      .get(
        `${api_url}/${imageId}/statistics?client_id=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((response) => response.data)
      .then((statisticsData) => {
        setStatistics(statisticsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [imageId]);

  if (!visible || imageUrl === null) return null;

  // Function to format large numbers (download, views)
  const formatNumber = (number: number | null) => {
    if (number === null) return "";
    return number.toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl relative opacity-95">
          {imageUrl && (
            <img src={imageUrl} alt="Modal Image" className="w-full" />
          )}

          <div className="p-4 m-10">
            <h1 className="text-lg font-bold mt-5">
              Downloads: {formatNumber(statistics?.downloads.total || 0)}
            </h1>
            <h1 className="text-lg font-bold mt-5">
              Views: {formatNumber(statistics?.views.total || 0)}
            </h1>
            <h1 className="text-lg font-bold mt-5">Likes: {likes}</h1>
          </div>
          <button
            className="absolute top-0 right-0 m-4 text-white hover:text-gray-800 focus:outline-none"
            onClick={onClose}
          >
            <svg
              className="h-8 w-8 text-2xl"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
