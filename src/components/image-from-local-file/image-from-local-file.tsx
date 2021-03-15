import { FC, useState } from "react";
import { MdDescription } from "react-icons/md";
import { Button } from "reactstrap";
import { imageService } from "../../shared/services/image.service";

import "./image-from-local-file.scss";

interface ILoadImageFromLocalFileProps {
  onFileLoaded: (imageDataUrl: string) => void;
}

export const LoadImageFromLocalFileAction: FC<ILoadImageFromLocalFileProps> = ({
  onFileLoaded,
  children,
}) => {
  let fileInputRef: any;

  const onClickFacade = () => {
    fileInputRef.click();
  };

  const handleFile = () => {
    console.log("fileInputRef.files[0]  ", fileInputRef.files[0]);
    imageService
      .loadImageFromLocalFile(fileInputRef.files[0])
      .then(onFileLoaded)
      .catch(() => alert("Error while loading the image file"))
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
          style={{ display: "none" }}
          ref={(input) => (fileInputRef = input)}
          onChange={handleFile}
        />
      )}
      <Button
        className="btn-icon btn-3"
        color="primary"
        onClick={onClickFacade}
      >
        <MdDescription color="white" size={20} />
        <span className="btn-inner--text"> {children}</span>
      </Button>
    </>
  );
};
