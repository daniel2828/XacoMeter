import React from "react";
import {
 render,
 screen,
 fireEvent
 } from "@testing-library/react";
import RegisterForm from "../RegisterForm";
import XacoProvider from "../../providers/XacoProvider";
// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<RegisterForm />, {wrapper: XacoProvider});
    const ButtonSubmit = screen.getByRole("button", {name:"Sign Up"});
    fireEvent.click(ButtonSubmit);
  });
});