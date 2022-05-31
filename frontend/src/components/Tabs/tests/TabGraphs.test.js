import React from "react";
import {
 render,
 } from "@testing-library/react";
import TabGraphs from "../TabGraphs";
import XacoProvider from "../../../providers/XacoProvider";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<TabGraphs />, {wrapper: XacoProvider});
  });
});