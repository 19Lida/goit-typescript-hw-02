import Modal from "react-modal";
// import PropTypes from "prop-types";
import style from "./ImageModal.module.css";
import { Image } from "../App/App.types";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image?: Image | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  image,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <button className={style.closeButton} onClick={onRequestClose}>
        &times;
      </button>
      <img
        src={image?.urls?.regular}
        alt={image?.alt_description}
        className={style.image}
      />
      <div className={style.info}>
        <h2 className={style.descr}>{image?.description || "Untitled"}</h2>
        <p className={style.text}>By: {image?.user?.name}</p>
        <p className={style.text}>Likes: {image?.likes}</p>
      </div>
    </Modal>
  );
};
// const ImageModal = ({ image, onClose }) => {
//   const handleKeyDown = (e) => {
//     if (e.key === "Escape") {
//       onClose();
//     }
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <Modal
//       isOpen={true}
//       onRequestClose={onClose}
//       onAfterOpen={() => window.addEventListener("keydown", handleKeyDown)}
//       onAfterClose={() => window.removeEventListener("keydown", handleKeyDown)}
//       className={styles.Modal}
//       overlayClassName={styles.Overlay}
//     >
//       <div className={styles.ModalContent} onClick={handleBackdropClick}>
//         <img src={image.urls.regular} alt={image.alt_description} />
//         <div className={styles.Info}>
//           <p>
//             <strong>Description:</strong>{" "}
//             {image.description || "No description"}
//           </p>
//           <p>
//             <strong>Author:</strong> {image.user.name}
//           </p>
//           <p>
//             <strong>Likes:</strong> {image.likes}
//           </p>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// ImageModal.propTypes = {
//   image: PropTypes.shape({
//     urls: PropTypes.shape({
//       regular: PropTypes.string.isRequired,
//     }).isRequired,
//     alt_description: PropTypes.string,
//     description: PropTypes.string,
//     user: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//     }).isRequired,
//     likes: PropTypes.number.isRequired,
//   }).isRequired,
//   onClose: PropTypes.func.isRequired,
// };

export default ImageModal;
