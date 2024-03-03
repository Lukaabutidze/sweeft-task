import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import Loader from "./Loader";
import SearchInput from "./SearchInput";
import ImageCard from "./ImageCard";
import InfiniteScroll from "./InfiniteScroll";
import debounce from "./debounce/debounce";

const api_url2 = "https://api.unsplash.com/search/photos";

// api key in .env file (didnt include it in gitignore on purpose)

const api_url = "https://api.unsplash.com/photos";

interface ImageData {
  id: string;
  urls: {
    small: string;
  };
  likes: number;
}

const MainPage = () => {
  const [images, setImages] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState<ImageData | null>(null);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState<ImageData[]>([]);

  //   Modal functionality
  const handleCloseModal = () => {
    setShowModal(false);
  };
  //
  const handleImageClick = (img: any) => {
    setSelectedImg(img);
    setShowModal(true);
  };

  // Search Word Functionaality
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
    sessionStorage.setItem("searchTerm", searchTerm);

    setTimeout(() => {
      sessionStorage.removeItem("searchTerm");
    }, 300000); // 5 minutes
  };

  // Data Fetch of Popular images

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${api_url}?query=${search}&per_page=20&page=${page}&order_by=popular&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((res) => {
        const responseData: ImageData[] = res.data;

        if (page === 1) {
          setImages(responseData);
        } else {
          setImages((prev) => [...prev, ...responseData]);
        }
        setLoading(false);

        //
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [page]);

  // Data Fetch of Search Input word
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${api_url2}?query=${search}&per_page=20&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const searchData: ImageData[] = response.data.results;
        setSearchResults(searchData);
        sessionStorage.setItem(
          "searchHistory",
          JSON.stringify(searchData.map((item: ImageData) => item.id))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    // debounce time will be 1.5 seconds
    const debouncedFetchData = debounce(fetchData, 1500);

    debouncedFetchData();

    return () => {
      debouncedFetchData.cancel();
    };
  }, [search]);

  return (
    <>
      <div className="flex justify-center mt-7">
        <SearchInput value={search} onChange={handleSearch} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2 mt-5">
        {(searchResults.length > 0 ? searchResults : images)?.map(
          (img, index) => (
            <div key={index} className="flex justify-evenly m-10 rounded-lg">
              <ImageCard img={img} onClick={handleImageClick} />
            </div>
          )
        )}
      </div>
      {/* Modal */}
      {selectedImg && (
        <Modal
          imageUrl={selectedImg.urls.small}
          likes={selectedImg.likes}
          visible={showModal}
          onClose={handleCloseModal}
          imageId={selectedImg.id}
        />
      )}
      {/* Infinite Scroll */}
      <InfiniteScroll onLoadMore={() => setPage((prev) => prev + 1)} />;
      {loading && <Loader />}
    </>
  );
};

export default MainPage;
