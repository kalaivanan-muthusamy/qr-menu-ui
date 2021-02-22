import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getErrorMessage, putRequest } from "./../../utils/serviceRequest";
import {
  setSessionId,
  setOrderDetails,
  setSessionDetails,
  clearCartItems,
} from "../../store/menu/cartSlice";
import { useDispatch } from "react-redux";
import Toastr from "../../components/Toastr";

function UpdateOrderModal({ onClose, handleSubmit }) {
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const orderDetails = useSelector((state) => state?.cart?.orderDetails);
  const restaurantDetails = useSelector(
    (state) => state?.restaurant?.restaurantDetails
  );
  const branchDetails = useSelector(
    (state) => state?.restaurant?.branchDetails
  );
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

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
    const [orderDetailsRes, error] = await putRequest(
      `orders/${restaurantDetails._id}/${branchDetails._id}/${orderDetails._id}`,
      {
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
    dispatch(setSessionId(orderDetailsRes?.sessionDetails?._id));
    dispatch(setOrderDetails(orderDetailsRes?.orderDetails));
    dispatch(setSessionDetails(orderDetailsRes?.sessionDetails));
    setLoading(false);
    Toastr.success("You order has been updated successfully");
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
          Update Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default UpdateOrderModal;
