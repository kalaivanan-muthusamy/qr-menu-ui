import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import Alert from "./../../../components/Alert";
import { getErrorMessage, postRequest } from "./../../../utils/serviceRequest";

function AddBranch({ onClose }) {
  const [branchDetails, setBranchDetails] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  function onInputChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    setBranchDetails({
      ...branchDetails,
      [key]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    setError(null);
    setInfo(null);
    const [, error] = await postRequest("branches", {
      ...branchDetails,
    });
    if (error) {
      setLoading(false);
      return setError(getErrorMessage(error));
    }
    setLoading(false);
    onClose(true);
  }

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Branch</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={branchDetails?.name}
              onChange={onInputChange}
              type="name"
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={branchDetails?.description}
              onChange={onInputChange}
              type="description"
              placeholder="Description"
            />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={branchDetails?.address}
              onChange={onInputChange}
              type="text"
              placeholder="Address"
            />
          </Form.Group>
          {error && (
            <Alert
              className="mt-3"
              message={error}
              alertType="alert-light-danger"
              iconName="warning-outline"
            />
          )}
          {info && (
            <Alert
              className="mt-3"
              message={info}
              alertType="alert-light-success"
              iconName="checkmark-outline"
            />
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="primary"
          className={loading ? "spinner spinner-white spinner-right" : ""}
        >
          Add Branch
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddBranch;
