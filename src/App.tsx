import React from "react";
import "./App.css";
import { ImageHolder } from "./components/image-holder/image-holder";

function App() {

  function exportToCsvFile() {
    let csvStr = "blabla";
    let dataUri = 'data:text/csv;charset=utf-8,'+ csvStr;

    let exportFileDefaultName = 'data.csv';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
exportToCsvFile();
  return (
    <div className="App">
      <div className="App-header">
        <ImageHolder />
      </div>
    </div>
  );
}

export default App;
