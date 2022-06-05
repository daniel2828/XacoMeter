import React from "react";
import {
 render,
 } from "@testing-library/react";
import NavBar from "../NavBar";
import XacoProvider from "../../../providers/XacoProvider";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<NavBar />, {wrapper: XacoProvider});
    
 
  });
});