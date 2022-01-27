import { render, screen } from "@testing-library/react";
import Banner from "./Banner";

test("On initial render check if the page is rendered", () => {
  render(<Banner />);

  screen.getByRole("button", { name: /Add Employee/i, hidden: true });
  expect(screen.getByText("Employees Managment System")).toBeInTheDocument();
  screen.debug();
});
