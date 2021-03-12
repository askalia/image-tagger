import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { MdDeleteForever, MdLocalOffer } from "react-icons/md";
import { Button, Card, CardBody } from "reactstrap";
import shortid from "shortid";
import { TagCoordinates } from "../../shared/models/tag-coordinates.model";
import { Tag } from "../../shared/models/tag.model";

import "./tag-item.scss";

export interface ITagItemProps {
  tag?: Tag;
  coordinates?: TagCoordinates;
  updateTag: (tagId: Tag["id"], tag: Partial<Tag>) => void;
  removeTag: (tagId: Tag["id"]) => void;
  addTag?: (newTag: Tag) => void;
  removeFactory?: () => void;
}

export const TagItem: FC<ITagItemProps> = ({
  tag,
  updateTag,
  removeTag,
  addTag,
  coordinates,
  removeFactory,
}) => {
  const tagRef = useRef<any>(null);

  const [description, setDescription] = useState<string>(
    tag?.description || ""
  );
  const [editMode, setEditMode] = useState<boolean>(false);

  const upsertTag = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      shortid.isValid(tag?.id)
        ? validateTagForUpdate()
        : validateTagForCreation(event);
    }
  };

  const isFactory = (): boolean => shortid.isValid(tag?.id) === false;

  const validateTagForUpdate = () => {
    setEditMode(false);
    tag?.id &&
      updateTag(tag?.id, {
        description,
        widthPx: tagRef?.current?.clientWidth + 4,
        heightPx: tagRef?.current?.clientHeight + 4,
      });
  };

  const validateTagForCreation = (event: KeyboardEvent) => {
    addTag?.({
      id: shortid.generate(),
      X: tagRef?.current?.offsetLeft,
      Y: tagRef?.current?.offsetTop,
      widthPx: tagRef?.current?.clientWidth + 4,
      heightPx: tagRef?.current?.clientHeight + 4,
      description: (event.target as HTMLInputElement).value,
    });
  };

  useEffect(() => {
    initResizeListener();
  });

  const initResizeListener = () => {
    let lock = false;
    const resizableElement = tagRef.current;
    resizableElement.addEventListener("resize", (event: any) => {
      if (lock === false) {
        lock = true;
        if (
          tagRef.current.clientWidth === 0 ||
          tagRef.current.clientHeight === 0
        ) {
          return;
        }
        setTimeout(() => {
          updateTag(tag?.id, {
            widthPx: tagRef.current.clientWidth,
            heightPx: tagRef.current.clientHeight,
          });
          lock = false;
        }, 500);
      }
    });
    function checkResize(mutations: any) {
      const el = mutations[0].target;
      const w = el.clientWidth;
      const h = el.clientHeight;

      const isChange = mutations
        .map((m: any) => `${m.oldValue}`)
        .some(
          (prev: any) =>
            prev.indexOf(`width: ${w}px`) === -1 ||
            prev.indexOf(`height: ${h}px`) === -1
        );

      if (!isChange) {
        return;
      }
      const event = new CustomEvent("resize", {
        detail: { width: w, height: h },
      });
      el.dispatchEvent(event);
    }
    const observer = new MutationObserver(checkResize);
    observer.observe(resizableElement, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["style"],
    });
  };

  return (
    <>
      <div>
        <Card
          innerRef={tagRef}
          style={{
            top: (isFactory() ? coordinates?.Y : tag?.Y) + "px",
            left: (isFactory() ? coordinates?.X : tag?.X) + "px",
            width: tag?.widthPx,
            height: tag?.heightPx,
          }}
          className={isFactory() ? "tag-factory" : ""}
        >
          <CardBody>
            <Button
              className="remove-tag btn-icon btn-2"
              color="danger"
              type="button"
              onClick={() =>
                !isFactory() ? removeTag(tag?.id) : removeFactory?.()
              }
            >
              <MdDeleteForever />
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
                  upsertTag(event as KeyboardEvent)
                }
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
