/*import * as React from "react";
import { shallow, mount, render, configure } from "enzyme";

import { ImagePreview } from "./image-preview";
import "@testing-library/jest-dom";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("Animal", () => {
  it("should image src tbe this injected as a props", () => {
    const IMAGE_URL =
      "https://static.hitek.fr/img/actualite/ill_m/944555337/illuspiderman3.jpg";
    const wrapper = render(
      <ImagePreview
        imageUrl={IMAGE_URL}
        onClickOverImage={jest.fn()}
        onImageError={jest.fn()}
      />
    );
    
    //const img = wrapper.find("img");
    expect(wrapper).toBeVisible()
  });
});
*/
import React from "react";
import { shallow, mount, render, configure } from "enzyme";
//import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

//configure({ adapter: new Adapter() });

import { ImagePreview } from "./image-preview";

describe("Hello, Enzyme!", () => {
  it("renders", () => {
    
    const IMAGE_URL =
      "https://static.hitek.fr/img/actualite/ill_m/944555337/illuspiderman3_.jpg";
    const wrapper = render(
      <ImagePreview
        imageUrl={IMAGE_URL}
        onClickOverImage={jest.fn()}
        onImageError={() => console.log('diantre')}
      />
    );
  
    expect(wrapper.find('img').attr('data-testid')).toEqual('image-not-found')
  });
});
