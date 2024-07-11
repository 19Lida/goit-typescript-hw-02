import React from "react";
import { Image } from "../App/App.types";
import style from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  onImageClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => (
  <div className={style.ImageCard}>
    <img
      src={image.urls.small}
      alt={image.alt_description}
      className={style.Image}
      onClick={() => onImageClick(image)}
    />
  </div>
);

export default ImageCard;
