import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";

import Date from "../Date";


describe("<Date>", () => {
  const props = {
    currDate: 1546439823737
  }

  const rendered = renderer.create(<Date {...props} />).toJSON();
  it("renders without crashing", () => {
    expect(rendered).toMatchSnapshot();
  });

  it("text should render current time", () => {
    const text = rendered.root.findByType(Text);
    expect(text.toBe(props.currDate));
  })
});
