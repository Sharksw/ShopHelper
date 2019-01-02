import React from "react";
import { TextInput } from "react-native";

import AddPurchase from "../AddPurchase";

import renderer from "react-test-renderer";

describe("<AddPurchase>", () => {
  const rendered = renderer.create(<AddPurchase />);
  it("renders without crashing", () => {
    const renderedSnapshot = rendered.toJSON();
    expect(renderedSnapshot).toMatchSnapshot();
  });

  it("should renders state price and quantity", () => {
    const price = 3;
    const quantity = 4;
    const inputs = rendered.root.findAllByType(TextInput);

    expect(inputs.every(input => input.props.value === "")).toBe(true);

    const testMessage1 = "Test";
    const testMessage2 = "Test2";
    const [quantityInput, priceInput] = inputs;

    quantityInput.props.onChangeText(testMessage1);
    priceInput.props.onChangeText(testMessage2);

    expect(quantityInput.props.value).toBe(testMessage1);
    expect(quantityInput.props.value).not.toBe(testMessage2);

    expect(priceInput.props.value).not.toBe(testMessage1);
    expect(priceInput.props.value).toBe(testMessage2);

    const { state: stateAfterChange } = rendered.root.instance;
    expect(stateAfterChange.quantity).toBe(testMessage1);
    expect(stateAfterChange.price).toBe(testMessage2);
  });
});
