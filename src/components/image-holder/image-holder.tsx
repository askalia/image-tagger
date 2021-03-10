import { FC, SyntheticEvent, useState } from "react";
import shortid from "shortid";
import { TagCoordinates } from "../../shared/models/tag-coordinates.model";
import { Tag } from "../../shared/models/tag.model";
import { TagFactory } from "../tag-factory/tag-factory";
import { TagItem } from "../tag-item/tag-item";
import "./image-holder.scss";
import { ImagePreview } from "./image-preview/image-preview";
import { ImageUrlBox } from "./image-url-box/image-url-box";
import { ResetImageAction } from "./reset-image-action/reset-image-action";
import { SaveToFileAction } from "./save-to-file-action/save-to-file-action";

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
    setTagCoordinates({ X, Y });
    setHasAddedTag(false);
  };

  const addTag = (newTag: Tag) => {
    setHasAddedTag(true);
    setTags((tags) => [...tags, newTag]);
  };

  const updateTag = (tagId: Tag["id"], tagUpdated: Partial<Tag>) => {
    const foundTag = tags.find((currentTag) => currentTag?.id === tagId);
    if (foundTag) {
      const tagsUpdated = [
        ...tags.filter((currentTag) => currentTag.id !== tagId),
        {
          ...foundTag,
          ...tagUpdated,
        } as Tag,
      ];
      setTags(tagsUpdated);
    }
  };

  const removeTag = (tagId: Tag["id"]) => {
    setTags(tags.filter((currentTag) => currentTag?.id !== tagId));
  };

  const isTagCoordinatesDefined = (): boolean =>
    tagCoordinates.X + tagCoordinates.Y > 0;

  const showTagFactory = (): boolean =>
    isImageLoaded() && isTagCoordinatesDefined() && !hasAddedTag;

  return (
    <>
      {showTagFactory() && (
        <TagFactory coordinates={tagCoordinates} addTag={addTag} />
      )}
      {tags.length > 0 &&
        tags.map((tag) => (
          <TagItem
            tag={tag}
            key={shortid.generate()}
            updateTag={updateTag}
            removeTag={removeTag}
          />
        ))}
      <div className="box">
        <div>
          {!isImageLoaded() ? (
            <ImageUrlBox
              setFocus={focusOnUrlBox}
              onChangeUrl={handleChangeImageUrl}
              onImageTypeNotSupported={onImageTypeNotSupported}
            />
          ) : (
            <>
              <ImagePreview
                onClickOverImage={onClickOverImage}
                onImageError={handleImageError}
                imageUrl={imageUrl}
                isImageUrlNotFound={isImageUrlError}
              />
            </>
          )}
        </div>
      </div>
      <div className="actions">
        <ResetImageAction
          resetImage={resetImage}
          disabled={!isImageLoaded()}
        >
          Change image
        </ResetImageAction>
        <SaveToFileAction format="json" tags={tags} imageUrl={imageUrl}>
          Save to JSON file
        </SaveToFileAction>
      </div>
    </>
  );
};
