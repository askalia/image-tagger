import { FC } from "react";
import { MdCloudDownload } from "react-icons/md";
import { Button } from "reactstrap";
import { Tag } from "../../../shared/models/tag.model";
import { tagService } from "../../../shared/services/tag.service";
import "./save-to-file-action.scss";

interface ISaveToFileActionProps {
  format: "json";
  tags: Tag[];
  imageUrl: string;
}

export const SaveToFileAction: FC<ISaveToFileActionProps> = ({
  format,
  tags,
  imageUrl,
  children
}) => (
  <Button
    disabled={tags.length === 0}
    className="savetofile-action btn-icon btn-3"
    color="primary"
    onClick={() =>
      format === "json" &&
      tagService?.saveToJsonFile(
        imageUrl,
        tags,
        `image-tagger-${String(new Date().getTime())}.json`
      )
    }
  >
    <MdCloudDownload color="white" />
    <span className="btn-inner--text"> {children}</span>
  </Button>
);
