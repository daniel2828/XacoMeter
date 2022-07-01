import React from "react";
import {
  render,
} from "@testing-library/react";
import BarChartComp from "../BarChartComp";
import {tweetData} from "../../../mocks/tweetData";
import XacoProvider from "../../../providers/XacoProvider";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<BarChartComp />,{wrapper:XacoProvider});
    
 
  });
    test("Basic example with data", async () => {
    render(<BarChartComp tweetData={tweetData} />,{wrapper: XacoProvider});
    
 
  });
});
// Integration tests
