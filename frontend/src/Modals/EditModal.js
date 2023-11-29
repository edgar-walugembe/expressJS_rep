import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { formatDateWithoutTime } from "../utils";
import PropTypes from "prop-types";

export const EditDeveloperModal = ({
  saveDev,
  devRef,
  validated,
  closeEditDevDialog,
  show,
  fetchDev,
  handleClose,
  editDev,
}) => {
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editDob, setEditDob] = useState("");

  useEffect(() => {
    if (editDev) {
      setEditFirstName(editDev.firstName || "");
      setEditLastName(editDev.lastName || "");
      setEditEmail(editDev.email || "");
      setEditGender(editDev.gender || "");
      setEditDob(
        editDev.dateOfBirth ? formatDateWithoutTime(editDev.dateOfBirth) : ""
      );
    }
  }, [editDev]);

  const submitForm = async (event) => {
    console.log("Submit form called");
    event.preventDefault();
    devRef.current.requestSubmit();
    saveDev();
    fetchDev();
  };

  EditDeveloperModal.propTypes = {
    fetchDev: PropTypes.func.isRequired,
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editDev ? "Edit Developer" : "Add New Developer"}
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
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  First name is required.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2" controlId="lastName">
                <Form.Label>LastName</Form.Label>
                <Form.Control
                  required={true}
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
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
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
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
                  value={editGender}
                  onChange={(e) => setEditGender(e.target.value)}
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
                <Form.Control
                  name="dob"
                  type="date"
                  placeholder="31/12/2000"
                  value={editDob}
                  onChange={(e) => setEditDob(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="primary" onClick={closeEditDevDialog}>
          Cancel
        </Button>
        <Button
          onClick={(event) => submitForm(event)}
          size="sm"
          variant="success"
          type="Button"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
