import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,

} from "@testing-library/react";
import TabAdmin from "./TabAdmin";
import XacoProvider from "../../providers/XacoProvider";
describe("Basic tests for component", () => {
    test("Basic example", async () => {
      render(<TabAdmin />,{wrapper: XacoProvider});
      //await act(async()=>await render(<Hashtags/>));
    
     
    })

})