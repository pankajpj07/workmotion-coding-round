import "./style.css";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AddEmployeeModalProps {
  show?: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const AddEmployeeModal = (props: AddEmployeeModalProps) => {
  const { show = false, handleClose = () => {} } = props;
  const [msg, setMsg] = useState<String>("");
  const [newData, setNewData] = useState<any>({});
  const { name = "", Designation = "", status = "" } = newData;

  // to handle every input change
  const handleChange = (newInputValue: object) => {
    setNewData({ ...newData, ...newInputValue });
  };

  // on submitting employee details
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { name = "", Designation = "", status = "" } = newData;

    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }

    postData("https://61f16018072f86001749f198.mockapi.io/employees", newData)
      .then((data) => {
        setNewData({});
        setMsg("Employee Added");
        setTimeout(() => setMsg(""), 2500);
        console.log(data);
      })
      .catch((err) => console.error("ERROR:", err));
  };
  return (
    <>
      <Modal show={show}>
        <Modal.Header className="m-auto" style={{ color: "#00362e" }}>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="text-center"
          >
            <Form.Group className="mb-3" controlId="formEmployeeName">
              <Form.Control
                required
                value={name}
                type="text"
                placeholder="Name Of Employee"
                onChange={(e) => handleChange({ name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDesignation">
              <Form.Control
                value={Designation}
                required
                type="text"
                placeholder="Designation"
                onChange={(e) => handleChange({ Designation: e.target.value })}
              />
            </Form.Group>
            <Form.Select
              required
              value={status}
              aria-label="Default select example"
              placeholder="Select the status"
              onChange={(e) => handleChange({ status: e.target.value })}
            >
              <option value="" disabled selected>
                Select your status
              </option>
              <option value="Added">Added</option>
              <option value="In-Check">In-Check</option>
              <option value="Approved">Approved</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
            <Button className="mt-3" type="submit">
              Add Employee
            </Button>
            <Button
              className="mt-3"
              variant="secondary"
              onClick={handleClose}
              style={{ marginLeft: "20px" }}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
        {msg && (
          <Modal.Footer style={{ margin: "auto", color: "green" }}>
            {msg}
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};
export default AddEmployeeModal;
