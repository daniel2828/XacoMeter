import React from "react";
import {
 render,
 } from "@testing-library/react";
import AdminPage from "../AdminPage";
import XacoProvider from "../../providers/XacoProvider";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render( <BrowserRouter><AdminPage /></BrowserRouter>);
    
 
  });
});