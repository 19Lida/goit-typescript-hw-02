// import PropTypes from "prop-types";
import { Image } from "../App/App.types";
import styles from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  onImageClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => (
  <div className={styles.ImageCard}>
    <img
      src={image.urls.small}
      alt={image.alt_description}
      className={styles.Image}
      onClick={() => onImageClick(image)}
    />
  </div>
);

// ImageCard.propTypes = {
//   image: PropTypes.shape({
//     urls: PropTypes.shape({
//       small: PropTypes.string.isRequired,
//     }).isRequired,
//     alt_description: PropTypes.string,
//   }).isRequired,
//   onClick: PropTypes.func.isRequired,
// };

export default ImageCard;
