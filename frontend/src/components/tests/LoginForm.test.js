import React from "react";
import {
 render,
 screen,
 fireEvent
 } from "@testing-library/react";
import LoginForm from "../LoginForm";
import XacoProvider from "../../providers/XacoProvider";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<LoginForm />, {wrapper: XacoProvider});
    
 
  });
});
// Integration testss
describe("Integration tests for components", () => {
    test("Basic example", async () => {
      render(<LoginForm />, {wrapper: XacoProvider});
      expect(screen.getByText("Sign In")).toBeInTheDocument();
      const buttonSubmit = await screen.getByTestId("submit");
      fireEvent.click(buttonSubmit);

   
    });
  });