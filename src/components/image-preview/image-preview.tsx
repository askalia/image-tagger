import { FC, SyntheticEvent } from "react";
import { ImageNotFound } from "../image-not-found/image-not-found";
import "./image-preview.scss"

const ALT_IMAGE_TO_TAG = "this pic is the one to be tagged";

interface IImagePreviewProps {
  imageUrl: string;
  isImageUrlNotFound: boolean;
  coverImageUrlNotFound?: string;
  onImageError: (event: SyntheticEvent) => void;
  onClickOverImage: (event: MouseEvent) => void;
}

export const ImagePreview: FC<IImagePreviewProps> = ({
  imageUrl,
  isImageUrlNotFound,
  coverImageUrlNotFound,
  onImageError,
  onClickOverImage,
}) =>
  isImageUrlNotFound ? (
    <ImageNotFound coverImageUrlNotFound={coverImageUrlNotFound} />
  ) : (
    <img
      src={imageUrl}
      alt={ALT_IMAGE_TO_TAG}
      onError={onImageError}
      onClick={(event: unknown) => onClickOverImage(event as MouseEvent)}
    />
  );
