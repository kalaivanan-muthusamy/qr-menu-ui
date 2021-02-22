import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRequest } from "../../utils/serviceRequest";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { addItemToCart, removeItemFromCart } from "../../store/menu/cartSlice";
import {
  setRestaurantDetails,
  setCategories,
  setBranchDetails,
  setFoodItems,
} from "../../store/menu/restaurantSlice";
import VerifyOrderModal from "./VerifyOrderModal";
import UpdateOrderModal from "./UpdateOrderModal";
import OrderDetailsModal from "./OrderDetailsModal";
import Alert from "../../components/Alert";

function Menu(props) {
  const { restaurantId, branchId } = useParams();
  const [showVerifyOrderModal, setShowVerifyOrderModal] = useState(false);
  const [showUpdateOrderModal, setShowUpdateOrderModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const sessionDetails = useSelector((state) => state?.cart?.sessionDetails);
  const branchDetails = useSelector(
    (state) => state?.restaurant?.branchDetails
  );
  const categories = useSelector((state) => state?.restaurant?.categories);
  const restaurantDetails = useSelector(
    (state) => state?.restaurant?.restaurantDetails
  );
  const [error, setError] = useState(null);
  const foodItems = useSelector((state) => state?.restaurant?.foodItems);
  const dispatch = useDispatch();

  console.log({ cartItems });

  useEffect(() => {
    getRestaurantDetails();
    getBranchDetails();
    getCategories();
    getFoodItems();
  }, []);

  async function getRestaurantDetails() {
    try {
      const [restaurantDetailsRes, foodFetchErr] = await getRequest(
        `restaurants/${restaurantId}`
      );
      if (foodFetchErr) return;
      dispatch(setRestaurantDetails(restaurantDetailsRes));
    } catch (err) {}
  }

  async function getCategories() {
    try {
      const [categoriesRes, foodFetchErr] = await getRequest(
        `categories/by_restaurant/${restaurantId}/`
      );
      if (foodFetchErr) return;
      dispatch(setCategories(categoriesRes));
    } catch (err) {}
  }

  async function getBranchDetails() {
    try {
      const [branchDetailsRes, branchFetchErr] = await getRequest(
        `branches/${branchId}/`
      );
      if (branchFetchErr) return;
      dispatch(setBranchDetails(branchDetailsRes));
    } catch (err) {}
  }

  async function getFoodItems() {
    try {
      const [foodItems, foodFetchErr] = await getRequest(
        `catalogue/by_branch/${branchId}/`
      );
      if (foodFetchErr) {
        return;
      }
      dispatch(setFoodItems(foodItems));
    } catch (err) {}
  }

  function onPlaceOrder() {
    setError(null);
    if (cartItems.length > 0) {
      setShowVerifyOrderModal(true);
    } else {
      setError("Add any items to the cart to place a order");
    }
  }

  function onOrderUpdate() {
    setError(null);
    if (cartItems.length > 0) {
      setShowUpdateOrderModal(true);
    } else {
      setError("Add any items to the cart to update order");
    }
  }

  function addItem(foodItem) {
    dispatch(addItemToCart(foodItem));
  }

  function removeItem(foodItem) {
    dispatch(removeItemFromCart(foodItem));
  }

  function getCartQuantity(foodItemId) {
    return (
      cartItems.find((food) => food.foodItemId === foodItemId)?.quantity ?? 0
    );
  }

  function getFoodItemsByCategory(category) {
    const foodItemsByCategory = foodItems?.filter?.(
      (foodItem) => foodItem.categoryId === category._id
    );
    if (foodItemsByCategory?.length > 0)
      return (
        <>
          <div className="category-name">{category.name}</div>
          <div className="food-items">
            {foodItemsByCategory?.map?.((foodItem) => (
              <div className="card rounded p-5 mb-4">
                <Row>
                  <Col sm="12">
                    <div className="title h4">{foodItem.name}</div>
                    <div className="description text-muted pt-1">
                      {foodItem.description}
                    </div>
                    <div className="price pt-3 h5">Rs.{foodItem.salePrice}</div>
                  </Col>
                  <Col sm="12" className="quantity-toolbar pt-3">
                    <ion-icon
                      onClick={() => removeItem(foodItem)}
                      name="remove-circle-outline"
                    ></ion-icon>
                    <span>{getCartQuantity(foodItem._id)}</span>
                    <ion-icon
                      onClick={() => addItem(foodItem)}
                      name="add-circle-outline"
                    ></ion-icon>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </>
      );
  }

  return (
    <Container fluid>
      <Row fluid>
        <Col sm="12" md="6" className="ml-auto mr-auto">
          <div className="menu-content">
            <div className="menu-header text-center">
              <h1>{restaurantDetails?.name}</h1>
              <p className="mb-0">{branchDetails?.name}</p>
            </div>
            <div className="menu-body">
              {sessionDetails?._id && (
                <>
                  <div className="text-center">
                    <div className="mt-3">
                      <b>Session Id:</b> {sessionDetails?._id}
                    </div>
                    <div className="pt-3">
                      <b>
                        <a
                          href="#"
                          onClick={() => setShowOrderDetailsModal(true)}
                        >
                          View current order details
                        </a>
                      </b>
                    </div>
                  </div>
                  <hr />
                </>
              )}

              <div className="search mt-5 mb-5">
                <p>Hey, Order your food here!.</p>
                <Form.Control
                  name="search"
                  type="text"
                  placeholder="Search here!"
                />
              </div>
              {categories?.map?.((category) => (
                <>{getFoodItemsByCategory(category)}</>
              ))}
            </div>
            <div>
              {error && (
                <Alert
                  className="mt-3"
                  message={error}
                  alertType="alert-light-danger"
                  iconName="warning-outline"
                />
              )}
            </div>
            <div className="menu-footer text-center">
              <div>
                {sessionDetails?._id ? (
                  <>
                    <Button
                      onClick={() => setShowOrderDetailsModal(true)}
                      block
                    >
                      Finish Order
                    </Button>
                    <Button onClick={onOrderUpdate} block>
                      Add more items to the order
                    </Button>
                  </>
                ) : (
                  <Button onClick={onPlaceOrder} block className="primary">
                    Place Order
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {showVerifyOrderModal && (
        <VerifyOrderModal onClose={() => setShowVerifyOrderModal(false)} />
      )}
      {showUpdateOrderModal && (
        <UpdateOrderModal onClose={() => setShowUpdateOrderModal(false)} />
      )}
      {showOrderDetailsModal && (
        <OrderDetailsModal onClose={() => setShowOrderDetailsModal(false)} />
      )}
    </Container>
  );
}

export default Menu;
