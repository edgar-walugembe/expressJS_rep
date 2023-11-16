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
  const [editDev, setEditDev] = useState(null);

  useEffect(() => {
    fetchDev();
  }, []);

  const getUrl = "http://localhost:5000/dev";
  const createUrl = "http://localhost:5000/dev/create-dev";
  const editUrl = "http://localhost:5000/dev/edit-dev";
  const deleteUrl = "http://localhost:5000/dev/delete-dev";

  const fetchDev = async () => {
    const res = await axios.get(getUrl);

    if (res) {
      setDevs(res.data.devs);
    }
  };

  //Create developer Modal
  const [visible, setVisible] = useState(false);
  const [validated, setValidated] = useState(false);
  const devRef = useRef(null);

  const submitForm = async (event) => {
    event.preventDefault();
    devRef.current.requestSubmit();
    saveDev();
    fetchDev();
  };

  const saveDev = async (event) => {
    const form = devRef.current;

    if (form.checkValidity() === true) {
      const newDev = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        gender: form.gender.value,
      };

      try {
        let res;

        if (editDev) {
          res = await axios.patch(editUrl, newDev);
        } else {
          res = await axios.post(createUrl, newDev);
        }

        if (res.data.success) {
          setDevs((prevDevs) =>
            prevDevs.map((dev) =>
              dev.id === editDev?.id ? { ...dev, ...newDev } : dev
            )
          );

          // setVisible(false);
          // form.reset();
          // setValidated(false);

          closeCreateDevDialog();
          form.reset();
          setValidated(false);

          setDevs((prevDevs) => [...prevDevs, newDev]);
          localStorage.setItem("devs", JSON.stringify([...devs, newDev]));
        } else {
          console.error("Failed to add Dev to express_db.");
        }
      } catch (error) {
        console.error("Error adding Dev to express_db:", error);
      }
    } else {
      setValidated(true);
    }
  };

  //editDeveloper Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteDev = (devToDelete) => {
    let confirm = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirm) {
      const updatedDevs = devs.filter((dev) => dev.id !== devToDelete.id);
      setDevs(updatedDevs);

      // confirm = window.confirm("dev deleted successfully");
    }
  };

  //open && close CreateDev Dialog.
  const openCreateDevDialog = () => {
    setVisible(true);
    setEditDev(null);
  };

  const closeCreateDevDialog = () => {
    setVisible(false);
  };

  // open & close EditDev Dialog.
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editDob, setEditDob] = useState("");

  const openEditDevDialog = (dev) => {
    console.log("Open Edit Developer Dialog called");
    console.log(dev);

    if (!dev) {
      console.error("Dev object is undefined");
      return;
    }
    setEditDev(dev);
    setShow(true);

    console.log("Setting values to form fields:", dev);

    setEditFirstName(dev.firstName || "");
    setEditLastName(dev.lastName || "");
    setEditEmail(dev.email || "");
    setEditGender(dev.gender || "");
    setEditDob(dev.dateOfBirth || "");

    setValidated(false);
  };
  const closeEditDevDialog = () => {
    setShow(false);
    setEditDev(null);
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
                    <tr key={dev.id}>
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
                            variant="warning"
                            onClick={() => openEditDevDialog(dev)}
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => deleteDev(dev)}
                          >
                            Delete
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
            <div className="addButton mb-2">
              <Button variant="info" onClick={openCreateDevDialog}>
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
                    placeholder="31/12/2000"
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

          <Button
            onClick={(event) => submitForm(event)}
            variant="success"
            type="Button"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* edit developer */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
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
    </div>
  );
};

export default App;
