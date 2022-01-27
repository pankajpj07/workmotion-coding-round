import { render, screen } from "@testing-library/react";
import Employee from "./Employee";

test("On initial render check if the page is rendered", () => {
  render(<Employee />);

  screen.debug();
});
