import { FC, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { Button } from "reactstrap";
import { SerializableTagsData } from "../../../shared/models/serializable-tag-data.model";
import { tagService } from "../../../shared/services/tag.service";

import "./load-tags-from-file-action.scss";

interface ILoadTagsFromFileActionProps {
  onFileLoaded: (tagsData: SerializableTagsData) => void;
}

export const LoadTagsFromFileAction: FC<ILoadTagsFromFileActionProps> = ({
  onFileLoaded,
  children,
}) => {
  let fileInputRef: any;

  const onClickFacade = () => {
    fileInputRef.click();
  };

  const handleFile = () => {
    tagService
      .loadTagsFromJsonFile(fileInputRef.files[0])
      .then(onFileLoaded)
      .catch(() => alert("Error while loading the JSON file"))
      .finally(() => {
        // here is a workaround to allow input:file:onChange() event be fired event though the same file is selected again
        setMountInputFile(true);
        setMountInputFile(true);
      });
  };

  const [mountInputFile, setMountInputFile] = useState<boolean>(true);

  return (
    <>
      {mountInputFile === true && (
        <input
          type="file"
          name="file-selector"
          id="load-json-file-selector"
          ref={(input) => (fileInputRef = input)}
          onChange={handleFile}
        />
      )}
      <Button
        className="btn-icon btn-3"
        color="primary"
        onClick={onClickFacade}
      >
        <MdCloudUpload color="white" size={20} />
        <span className="btn-inner--text"> {children}</span>
      </Button>
    </>
  );
};
