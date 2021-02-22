import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import Alert from "./../../../components/Alert";
import { getErrorMessage, postRequest } from "./../../../utils/serviceRequest";

function AddCategory({ onClose }) {
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  function onInputChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    setCategoryDetails({
      ...categoryDetails,
      [key]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    setError(null);
    setInfo(null);
    const [, error] = await postRequest("categories", {
      ...categoryDetails,
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
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={categoryDetails?.name}
              onChange={onInputChange}
              type="name"
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={categoryDetails?.description}
              onChange={onInputChange}
              type="description"
              placeholder="Description"
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
          Add Category
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddCategory;
