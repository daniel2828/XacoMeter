import React from "react";
import {
 render,
 } from "@testing-library/react";
import TabMain from "../TabMain";
import XacoProvider from "../../../providers/XacoProvider";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<TabMain />, {wrapper: XacoProvider});
  });
});