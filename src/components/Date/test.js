import React from "react";
import Date from "../Date";

import renderer from "react-test-renderer";

describe("<Date>", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<Date />).toJSON();
    expect(rendered).toBeTruthy();
  });
});
