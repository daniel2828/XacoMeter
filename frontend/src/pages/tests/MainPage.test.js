import React from "react";
import {
 render,
 waitFor
 } from "@testing-library/react";
import MainPage from "../MainPage";
import { BrowserRouter } from "react-router-dom";
import { getAccessTokenApi } from "../../api/auth";
import XacoProvider from "../../providers/XacoProvider";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example",  () => {
    //localStorage.setItem("ACCESS_TOKEN", "efsef2324f223f23fg23r2f234f");

    render(<BrowserRouter><MainPage /></BrowserRouter>,{wrapper: XacoProvider});
    
 
  });
});