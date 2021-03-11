import { FC, useRef } from "react";
import { MdDeleteForever, MdLocalOffer } from "react-icons/md";
import shortid from "shortid";
import { Button, Card, CardBody } from "reactstrap";
import { TagCoordinates } from "../../shared/models/tag-coordinates.model";
import { Tag } from "../../shared/models/tag.model";

import "./tag-factory.scss";

export interface ITagFactoryProps {
  coordinates: TagCoordinates;
  addTag: (newTag: Tag) => void;
  onRemove: () => void;
}

export const TagFactory: FC<ITagFactoryProps> = ({
  coordinates,
  addTag,
  onRemove,
}) => {
  let tagCard = useRef<any>(null);

  const validateTag = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      addTag({
        id: shortid.generate(),
        X: tagCard?.current?.offsetLeft,
        Y: tagCard?.current?.offsetTop,
        widthPx: tagCard?.current?.clientWidth + 4,
        heightPx: tagCard?.current?.clientHeight + 4,
        description: (event.target as HTMLInputElement).value,
      });
    }
  };

  return (
    <>
      <div>
        <Card
          className="tag-factory"
          innerRef={tagCard}
          style={{
            top: coordinates.Y + "px",
            left: coordinates.X + "px",
          }}
        >
          <CardBody>
            <Button
              className="remove-tag btn-icon btn-2"
              color="danger"
              type="button"
              onClick={() => onRemove()}
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
                placeholder="Legend"
                type="text"
                className="form-control"
                onKeyPress={(event: unknown) =>
                  validateTag(event as KeyboardEvent)
                }
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
