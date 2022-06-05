import React from "react";
import {

  render,


} from "@testing-library/react";
import LineChartComp from "../LineChartComp";
import XacoProvider from "../../../providers/XacoProvider";
import {tweetData} from "../../../mocks/tweetData";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<LineChartComp />, {wrapper: XacoProvider});
    
 
  });
  test("Basic example with data", async () => {
    render(<LineChartComp  tweetData={tweetData}/>, {wrapper: XacoProvider});
    
 
  });
});
// Integration tests
