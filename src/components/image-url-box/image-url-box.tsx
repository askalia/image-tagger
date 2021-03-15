import { ChangeEvent, FC, useEffect } from "react";
import { imageService } from "../../shared/services/image.service";

interface IImageUrlBoxProps {
  setFocus: boolean;
  placeholder?: string;
  onChangeUrl(url: string): void;
  onImageTypeNotSupported: () => void;
}

export const ImageUrlBox: FC<IImageUrlBoxProps> = ({
  setFocus,
  placeholder,
  onChangeUrl,
  onImageTypeNotSupported,
}) => {
  const handleChangeUrl = (url: string) => {
    if (imageService.isImageExtensionSupported(url)) {
      onChangeUrl(url);
    } else {
      onImageTypeNotSupported();
    }
  };

  let urlBox: HTMLInputElement | null;

  useEffect(() => {
    setFocus === true && (urlBox as HTMLInputElement).focus();
  });

  return (
    <input
      className="form-control"
      type="search"
      size={4}
      ref={(input) => (urlBox = input)}
      placeholder={placeholder || "Paste URL of the image to be tagged"}
      onChange={(event: ChangeEvent) =>
        handleChangeUrl((event.target as HTMLInputElement).value)
      }
    />
  );
};
