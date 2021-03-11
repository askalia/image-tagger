import { FC } from "react";
import { MdCached } from "react-icons/md";
import { Button } from "reactstrap";
import "./reset-image-action.scss";

interface IResetImageActionProps {
  resetImage: () => void;
  disabled: boolean;
}

export const ResetImageAction: FC<IResetImageActionProps> = ({
  resetImage,
  disabled,
  children,
}) => (
  <Button
    className="reset-action btn-icon btn-3"
    color="primary"
    onClick={resetImage}
    disabled={disabled}
  >
    <MdCached color="white" size={20} />
    <span className="btn-inner--text"> {children}</span>
  </Button>
);
