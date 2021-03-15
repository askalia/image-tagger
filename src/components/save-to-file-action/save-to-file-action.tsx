import { FC } from "react";
import { MdSave } from "react-icons/md";
import { Button } from "reactstrap";
import { Tag } from "../../shared/models/tag.model";
import { tagService } from "../../shared/services/tag.service";
import "./save-to-file-action.scss";

interface ISaveToFileActionProps {
  format: "json";
  tags: Tag[];
  imageUrl: string;
  disabled: boolean;
}

export const SaveToFileAction: FC<ISaveToFileActionProps> = ({
  format,
  tags,
  imageUrl,
  disabled,
  children,
}) => (
  <Button
    disabled={disabled}
    className="btn-icon btn-3"
    color="primary"
    onClick={() =>
      format === "json" &&
      tagService?.saveToJsonFile(
        { imageUrl, tags },
        `image-tagger-${String(new Date().getTime())}.json`
      )
    }
  >
    <MdSave color="white" size={20} />
    <span className="btn-inner--text"> {children}</span>
  </Button>
);
