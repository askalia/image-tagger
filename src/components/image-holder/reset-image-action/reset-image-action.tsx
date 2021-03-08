import { FC } from "react";
import { MdCached } from "react-icons/md";
import { Button } from "reactstrap";
import "./reset-image-action.scss"

interface IResetImageAction {
  resetImage: () => void;
}

export const ResetImageAction: FC<IResetImageAction> = ({ resetImage }) => (
  <Button
    className="reset-action btn-icon btn-3"
    color="primary"
    onClick={resetImage}
  >
    <MdCached color="white" />
    <span className="btn-inner--text"> Change image</span>
  </Button>
);
