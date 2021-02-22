import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getErrorMessage, postRequest } from "./../../utils/serviceRequest";
import { clearCart } from "../../store/menu/cartSlice";
import { useDispatch } from "react-redux";
import Toastr from "./../../components/Toastr";

function OrderDetailsModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const orderDetails = useSelector((state) => state?.cart?.orderDetails);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  function getTotalPrice() {
    let totalPrice = 0;
    orderDetails?.items?.map?.((item) => {
      totalPrice += item.totalPrice;
    });
    return totalPrice;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    setError(null);
    const [orderDetailsRes, error] = await postRequest(
      `orders/initiate-payment/${orderDetails._id}`
    );
    if (error) {
      setLoading(false);
      return setError(getErrorMessage(error));
    }
    setLoading(false);
    capturePayment({ paymentReferenceId: orderDetailsRes.paymentReferenceId });
  }

  function completeSession() {
    dispatch(clearCart());
    Toastr.success("Payment has been completed successfully");
    onClose(true);
  }

  function capturePayment({ paymentReferenceId }) {
    const options = {
      key: "rzp_test_XOzOb2btILyEMf",
      amount: (orderDetails.finalPrice * 100).toString(),
      currency: "INR",
      name: "Digital QR Menu",
      order_id: paymentReferenceId,
      handler: async function (response) {
        console.log({ response });
        const data = {
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const [paymentResponse, paymentError] = await postRequest(
          `orders/complete-payment/${orderDetails._id}`,
          data
        );
        if (paymentError) Toastr.error("Couldn't update the payment status");
        completeSession(paymentResponse);
      },
      theme: {
        color: "#3699ff",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Current order details</Modal.Title>
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
            {orderDetails?.items?.map?.((item) => (
              <tr>
                <td>
                  {item.name} ({item.quantity} * Rs. {item.salePrice})
                </td>
                <td>Rs. {item.quantity * item.salePrice}</td>
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
          Continue
        </Button>
        <Button
          onClick={handleSubmit}
          variant="primary"
          className={loading ? "spinner spinner-white spinner-right" : ""}
        >
          Pay & Complete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default OrderDetailsModal;
