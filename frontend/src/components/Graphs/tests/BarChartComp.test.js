import React from "react";
import {
  render,
} from "@testing-library/react";
import BarChartComp from "../BarChartComp";
import {tweetData} from "../../../mocks/tweetData";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<BarChartComp />);
    
 
  });
    test("Basic example with data", async () => {
    render(<BarChartComp tweetData={tweetData} />);
    
 
  });
});
// Integration tests
