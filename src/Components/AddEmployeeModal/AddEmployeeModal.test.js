import { render, screen } from "@testing-library/react";
import AddEmployeeModal from "./AddEmployeeModal";

test("On initial render check if the page is rendered", () => {
  render(
    <AddEmployeeModal show={true} handleClose={() => console.log("running")} />
  );
  screen.getByRole("button", { name: /Add Employee/i });
  screen.getByRole("button", { name: /close/i });
  expect(screen.getByText("Add New Employee")).toBeInTheDocument();

  screen.debug();
});
