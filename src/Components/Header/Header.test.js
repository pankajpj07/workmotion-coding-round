import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("On initial render check if the page is rendered", () => {
  render(<Header />);

  screen.debug();
});
