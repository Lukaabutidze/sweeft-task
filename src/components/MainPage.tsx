import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import Loader from "./Loader";
import SearchInput from "./SearchInput";
import ImageCard from "./ImageCard";
import InfiniteScroll from "./InfiniteScroll";

// const api_url2 = "https://api.unsplash.com/search/photos";
// api key in .env file (didnt hide it on purpose)

const api_url = "https://api.unsplash.com/photos";

interface ImageData {
  id: string;
  urls: {
    small: string;
  };
  likes: number;
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

const MainPage = () => {
  const [images, setImages] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState<ImageData | null>(null);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<StatisticsData[]>([]);
  const [page, setPage] = useState(1);

  //   Modal functionality
  const handleCloseModal = () => {
    setShowModal(false);
  };
  //
  const handleImageclick = (img: any) => {
    setSelectedImg(img);
    setShowModal(true);
  };

  /* Search functionality */

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredImgs = images.filter(
    (img) =>
      img.alt_description &&
      img.alt_description.toLowerCase().includes(search.toLowerCase())
  );

  // Data Fetch
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${api_url}?query=${
          search.valueOf
        }&per_page=10&page=${page}&order_by=popular&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((res) => {
        const responseData: ImageData[] = res.data;
        setImages((prev) => [...prev, ...responseData]);
        setLoading(false);

        //

        Promise.all(
          responseData.map((image) =>
            axios
              .get(
                `${api_url}/${image.id}/statistics?client_id=${
                  import.meta.env.VITE_API_KEY
                }`
              )
              .then((response) => response.data)
          )
        )
          .then((statisticsData) => {
            setStatistics((prev) => [...prev, ...statisticsData]);
          })
          .catch((error) => {
            console.log(error);
          });
      })

      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [page]);

  return (
    <>
      {/* Search Input Field */}
      <div className="flex justify-center mt-7">
        <SearchInput value={search} onChange={handleSearch} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {filteredImgs?.map((img, index) => (
          <div key={index} className="flex justify-evenly m-10 rounded-lg">
            <ImageCard key={index} img={img} onClick={handleImageclick} />
          </div>
        ))}
      </div>
      {loading && <Loader />}
      {/* Modal */}
      {selectedImg && (
        <Modal
          imageUrl={selectedImg.urls.small}
          likes={selectedImg.likes}
          views={
            statistics.find((stat) => stat.id === selectedImg.id)?.views
              ?.total || 0
          }
          downloads={
            statistics.find((stat) => stat.id === selectedImg.id)?.downloads
              ?.total || 0
          }
          visible={showModal}
          onClose={handleCloseModal}
        />
      )}
      {/* Infinite Scroll */}
      <InfiniteScroll onLoadMore={() => setPage((prev) => prev + 1)} />;
    </>
  );
};

export default MainPage;
