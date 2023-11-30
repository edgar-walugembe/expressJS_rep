import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import React from "react";
import { formatDateWithoutTime } from "../utils";

export const CreateDeveloperModal = ({
  visible,
  validated,
  saveDev,
  devRef,
  closeCreateDevDialog,
  fetchDev,
}) => {
  const submitForm = async (event) => {
    debugger;
    console.log("Submit form called");
    event.preventDefault();
    devRef.current.requestSubmit();
    fetchDev();
  };

  return (
    <Modal
      show={visible}
      onHide={closeCreateDevDialog}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={false}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Developer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          ref={devRef}
          onSubmit={saveDev}
          autoComplete="true"
        >
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-2 flex" controlId="firstName">
                <Form.Label>FirstName</Form.Label>
                <Form.Control
                  required={true}
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                />
                <Form.Control.Feedback type="invalid">
                  First name is required.
                </Form.Control.Feedback>
              </Form.Group>
              {/* <Col xs={12} md={6}></Col> */}
              <Form.Group className="mb-2" controlId="lastName">
                <Form.Label>LastName</Form.Label>
                <Form.Control
                  required={true}
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  required={true}
                  aria-label="Select Gender"
                >
                  <option>Open this select menu</option>
                  <option value="Male">MALE</option>
                  <option value="Female">FEMALE</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group className="mb-2" controlId="dob">
                <Form.Label>Date of birth</Form.Label>
                <Form.Control name="dob" type="date" placeholder="" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={closeCreateDevDialog}>
          Cancel
        </Button>

        <Button
          onClick={(event) => submitForm(event)}
          variant="success"
          type="Button"
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
