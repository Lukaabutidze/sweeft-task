import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import ImageCard from "./ImageCard";
import Modal from "./Modal";

interface ImageData {
  id: string;
  urls: {
    small: string;
  };
  likes: number;
}

const api_url2 = "https://api.unsplash.com/search/photos";

const History = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<ImageData | null>(null);
  const [showModal, setShowModal] = useState(false);

  //   Modal functionality
  const handleCloseModal = () => {
    setShowModal(false);
  };
  //
  const handleImageClick = (img: any) => {
    setSelectedImg(img);
    setShowModal(true);
  };

  useEffect(() => {
    const storedSearchTerm = sessionStorage.getItem("searchTerm");
    if (storedSearchTerm && !searchHistory.includes(storedSearchTerm)) {
      setSearchHistory((prevHistory) => {
        const uniqueSearchHistory = prevHistory.filter(
          (term) => term !== storedSearchTerm
        );
        return [...uniqueSearchHistory, storedSearchTerm];
      });
    } else if (storedSearchTerm === "") {
      const lastNonEmptyTerm = searchHistory.find((term) => term !== "");
      if (lastNonEmptyTerm) {
        handleSearchTermClick(lastNonEmptyTerm);
      }
    }
  }, []);

  const handleSearchTermClick = async (searchTerm: string) => {
    setLoading(true);
    try {
      const cachedData = sessionStorage.getItem(`searchResults_${searchTerm}`);
      if (cachedData) {
        setSearchResults(JSON.parse(cachedData));
        setLoading(false);
      } else {
        const response = await axios.get(
          `${api_url2}?query=${searchTerm}&per_page=20&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const searchData: ImageData[] = response.data.results;
        setSearchResults(searchData);
        sessionStorage.setItem(
          `searchResults_${searchTerm}`,
          JSON.stringify(searchData)
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold">Search History:</h2>
      <ul className="text-2xl font-semibold p-5 cursor-pointer">
        {searchHistory.map((term, index) => (
          <li
            key={index}
            onClick={() => handleSearchTermClick(term)}
            className="capitalize"
          >
            {term}
          </li>
        ))}
      </ul>
      {loading && <Loader />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {searchResults.map((img, index) => (
          <div key={index} className="flex justify-evenly m-10 rounded-lg">
            <ImageCard img={img} onClick={handleImageClick} />
          </div>
        ))}
      </div>
      {selectedImg && (
        <Modal
          imageUrl={selectedImg.urls.small}
          likes={selectedImg.likes}
          visible={showModal}
          onClose={handleCloseModal}
          imageId={selectedImg.id}
        />
      )}
    </div>
  );
};

export default History;
