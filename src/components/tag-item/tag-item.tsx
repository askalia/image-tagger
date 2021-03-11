import { ChangeEvent, FC, useRef, useState } from "react";
import { MdClear, MdLocalOffer } from "react-icons/md";
import { Button, Card, CardBody } from "reactstrap";
import { Tag } from "../../shared/models/tag.model";

import "./tag-item.scss";

export interface ITagItemProps {
  tag: Tag;
  updateTag: (tagId: Tag["id"], tag: Partial<Tag>) => void;
  removeTag: (tagId: Tag["id"]) => void;
}

export const TagItem: FC<ITagItemProps> = ({ tag, updateTag, removeTag }) => {
  const tagRef = useRef<any>(null);

  const [description, setDescription] = useState<string>(
    tag?.description || ""
  );
  const [editMode, setEditMode] = useState<boolean>(false);

  const validateTagForUpdate = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      setEditMode(false);
      updateTag(tag.id, {
        description,
        widthPx: tagRef?.current?.screenWidth,
        heightPx: tagRef?.current?.screenHeight,
      });
    }
  };

  return (
    <>
      <div>
        <Card
          innerRef={tagRef}
          style={{
            top: tag?.Y + "px",
            left: tag?.X + "px",
            width: tag?.widthPx,
            height: tag?.heightPx,
          }}
        >
          <CardBody>
            <Button
              className="remove-tag btn-icon btn-2"
              color="danger"
              type="button"
              onClick={() => removeTag(tag?.id)}
            >
              <MdClear />
            </Button>
            <div className="input-group-merge input-group tag-legend">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <MdLocalOffer />
                </span>
              </div>

              <input
                value={description}
                readOnly={!editMode}
                type="text"
                className="form-control"
                onClick={() => setEditMode(true)}
                onChange={(event: ChangeEvent) =>
                  setDescription((event.target as HTMLInputElement).value)
                }
                onKeyPress={(event: unknown) =>
                  validateTagForUpdate(event as KeyboardEvent)
                }
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
