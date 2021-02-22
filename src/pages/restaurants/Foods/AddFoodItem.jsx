import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import Select from "react-select";
import Alert from "./../../../components/Alert";
import {
  getErrorMessage,
  getRequest,
  postRequest,
} from "./../../../utils/serviceRequest";
import Checkbox from "./../../../components/Checkbox";
import Toastr from "./../../../components/Toastr";
import MultiSelect from "./../../../components/MultiSelect";

function AddFoodItem({ onClose }) {
  const [foodItemDetails, setFoodItemDetails] = useState({
    isAvailable: true,
  });
  const [categories, setCategories] = useState(null);
  const [branches, setBranches] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);

  useEffect(() => {
    getCategories();
    getBranches();
  }, []);

  function onInputChange(event, type, key) {
    if (type === "multi-select") {
      const selected = event;
      setFoodItemDetails({
        ...foodItemDetails,
        [key]: selected.map((s) => s.value).join(","),
      });
    } else if (event?.target?.type === "checkbox") {
      console.log(event.target);
      const key = event.target.name;
      const value = event.target.checked;
      setFoodItemDetails({
        ...foodItemDetails,
        [key]: value,
      });
    } else {
      const key = event.target.name;
      const value = event.target.value;
      setFoodItemDetails({
        ...foodItemDetails,
        [key]: value,
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    setError(null);
    setInfo(null);
    const [, error] = await postRequest("catalogue", {
      ...foodItemDetails,
    });
    if (error) {
      setLoading(false);
      return setError(getErrorMessage(error));
    }
    Toastr.success("Food item updated successfully");
    setLoading(false);
    onClose(true);
  }

  async function getCategories() {
    try {
      const [categories, categoryFetchErr] = await getRequest("categories");
      if (categoryFetchErr) {
        return;
      }
      setCategories(categories);
    } catch (err) {}
  }
  async function getBranches() {
    try {
      const [branches, branchFetchErr] = await getRequest("branches");
      if (branchFetchErr) {
        return;
      }
      setBranches(
        branches.map((branch) => ({
          label: branch.name,
          value: branch._id,
        }))
      );
    } catch (err) {}
  }

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Food Item</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={foodItemDetails?.name}
              onChange={onInputChange}
              type="name"
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={foodItemDetails?.description}
              onChange={onInputChange}
              type="description"
              placeholder="Description"
            />
          </Form.Group>

          <Form.Group controlId="originalPrice">
            <Form.Label>Original Price</Form.Label>
            <Form.Control
              name="originalPrice"
              value={foodItemDetails?.originalPrice}
              onChange={onInputChange}
              type="originalPrice"
              placeholder="Original Price"
            />
          </Form.Group>

          <Form.Group controlId="salePrice">
            <Form.Label>Sale Price</Form.Label>
            <Form.Control
              name="salePrice"
              value={foodItemDetails?.salePrice}
              onChange={onInputChange}
              type="salePrice"
              placeholder="Sale Price"
            />
          </Form.Group>

          <Form.Group controlId="isAvailable">
            <Form.Label>Is Available</Form.Label>
            <Checkbox
              name="isAvailable"
              label="Yes"
              checked={foodItemDetails?.isAvailable}
              onChange={onInputChange}
            />
          </Form.Group>

          <Form.Group controlId="categoryId">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="categoryId"
              value={foodItemDetails?.categoryId}
              onChange={onInputChange}
              as="select"
            >
              <option value="">Select Category</option>
              {categories?.map?.((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="branchIds">
            <Form.Label>Branches</Form.Label>
            <MultiSelect
              name="branchIds"
              closeMenuOnSelect={false}
              allowSelectAll
              allOption={{ label: "All Branches", value: "" }}
              isMulti
              value={selectedBranches}
              onChange={(selected) => {
                onInputChange(selected, "multi-select", "branchIds");
                setSelectedBranches(selected);
              }}
              options={branches || []}
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
          Add Food Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddFoodItem;
