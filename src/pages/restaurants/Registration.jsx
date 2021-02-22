import { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { postRequest, getErrorMessage } from "./../../utils/serviceRequest";
import logo from "../../images/logo.svg";
import Alert from "./../../components/Alert";
import { Link } from "react-router-dom";

function Registration() {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  function onInputChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    setRestaurantDetails({
      ...restaurantDetails,
      [key]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    setError(null);
    setInfo(null);
    const [resDetails, error] = await postRequest("restaurants", {
      ...restaurantDetails,
    });
    if (error) {
      setLoading(false);
      return setError(getErrorMessage(error));
    }
    setInfo("Restaurant registration is successful. Please log in");
    setLoading(false);
  }

  return (
    <Container>
      <Row className="mt-5 mb-5 pb-5">
        <Col sm="12" md="6" className="mr-auto ml-auto">
          <Row>
            <Col className="text-center">
              <div className="logo-block mt-5 mb-5 pb-5">
                <img src={logo} alt="Digital QR Menu" />
                <h1 className="title">QR Menu</h1>
              </div>
            </Col>
          </Row>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-5">Restaurant Registration</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="restaurantName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={restaurantDetails?.name}
                    onChange={onInputChange}
                    type="text"
                    placeholder="Restaurant Name"
                  />
                </Form.Group>

                <Form.Group controlId="restaurantDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    value={restaurantDetails?.description}
                    onChange={onInputChange}
                    type="text"
                    placeholder="Description"
                  />
                </Form.Group>

                <Form.Group controlId="restaurantAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    value={restaurantDetails?.address}
                    onChange={onInputChange}
                    type="textarea"
                    placeholder="Address"
                  />
                </Form.Group>

                <Form.Group controlId="iamCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    name="iamCountry"
                    value={restaurantDetails?.iamCountry}
                    onChange={onInputChange}
                    type="text"
                    placeholder="Country"
                  />
                </Form.Group>

                <Form.Group controlId="iamMobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="iamMobileNumber"
                    value={restaurantDetails?.iamMobileNumber}
                    onChange={onInputChange}
                    placeholder="Mobile Number"
                  />
                </Form.Group>

                <Form.Group controlId="iamName">
                  <Form.Label>Administrator Name</Form.Label>
                  <Form.Control
                    name="iamName"
                    value={restaurantDetails?.iamName}
                    onChange={onInputChange}
                    type="text"
                    placeholder="Administrator Name"
                  />
                </Form.Group>

                <Form.Group controlId="iamEmail">
                  <Form.Label>Login Email</Form.Label>
                  <Form.Control
                    name="iamEmail"
                    value={restaurantDetails?.iamEmail}
                    onChange={onInputChange}
                    type="email"
                    placeholder="Email"
                  />
                </Form.Group>

                <Form.Group controlId="iamPassword">
                  <Form.Label>Login Password</Form.Label>
                  <Form.Control
                    name="iamPassword"
                    value={restaurantDetails?.iamPassword}
                    onChange={onInputChange}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className={
                    loading ? "spinner spinner-white spinner-right" : ""
                  }
                >
                  Submit
                </Button>
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
            </Card.Body>
          </Card>
          <Row>
            <Col className="mt-3">
              Already have an account?{" "}
              <Link to="/restaurants/login">Login!</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
