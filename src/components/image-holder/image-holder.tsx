import { FC, SyntheticEvent, useState } from "react";
import "./image-holder.scss";
import { ImagePreview } from "./image-preview/image-preview";
import { ImageUrlBox } from "./image-url-box/image-url-box";
import { ResetImageAction } from "./reset-image-action/reset-image-action";

interface IIMageHolderProps {}

export const ImageHolder: FC<IIMageHolderProps> = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageUrlError, setIsImageUrlError] = useState<boolean>(false);
  const [focusOnUrlBox, setFocusOnUrlBox] = useState<boolean>(true);

  const handleChangeImageUrl = (url: string) => {
    !isImageUrlError && setImageUrl(url);
    setIsImageUrlError(false);
    setFocusOnUrlBox(false);
  };

  const handleImageError = function (error: SyntheticEvent) {
    if (error?.type === "error") {
      setIsImageUrlError(true);
    }
  };

  const isImageSpecified = (): boolean => imageUrl.trim().length > 0;

  const isImageLoaded = (): boolean =>
    imageUrl.trim().length > 0 && isImageUrlError !== true;

  const resetImage = (): void => {
    setIsImageUrlError(false);
    setImageUrl("");
    setFocusOnUrlBox(true);
  };

  const onImageTypeNotSupported = () => {
    console.log("onImageTypeNotSupported");
    setIsImageUrlError(true);
  };

  return (
    <div className="box">
      <div>
        {!isImageSpecified() ? (
          <ImageUrlBox
            setFocus={focusOnUrlBox}
            onChangeUrl={handleChangeImageUrl}
            onImageTypeNotSupported={onImageTypeNotSupported}
          />
        ) : (
          <>
            <ImagePreview
              onImageError={handleImageError}
              imageUrl={imageUrl}
              isImageUrlNotFound={isImageUrlError}
            />
            <ResetImageAction resetImage={resetImage} />
          </>
        )}
      </div>
    </div>
  );
};
