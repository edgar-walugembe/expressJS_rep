import { Modal, Form, Col, Row, Button } from "react-bootstrap";

export const LoginDeveloperModal = ({
  loginModal,
  closeLoginDevDialog,
  validated,
}) => {
  return (
    <Modal
      show={loginModal}
      onHide={closeLoginDevDialog}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={false}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Developer Login...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          // ref={}
          // onSubmit={}
          autoComplete="true"
        >
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-2 flex" controlId="firstName">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  required={true}
                  name="userName"
                  type="text"
                  placeholder="Enter user name"
                />
                <Form.Control.Feedback type="invalid">
                  userName is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-2" controlId="lastName">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required={true}
                  name="password"
                  type="password"
                  placeholder="Enter Password."
                />
                <Form.Control.Feedback type="invalid">
                  password is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={closeLoginDevDialog}>
          Cancel
        </Button>

        <Button
          variant="success"
          type="Button"
          // onClick={}
        >
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
