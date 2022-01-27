import "./style.css";
import React, { useState, useEffect } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";

interface EmployeeProps {
  mode?: string;
}
const Employee = (props: EmployeeProps) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [toggle, setToggle] = useState<any[]>([]);
  const stateData = ["Added", "In-Check", "Approved", "Active", "Inactive"];

  async function fetchData() {
    const request = await axios.get(
      "https://61f16018072f86001749f198.mockapi.io/employees"
    );
    setEmployees(request.data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  const updateState = (employee: any, id: any, status: any, event: any) => {
    event.preventDefault();
    async function putData(url = "", data = {}) {
      setLoader(true);
      const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }

    putData(`https://61f16018072f86001749f198.mockapi.io/employees/${id}`, {
      ...employee,
      ...{ status: status },
    })
      .then((data) => {
        let newData = [...employees];
        let index = newData.findIndex((emp) => emp.id === data.id);
        newData[index] = data;
        setEmployees(newData);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log("ERROR::", err);
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
                                ) => updateState(employee, id, state, event)}
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
