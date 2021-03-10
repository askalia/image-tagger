import { FC, useRef } from "react";
import { MdLocalOffer } from "react-icons/md";
import shortid from "shortid";
import { Card, CardBody } from "reactstrap";
import { TagCoordinates } from "../../shared/models/tag-coordinates.model";
import { Tag } from "../../shared/models/tag.model";

import "./tag-factory.scss";

export interface ITagFactoryProps {
  coordinates: TagCoordinates;
  addTag: (newTag: Tag) => void;
}

export const TagFactory: FC<ITagFactoryProps> = ({ coordinates, addTag }) => {
  let tagCard = useRef<any>(null);

  const validateTag = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      addTag({
        id: shortid.generate(),
        X: tagCard?.current?.offsetLeft,
        Y: tagCard?.current?.offsetTop,
        widthPx: tagCard?.current?.screenWidth,
        heightPx: tagCard?.current?.screenHeight,
        description: (event.target as HTMLInputElement).value,
      });
    }
  };

  return (
    <>
      <div>
        <Card
          innerRef={tagCard}
          style={{
            top: coordinates.Y + "px",
            left: coordinates.X + "px",
          }}
        >
          <CardBody>
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
