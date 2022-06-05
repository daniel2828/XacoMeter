import React from "react";
import {
 render,
 } from "@testing-library/react";
import SentimentModal from "../SentimentModal";
import XacoProvider from "../../../providers/XacoProvider";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<SentimentModal />, {wrapper: XacoProvider});
  });
});