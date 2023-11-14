import React from "react";
import "./App.css";
import {
  Container,
  Table,
  Button,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const App = () => {
  const [devs, setDevs] = useState([]);

  //Create dev Modal
  const [visible, setVisible] = useState(false);
  const [validated, setValidated] = useState(false);
  const devRef = useRef();

  const saveDev = async (event) => {
    event.preventDefault();
    const form = devRef.current;
  };

  //delete Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchDev();
  }, []);

  const url = "http://localhost:5000/dev";

  const fetchDev = async () => {
    const res = await axios.get(url);

    if (res) {
      setDevs(res.data.devs);
    }
  };

  const deleteDev = (devToDelete) => {
    let confirm = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirm) {
      const updatedDevs = devs.filter((dev) => dev.id !== devToDelete.id);
      setDevs(updatedDevs);

      confirm = window.confirm("dev deleted successfully");
    }
  };
  const openAddStudentDialog = () => {
    setVisible(true);
  };

  // const closeAddStudentDialog = () => {
  //   setVisible(false);
  // };

  const submitForm = () => {
    devRef.current.requestSubmit();
  };

  return (
    <div className="App">
      <Container>
        <h1 style={{ fontWeight: "bold", fontStyle: "italic" }}>Quotes''</h1>
        <Row>
          <Col md={12} xs={12} sm={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>E-mail</th>
                  <th>Gender</th>
                  <th>D.O.B</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {devs?.map((dev, i) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{dev.firstName}</td>
                      <td>{dev.lastName}</td>
                      <td>{dev.email}</td>
                      <td>{dev.gender}</td>
                      <td>{dev.dateOfBirth}</td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => deleteDev(dev)}
                          >
                            Delete
                          </Button>
                          <Button size="sm" variant="warning">
                            Edit
                          </Button>
                          {/* <Button
                            size="sm"
                            variant="danger"
                            onClick={handleShow}
                          >
                            Delete Developer
                          </Button> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col md={12} xs={12} sm={12}>
            <div className="addButton">
              <Button variant="info" onClick={openAddStudentDialog}>
                Add New Developer
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* create new developer */}
      <Modal
        show={visible}
        onHide={() => setVisible(false)}
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
                  <Form.Control
                    name="dob"
                    type="date"
                    placeholder="12/12/2003"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setVisible(false)}>
            Cancel
          </Button>
          <Button onClick={() => submitForm()} variant="success" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* delete exiting developer */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Developer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this Developer ???
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button size="sm" variant="primary">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
