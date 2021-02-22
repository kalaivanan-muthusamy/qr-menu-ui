import { useEffect } from "react";
import { withRouter } from "react-router-dom";

function Logout(props) {
  useEffect(() => {
    localStorage.clear();
    props.history.push("/restaurants");
  }, []);

  return <p>Logging out</p>;
}

export default withRouter(Logout);
