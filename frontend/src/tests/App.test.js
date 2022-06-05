import React from "react";
import {
 render,
 } from "@testing-library/react";
import App from "../App";
import XacoProvider from "../providers/XacoProvider";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<App />, {wrapper: XacoProvider});
    
 
  });
});