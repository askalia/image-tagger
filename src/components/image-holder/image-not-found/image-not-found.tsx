import { FC } from "react";
import imageUrl from "../../../assets/img/image-not-found.png";
//const COVER_IMAGE_NOT_FOUND = "./../../../assets/img/image-not-found.png"
//"https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png";

interface IImageNotFoundProps {
  coverImageUrlNotFound?: string;
}

export const ImageNotFound: FC<IImageNotFoundProps> = ({
  coverImageUrlNotFound,
}) => <img src={coverImageUrlNotFound || imageUrl} alt="not found" />;
