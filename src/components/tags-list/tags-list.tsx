import { FC } from "react";
import shortid from "shortid";
import { Tag } from "../../shared/models/tag.model";
import { TagItem } from "../tag-item/tag-item";

interface ITagsListProps {
  tags: Tag[];
  updateTag: (tagId: Tag["id"], tagUpdated: Partial<Tag>) => void;
  removeTag: (tagId: Tag["id"]) => void;
}

export const TagsList: FC<ITagsListProps> = ({
  tags,
  updateTag,
  removeTag,
}) => (
  <>
    {(tags || []).map((tag) => (
      <TagItem
        tag={tag}
        key={shortid.generate()}
        updateTag={updateTag}
        removeTag={removeTag}
      />
    ))}
  </>
);
