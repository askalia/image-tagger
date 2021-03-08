import { FC } from "react";

import "./tag-factory.scss";

interface ITagFactoryProps {}

export const TagFactory: FC<ITagFactoryProps> = () => (
  <div className="cards">
    <div className="card">
      <div className="content">
        <p>This card doesn't have much content.</p>
      </div>
      <footer>Card footer</footer>
    </div>
    <div className="card">
      <div className="content">
        <p>
          This card has a lot more content which means that it defines the
          height of the container the cards are in. I've laid the cards out
          using grid layout, so the cards themselves will stretch to the same
          height.
        </p>
      </div>
      <footer>Card footer</footer>
    </div>
  </div>
);
