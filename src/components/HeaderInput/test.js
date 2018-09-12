import React from "react";

import HeaderInput from "../HeaderInput";

import renderer from "react-test-renderer";

describe("<HeaderInput>", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<HeaderInput />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
})

