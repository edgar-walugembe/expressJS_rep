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
      className="d-flex flex-column justify-content-center p-5"
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
              <Form.Group className="mb-2 flex" controlId="username">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  required={true}
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                />
                <Form.Control.Feedback type="invalid">
                  UserName is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-2 flex" controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  required={true}
                  name="email"
                  type="text"
                  placeholder="Enter E-mail."
                />
                <Form.Control.Feedback type="invalid">
                  E-mail is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-2" controlId="password">
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
