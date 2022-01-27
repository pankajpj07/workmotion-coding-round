import "./style.css";
import React, { useState, useEffect } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { fetchData, updateEmpState } from "../../api/apiEndpoints";

interface EmployeeProps {
  mode?: string;
}
const Employee = (props: EmployeeProps) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [toggle, setToggle] = useState<any[]>([]);
  const stateData = ["Added", "In-Check", "Approved", "Active", "Inactive"];

  useEffect(() => {
    fetchData().then((response) => setEmployees(response.data));
  }, []);

  const updateState = (id: any, status: any, event: any) => {
    event.preventDefault();
    setLoader(true);
    updateEmpState(id, status).then((response) => {
      let newData = [...employees];
      let index = newData.findIndex((emp) => emp.id === response.data.id);
      newData[index] = response.data;
      setEmployees(newData);
      setLoader(false);
    });
  };

  const activeState = (index: number, status: string) => {
    if (index <= stateData.indexOf(status)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Container>
        <div className="employees-section">
          {employees.map((employee, index) => {
            const {
              id = 0,
              name = "",
              Designation = "",
              status = "",
            } = employee;
            return (
              <div className="employee-details" key={index}>
                <div className="employee-data">
                  <Card
                    style={{
                      border: "1px solid #00362e",
                      borderRadius: "20px",
                    }}
                  >
                    <Card.Header
                      style={{
                        width: "100%",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    >
                      Employee-{id}
                    </Card.Header>
                    <Card.Body style={{ width: "100%" }}>
                      <Card.Title>{name}</Card.Title>
                      <Card.Text>Designation - {Designation}</Card.Text>
                      <Button
                        variant="outline-success"
                        onClick={() =>
                          setToggle((prevState) => {
                            if (prevState.includes(id)) {
                              return prevState.filter((ele) => ele !== id);
                            } else {
                              return [...prevState, id];
                            }
                          })
                        }
                      >
                        {!toggle.includes(id) ? "Check Status" : "Hide Status"}
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
                {toggle.includes(id) ? (
                  <div className="employee-status">
                    <ul className="breadcrumb">
                      {loader ? (
                        <Spinner animation="grow" variant="success" />
                      ) : (
                        stateData.map((state, index) => {
                          return (
                            <li key={index}>
                              <a
                                className={
                                  activeState(index, status)
                                    ? "activeState"
                                    : "inActiveState"
                                }
                                onClick={(
                                  event: React.MouseEvent<HTMLElement>
                                ) => updateState(id, state, event)}
                              >
                                {state}
                              </a>
                            </li>
                          );
                        })
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Employee;
