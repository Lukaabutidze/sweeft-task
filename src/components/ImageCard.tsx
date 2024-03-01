interface ImageCardProps {
  img: any;
  onClick: (img: any) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ img, onClick }) => {
  return (
    <div className="flex justify-evenly m-10 rounded-lg">
      <img
        src={img.urls.small}
        alt={img.alt_description}
        onClick={() => onClick(img)}
        className="cursor-pointer shadow-xl rounded-lg transition-all-ease duration-500 hover:scale-110 max-h-80 w-auto"
        title="Click to see Details..."
      />
    </div>
  );
};

export default ImageCard;
