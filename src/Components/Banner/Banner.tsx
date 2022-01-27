import "./style.css";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddEmployeeModal from "../AddEmployeeModal/AddEmployeeModal";

export interface BannerProps {}
const Banner = (props: BannerProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container>
        <Row>
          <Col style={{ marginTop: "80px", textAlign: "left" }}>
            <div className="left-Banner">
              <div className="wm-title">
                <h1>Employees Managment System</h1>
              </div>
              <div className="wm-description">
                <p>
                  We’ve streamlined international hiring, onboarding and human
                  resource management across 160+ countries. No local presence
                  needed. No surprises.
                </p>
              </div>
              <div className="d-flex">
                <button className="btn-prime" onClick={handleShow}>
                  Add Employee
                </button>
              </div>
            </div>
          </Col>
          <Col style={{ marginTop: "80px" }}>
            <div className="right-Banner">
              <img
                src="https://workmotion.com/wp-content/uploads/2021/12/advice-image.png"
                alt=""
                style={{ width: "100%" }}
              />
            </div>
          </Col>
        </Row>
        <AddEmployeeModal show={show} handleClose={() => handleClose()} />
      </Container>
    </>
  );
};

export default Banner;
