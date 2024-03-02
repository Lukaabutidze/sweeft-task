interface ModalProps {
  imageUrl: string | null;
  downloads: number | null;
  views: number | null;
  likes: number | null;
  onClose: () => void;
  visible: boolean;
}

const Modal: React.FC<ModalProps> = ({
  imageUrl,
  downloads,
  views,
  likes,
  onClose,
  visible,
}) => {
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
              Downloads: {formatNumber(downloads)}
            </h1>
            <h1 className="text-lg font-bold mt-5">
              Views: {formatNumber(views)}
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
