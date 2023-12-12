import { Modal, Form, Col, Row, Button } from "react-bootstrap";

export const SignUpDeveloperModal = ({
  signupModal,
  closeSignupDevDialog,
  validated,
}) => {
  const submitRegistration = () => {};
  return (
    <Modal
      show={signupModal}
      onHide={closeSignupDevDialog}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={false}
      backdrop="static"
      dialogClassName="modal-50w"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Developer SignUp...
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
            <Col xs={12} md={12}>
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
            <Col xs={12} md={12}>
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
            <Col xs={12} md={12}>
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
        <Button variant="warning" onClick={closeSignupDevDialog}>
          Cancel
        </Button>

        <Button
          // onClick={}
          variant="success"
          type="Button"
        >
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
