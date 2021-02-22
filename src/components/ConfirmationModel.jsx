import { Button, Modal } from "react-bootstrap";

export default function ConfirmationModel({
  onCancel,
  onConfirmation,
  message,
}) {
  return (
    <Modal show onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button onClick={onCancel} variant="secondary">
          Close
        </Button>
        <Button onClick={onConfirmation} variant="warning">
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
