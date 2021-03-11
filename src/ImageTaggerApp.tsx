import React from "react";
import "./ImageTaggerApp.css";
import { ImageHolder } from "./containers/image-holder/image-holder";

function ImageTaggerApp() {
  return (
    <div className="App">
      <div className="App-header">
        <ImageHolder />
      </div>
    </div>
  );
}

export default ImageTaggerApp;
