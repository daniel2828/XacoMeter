import React from "react";
import {

  render,


} from "@testing-library/react";
import PieChartComp from "../PieChartComp";

import XacoProvider from "../../../providers/XacoProvider";
import {tweetData} from "../../../mocks/tweetData";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<PieChartComp />, {wrapper: XacoProvider});
    
 
  });
  test("Basic example with data", async () => {
    render(<PieChartComp tweetData={tweetData}/>, {wrapper: XacoProvider});
    
 
  });
});
// Integration tests
