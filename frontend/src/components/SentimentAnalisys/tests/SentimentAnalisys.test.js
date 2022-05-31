import React from "react";
import {
 render,
 } from "@testing-library/react";
import SentimentAnalisys from "../SentimentAnalisys";
import XacoProvider from "../../../providers/XacoProvider";
// Unit tests
import {tweetData} from "../../../mocks/tweetData";
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<SentimentAnalisys  dataWithSentiment={tweetData}/>, {wrapper: XacoProvider});
    
 
  });
});