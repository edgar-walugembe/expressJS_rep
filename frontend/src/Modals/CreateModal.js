// import { Button, Row, Col, Modal, Form } from "react-bootstrap";
// import React from "react";
// import { formatDateWithoutTime } from "../utils";

// export const CreateDeveloperModal = ({
//   visible,
//   validated,
//   saveDev,
//   devRef,
//   closeCreateDevDialog,
//   fetchDev,
// }) => {
//   const submitForm = async (event) => {
//     console.log("Submit form called");
//     event.preventDefault();
//     event.stopPropagation();
//     devRef.current.requestSubmit();
//     fetchDev();
//   };

//   return (
//     <Modal
//       show={visible}
//       onHide={closeCreateDevDialog}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       keyboard={false}
//       backdrop="static"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Add New Developer
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form
//           noValidate
//           validated={validated}
//           ref={devRef}
//           onSubmit={saveDev}
//           autoComplete="true"
//         >
//           <Row>
//             <Col xs={12} md={6}>
//               <Form.Group className="mb-2 flex" controlId="firstName">
//                 <Form.Label>FirstName</Form.Label>
//                 <Form.Control
//                   required={true}
//                   name="firstName"
//                   type="text"
//                   placeholder="Enter first name"
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   First name is required.
//                 </Form.Control.Feedback>
//               </Form.Group>
//               {/* <Col xs={12} md={6}></Col> */}
//               <Form.Group className="mb-2" controlId="lastName">
//                 <Form.Label>LastName</Form.Label>
//                 <Form.Control
//                   required={true}
//                   name="lastName"
//                   type="text"
//                   placeholder="Enter last name"
//                 />
//               </Form.Group>
//             </Col>

//             <Col xs={12} md={6}>
//               <Form.Group
//                 className="mb-2"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 <Form.Label>E-mail</Form.Label>
//                 <Form.Control
//                   name="email"
//                   type="email"
//                   placeholder="name@example.com"
//                 />
//               </Form.Group>
//             </Col>

//             <Col xs={12} md={6}>
//               <Form.Group className="mb-2" controlId="gender">
//                 <Form.Label>Gender</Form.Label>
//                 <Form.Select
//                   name="gender"
//                   required={true}
//                   aria-label="Select Gender"
//                 >
//                   <option>Open this select menu</option>
//                   <option value="Male">MALE</option>
//                   <option value="Female">FEMALE</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             <Col xs={12} md={6}>
//               <Form.Group className="mb-2" controlId="dob">
//                 <Form.Label>Date of birth</Form.Label>
//                 <Form.Control name="dob" type="date" placeholder="" />
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="warning" onClick={closeCreateDevDialog}>
//           Cancel
//         </Button>

//         <Button
//           onClick={(event) => submitForm(event)}
//           variant="success"
//           type="Button"
//         >
//           Submit
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

import React from "react";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";

export const CreateDeveloperModal = ({
  visible,
  validated,
  saveDev,
  devRef,
  closeCreateDevDialog,
  fetchDev,
}) => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    dob: yup.date().required(),
  });

  const submitForm = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    devRef.current.requestSubmit();
    fetchDev();
  };

  return (
    <Modal
      show={visible}
      onHide={closeCreateDevDialog}
      size="md"
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
        <Formik
          validationSchema={schema}
          onSubmit={saveDev}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            dob: "",
          }}
        >
          {({ handleChange, values, touched, errors }) => (
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
                    {" "}
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control
                      required={true}
                      name="firstName"
                      type="text"
                      placeholder="Enter first name"
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
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
                      value={values.lastName}
                      onChange={handleChange}
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-2" controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-2" controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      required
                      aria-label="Select Gender"
                      value={values.gender}
                      onChange={handleChange}
                      isInvalid={!!errors.gender}
                    >
                      <option>Open this select menu</option>
                      <option value="Male">MALE</option>
                      <option value="Female">FEMALE</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.gender}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-2" controlId="dob">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control
                      name="dob"
                      type="date"
                      value={values.dob}
                      onChange={handleChange}
                      isInvalid={!!errors.dob}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dob}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
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
