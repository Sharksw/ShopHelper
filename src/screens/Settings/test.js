import React from "react";
import Settings from "./Settings";

import renderer from "react-test-renderer";

describe("<Settings>", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<Settings />).toJSON();
    expect(rendered).toBeTruthy();
  });
});
