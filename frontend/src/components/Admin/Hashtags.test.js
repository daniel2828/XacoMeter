import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,

} from "@testing-library/react";
import Hashtags from "./Hashtags";
import XacoProvider from "../../providers/XacoProvider";

// Unit tests
describe("Basic tests for component", () => {
  test("Basic example", async () => {
    render(<Hashtags />, {wrapper: XacoProvider});
    //await act(async()=>await render(<Hashtags/>));
    expect(screen.getByText("Add")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Daniel")).toBeInTheDocument());
  });
});
// Integration tests
describe("Integration tests for component", () => {
  test("The button Delete is clicked and the pop up appears", async () => {
    await waitFor(() => render(<Hashtags />, {wrapper: XacoProvider}));

    await waitFor(async () => {
      const buttonDelete = screen.getByTestId("DanielDelete");

      fireEvent.click(buttonDelete);
    });

 
  });
  test("The button Update is clicked and the pop up appears", async()=>{

    await waitFor(() => render(<Hashtags />, {wrapper: XacoProvider}));

    await waitFor(async () => {
      const buttonUpdate = screen.getByTestId("DanielUpdate");

      fireEvent.click(buttonUpdate);
    });

  })
});
