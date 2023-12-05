import React from "react";
import "./App.css";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import axios from "./axiosConfig";
import {
  formatDateWithoutTime,
  baseUrl,
  getUrl,
  createUrl,
  editUrl,
  deleteUrl,
  uploadUrl,
} from "./utils";
import {
  CreateDeveloperModal,
  EditDeveloperModal,
  DeleteDeveloperModal,
  LoginDeveloperModal,
  SignUpDeveloperModal,
} from "./Modals";

const App = () => {
  const [devs, setDevs] = useState([]);
  const [editDev, setEditDev] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
  });
  const [deletedDev, setDeletedDev] = useState(null);
  const [loginDev, setLoginDev] = useState(null);
  const [signupDev, setSignupDev] = useState(null);

  useEffect(() => {
    fetchDev();
  }, []);

  const fetchDev = async () => {
    try {
      const {
        data: { devs },
      } = await axios.get(getUrl);

      if (devs) {
        setDevs(devs);
      }
    } catch (error) {}
  };

  const updateEditDev = (newValues) => {
    setEditDev((prevEditDev) => ({ ...prevEditDev, ...newValues }));
  };

  //Create developer Modal
  const [visible, setVisible] = useState(false);
  const [validated, setValidated] = useState(false);
  const devRef = useRef(null);

  const saveDev = async () => {
    const form = devRef.current;

    if (form && form.checkValidity() === true) {
      const newDev = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        gender: form.gender.value,
        dateOfBirth: formatDateWithoutTime(form.dob.value),
      };

      let res;

      if (editDev && editDev.id) {
        const updatedDev = { ...editDev, ...newDev };
        res = await axios.patch(`${editUrl}?id=${editDev.id}`, updatedDev);
      } else {
        res = await axios.post(createUrl, newDev);
      }
      form.reset();
      setValidated(false);

      try {
        if (res.status === 202 || res.status === 201) {
          updateEditDev(newDev);
          closeCreateDevDialog();
          setEditDev(null);
        } else {
          setValidated(true);
          console.error("Failed to add/edit developer:", res.data.message);
        }
      } catch (error) {
        console.error("Error adding Dev to express_db:", error.message);
        console.error("Error details:", error);
        throw error;
      }
    } else {
      setValidated(true);
    }
  };

  //editDeveloper Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //open && close CreateDev Dialog.
  const openCreateDevDialog = () => {
    setVisible(true);
    setEditDev(null);
  };

  const closeCreateDevDialog = () => {
    setVisible(false);
  };

  // open & close EditDev Dialog.
  const openEditDevDialog = (dev) => {
    if (!dev) {
      console.error("Dev object is undefined");
      return;
    }
    setEditDev(dev);
    handleShow();

    setValidated(false);
  };

  const closeEditDevDialog = () => {
    handleClose();
    setEditDev(null);
  };

  //deleteDeveloper Modal
  const [deleteModal, setDeleteModal] = useState(false);

  //open & close DeleteDev Dialog.
  const openDeleteDevDialog = (dev) => {
    setDeletedDev(dev);
    setDeleteModal(true);
  };

  const closeDeleteDevDialog = () => {
    setDeleteModal(false);
    setDeletedDev(null);
  };

  const deleteDev = async () => {
    if (deletedDev) {
      console.log("attempting to delete developer:", deletedDev);

      const res = await axios.delete(`${deleteUrl}?id=${deletedDev.id}`);

      try {
        if (res.status === 202) {
          setDevs((prevDevs) =>
            prevDevs.filter((dev) => dev.id !== deletedDev.id)
          );
        } else {
          console.error(
            "Failed to delete developer from express_db:",
            res.data.message
          );
        }
      } catch (error) {
        if (error.response) {
          console.error(
            "Error deleting developer from express_db:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
    }

    closeDeleteDevDialog();
  };

  //UploadDevFiles
  const uploadRef = useRef(null);

  const submitDevFiles = async (event) => {
    event.preventDefault();

    try {
      const uploadData = new FormData(uploadRef.current);

      const res = await axios.post(uploadUrl, uploadData);

      if (res.status === 200) {
        console.log("devFile uploaded successfully");

        uploadRef.current.reset();
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  //loginDeveloper Modal
  const [loginModal, setLoginModal] = useState(false);

  //open & close LoginDev Dialog.
  const openLoginDevDialog = (dev) => {
    setLoginDev(dev);
    setLoginModal(true);
  };

  const closeLoginDevDialog = () => {
    setLoginModal(false);
    setLoginDev(null);
  };

  //signupDeveloper Modal
  const [signupModal, setSignupModal] = useState(false);

  //open & close DeleteDev Dialog.
  const openSignupDevDialog = (dev) => {
    setSignupDev(dev);
    setSignupModal(true);
  };

  const closeSignupDevDialog = () => {
    setSignupModal(false);
    setSignupDev(null);
  };

  return (
    <div className="App">
      <Container>
        <h1 style={{ fontWeight: "bold", fontStyle: "italic" }}>
          Developers''
        </h1>
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
                {devs?.map((dev) => {
                  return (
                    <tr key={dev.id}>
                      <td>{dev.id}</td>
                      <td>{dev.firstName}</td>
                      <td>{dev.lastName}</td>
                      <td>{dev.email}</td>
                      <td>{dev.gender}</td>
                      <td>{formatDateWithoutTime(dev.dateOfBirth)}</td>
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
                            onClick={() => openDeleteDevDialog(dev)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>

          <Col md={12} xs={12} sm={12} className="buttonDiv">
            <div className="addButton mb-2">
              <Button variant="info" onClick={openCreateDevDialog}>
                Add New Developer
              </Button>
            </div>
            <div className="addButton mb-2">
              <Button variant="secondary" onClick={openSignupDevDialog}>
                Sign Up
              </Button>
            </div>
            <div className="addButton mb-2">
              <Button variant="warning" onClick={openLoginDevDialog}>
                Log In
              </Button>
            </div>
          </Col>

          <Col xs={12} md={6}>
            <Form ref={uploadRef} onSubmit={submitDevFiles} className="mb-2">
              <Form.Group className="mb-2" controlId="image">
                <Form.Label>Upload Dev photo</Form.Label>
                <Form.Control
                  name="images"
                  type="file"
                  placeholder="Upload devFiles"
                />
              </Form.Group>
              <Button variant="secondary" type="submit">
                Upload devFile
              </Button>
            </Form>
            <div className="d-flex justify-content-start">
              <img
                src={`${baseUrl}/images/1701765665878.jpg`}
                alt="n"
                style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* create new developer */}
      <CreateDeveloperModal
        visible={visible}
        closeCreateDevDialog={closeCreateDevDialog}
        saveDev={saveDev}
        validated={validated}
        devRef={devRef}
        fetchDev={fetchDev}
      />

      {/* edit developer */}
      <EditDeveloperModal
        show={show}
        handleClose={closeEditDevDialog}
        saveDev={saveDev}
        validated={validated}
        devRef={devRef}
        editDev={editDev}
        fetchDev={fetchDev}
      />

      {/* delete developer */}
      <DeleteDeveloperModal
        deleteModal={deleteModal}
        closeDeleteDevDialog={closeDeleteDevDialog}
        deleteDev={deleteDev}
      />

      {/* login developer */}
      <LoginDeveloperModal
        loginModal={loginModal}
        closeLoginDevDialog={closeLoginDevDialog}
      />

      {/* signup developer */}
      <SignUpDeveloperModal
        signupModal={signupModal}
        closeSignupDevDialog={closeSignupDevDialog}
      />
    </div>
  );
};

export default App;
