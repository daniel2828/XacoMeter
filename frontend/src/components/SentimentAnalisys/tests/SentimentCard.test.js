import React from "react";
import {
 render,
 } from "@testing-library/react";
import SentimentCard from "../SentimentCard";
import XacoProvider from "../../../providers/XacoProvider";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<SentimentCard />, {wrapper: XacoProvider});
    
 
  });
});