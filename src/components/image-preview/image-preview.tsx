import { FC, SyntheticEvent, useEffect, useState } from "react";
import { ImageNotFound } from "../image-not-found/image-not-found";
import "./image-preview.scss";

const ALT_IMAGE_TO_TAG = "this pic is the one to be tagged";

interface IImagePreviewProps {
  imageUrl: string;
  coverImageUrlNotFound?: string;
  onImageError: (event: SyntheticEvent) => void;
  onClickOverImage: (event: MouseEvent) => void;
}

export const ImagePreview: FC<IImagePreviewProps> = ({
  imageUrl,
  coverImageUrlNotFound,
  onImageError,
  onClickOverImage,
}) => {
  const [isImageUrlNotFound, setIsImageUrlNotFound] = useState<boolean>(false);
  const onError = (error: SyntheticEvent) => {
    console.log("get there");
    setIsImageUrlNotFound(true);

    onImageError(error);
  };

  useEffect(() => {
    setIsImageUrlNotFound(false);
  }, [imageUrl]);
  

  return (
  <div>
    {isImageUrlNotFound === true ? (
      <ImageNotFound
        
        coverImageUrlNotFound={coverImageUrlNotFound}
      />
    ) : (
      <img
        data-cy="image-preview"
        src={imageUrl}
        alt={ALT_IMAGE_TO_TAG}
        onError={onError}
        onLoad={() => console.log("img loaded")}
        onClick={(event: unknown) => onClickOverImage(event as MouseEvent)}
      />
    )}
  </div>)
};
