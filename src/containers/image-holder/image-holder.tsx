import { FC, SyntheticEvent, useState } from "react";
import { SerializableTagsData } from "../../shared/models/serializable-tag-data.model";
import { TagCoordinates } from "../../shared/models/tag-coordinates.model";
import { Tag } from "../../shared/models/tag.model";
import { TagItem } from "../../components/tag-item/tag-item";
import { LoadImageFromLocalFileAction } from "../../components/image-from-local-file/image-from-local-file";
import "./image-holder.scss";
import { ImagePreview } from "../../components/image-preview/image-preview";
import { ImageUrlBox } from "../../components/image-url-box/image-url-box";
import { LoadTagsFromFileAction } from "../../components/call-to-actions/load-tags-from-file-action/load-tags-from-file-action";
import { ResetImageAction } from "../../components/call-to-actions/reset-image-action/reset-image-action";
import { SaveToFileAction } from "../../components/save-to-file-action/save-to-file-action";
import { TagsList } from "../../components/tags-list/tags-list";

interface IIMageHolderProps {}

export const ImageHolder: FC<IIMageHolderProps> = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [hasAddedTag, setHasAddedTag] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageUrlError, setIsImageUrlError] = useState<boolean>(false);
  const [focusOnUrlBox, setFocusOnUrlBox] = useState<boolean>(true);
  const [tagCoordinates, setTagCoordinates] = useState<TagCoordinates>({
    X: 0,
    Y: 0,
  });

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

  const isImageLoaded = (): boolean => imageUrl.trim().length > 0;

  const resetImage = (): void => {
    setTags([]);
    setIsImageUrlError(false);
    setImageUrl("");
    setFocusOnUrlBox(true);
  };

  const onImageTypeNotSupported = () => {
    setIsImageUrlError(true);
  };

  const onClickOverImage = (event: MouseEvent) => {
    const { clientX: X, clientY: Y } = event;
    setUnmountTagFactory(false);
    setTagCoordinates({ X, Y });
    setHasAddedTag(false);
  };

  const addTag = (newTag: Tag) => {
    setTags((tags) => [...tags, newTag]);
    setHasAddedTag(true);
  };

  const updateTag = (tagId: Tag["id"], tagUpdated: Partial<Tag>) => {
    const tagsListUpdated = tags.map((currentTag) => {
      if (currentTag?.id === tagId) {
        return {
          ...currentTag,
          ...tagUpdated,
        };
      }
      return currentTag;
    });
    setTags(tagsListUpdated);
  };

  const removeTag = (tagId: Tag["id"]) => {
    setTags(tags.filter((currentTag) => currentTag?.id !== tagId));
  };

  const isTagCoordinatesDefined = (): boolean =>
    tagCoordinates.X + tagCoordinates.Y > 0;

  const showTagFactory = (): boolean =>
    isImageLoaded() &&
    isTagCoordinatesDefined() &&
    !hasAddedTag &&
    unmountTagFactory !== true;

  const onLoadTagsFromFile = ({ imageUrl, tags }: SerializableTagsData) => {
    handleChangeImageUrl(imageUrl);
    setTags(tags);
  };

  const [unmountTagFactory, setUnmountTagFactory] = useState<boolean>(false);

  const onLocalImageLoaded = (imageDataUrl: string) => {
    handleChangeImageUrl(imageDataUrl);
  };

  return (
    <>
      {showTagFactory() && (
        <TagItem
          coordinates={tagCoordinates}
          addTag={addTag}
          updateTag={updateTag}
          removeTag={removeTag}
          removeFactory={() => setUnmountTagFactory(true)}
        />
      )}
      {tags.length > 0 && (
        <TagsList tags={tags} updateTag={updateTag} removeTag={removeTag} />
      )}
      <div className="box">
        <div>
          {!isImageLoaded() ? (
            <>
              <ImageUrlBox
                setFocus={focusOnUrlBox}
                onChangeUrl={handleChangeImageUrl}
                onImageTypeNotSupported={onImageTypeNotSupported}
              />
              <p>- OR -</p>
              <LoadImageFromLocalFileAction onFileLoaded={onLocalImageLoaded}>
                Pick a file on local disk drive
              </LoadImageFromLocalFileAction>
            </>
          ) : (
            <ImagePreview
              onClickOverImage={onClickOverImage}
              onImageError={handleImageError}
              imageUrl={imageUrl}
            />
          )}
        </div>
      </div>
      <div className="actions">
        <ResetImageAction resetImage={resetImage} disabled={!isImageLoaded()}>
          Change image
        </ResetImageAction>
        <SaveToFileAction
          format="json"
          tags={tags}
          imageUrl={imageUrl}
          disabled={tags.length === 0}
        >
          Save to a JSON file
        </SaveToFileAction>
        <LoadTagsFromFileAction onFileLoaded={onLoadTagsFromFile}>
          Load from a JSON file
        </LoadTagsFromFileAction>
      </div>
    </>
  );
};
