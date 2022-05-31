import React from "react";
import {
 render,
 } from "@testing-library/react";
import Notification from "../Notification";
import XacoProvider from "../../providers/XacoProvider";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<Notification />, {wrapper: XacoProvider});
    
 
  });
});