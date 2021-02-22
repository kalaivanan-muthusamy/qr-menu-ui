import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getErrorMessage, postRequest } from "./../../utils/serviceRequest";
import {
  setSessionId,
  setOrderDetails,
  setSessionDetails,
  clearCartItems,
} from "../../store/menu/cartSlice";
import { useDispatch } from "react-redux";
import Toastr from "../../components/Toastr";

function VerifyOrder({ onClose, handleSubmit }) {
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const restaurantDetails = useSelector(
    (state) => state?.restaurant?.restaurantDetails
  );
  const branchDetails = useSelector(
    (state) => state?.restaurant?.branchDetails
  );
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  function onInputChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      [key]: value,
    });
  }

  function getTotalPrice() {
    let totalPrice = 0;
    cartItems?.map?.((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    setError(null);
    const [orderDetails, error] = await postRequest(
      `orders/${restaurantDetails._id}/${branchDetails._id}`,
      {
        ...userDetails,
        finalPrice: getTotalPrice(),
        cartItems: JSON.stringify(cartItems),
      }
    );
    if (error) {
      setLoading(false);
      return setError(getErrorMessage(error));
    }
    // Once the order is placed,
    // 1. update the session id in store
    // 2. clear the card
    // 3. store the session details and order details
    dispatch(clearCartItems());
    dispatch(setSessionId(orderDetails?.sessionDetails?._id));
    dispatch(setOrderDetails(orderDetails?.orderDetails));
    dispatch(setSessionDetails(orderDetails?.sessionDetails));
    setLoading(false);
    Toastr.success("You order has been placed successfully");
    onClose(true);
  }

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Verify your order</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Food Item</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map?.((cartItem) => (
              <tr>
                <td>
                  {cartItem.name} ({cartItem.quantity} * Rs. {cartItem.price})
                </td>
                <td>Rs. {cartItem.quantity * cartItem.price}</td>
              </tr>
            ))}
            <tr>
              <td>Total Price</td>
              <td>
                <b>Rs. {getTotalPrice()}</b>
              </td>
            </tr>
          </tbody>
        </table>
        <Form.Group controlId="customerName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="customerName"
            value={userDetails?.customerName}
            onChange={onInputChange}
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group controlId="customerEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="customerEmail"
            value={userDetails?.customerEmail}
            onChange={onInputChange}
            type="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group controlId="customerAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="customerAddress"
            value={userDetails?.customerAddress}
            onChange={onInputChange}
            type="address"
            placeholder="Address"
          />
        </Form.Group>
        <p className="text-muted">
          * Once the order is placed, a unique session will be created for you.
          This should be accepted by the restaurant.
        </p>
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
          Place Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default VerifyOrder;
