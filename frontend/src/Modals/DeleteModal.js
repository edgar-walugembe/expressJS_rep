import { Modal, Button } from "react-bootstrap";

export const DeleteDeveloperModal = ({
  deleteModal,
  closeDeleteDevDialog,
  deleteDev,
}) => {
  return (
    <Modal
      show={deleteModal}
      onHide={closeDeleteDevDialog}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Developer</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this developer ?</Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="info" onClick={closeDeleteDevDialog}>
          Cancel
        </Button>
        <Button onClick={deleteDev} size="sm" variant="danger" type="Button">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
