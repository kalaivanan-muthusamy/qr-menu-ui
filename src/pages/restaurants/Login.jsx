import { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { postRequest, getErrorMessage } from "./../../utils/serviceRequest";
import logo from "../../images/logo.svg";
import Alert from "./../../components/Alert";
import { Link, withRouter } from "react-router-dom";

function Login(props) {
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
    const [resDetails, error] = await postRequest("auth", {
      ...restaurantDetails,
    });
    if (error) {
      setLoading(false);
      return setError(getErrorMessage(error));
    }
    setInfo("Restaurant login is successful. Please log in");
    localStorage.setItem("accessToken", resDetails.accessToken);
    localStorage.setItem("fullName", resDetails.fullName);
    localStorage.setItem("role", resDetails?.roleDetails?.name);
    localStorage.setItem("email", resDetails.email);
    props.history.push("/restaurants/dashboard");
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
              <h2 className="text-center mb-5">Restaurant Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={restaurantDetails?.email}
                    onChange={onInputChange}
                    type="email"
                    placeholder="Email"
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    value={restaurantDetails?.password}
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
              Don't have an account?{" "}
              <Link to="/restaurants/signup">Sign Up!</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(Login);
