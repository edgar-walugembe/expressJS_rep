import { Modal, Form, Col, Row, Button } from "react-bootstrap";

export const SignUpModal = () => {
  return (
    <Modal
      show={}
      onHide={}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={false}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Developer SignUp...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={}
          ref={}
          onSubmit={}
          autoComplete="true"
        >
          <Row>
            <Col></Col>

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

            <Col> 
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
        <Button variant="warning" onClick={}>
          Cancel
        </Button>

        <Button
          onClick={(event) => submitForm(event)}
          variant="success"
          type="Button"
        >
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
