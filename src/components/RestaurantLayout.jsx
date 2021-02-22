import RestaurantsHeader from "./RestaurantsHeader";

function RestaurantsLayout(props) {
  return (
    <>
      <RestaurantsHeader />
      <div className="content d-flex flex-column flex-column-fluid">
        <div className="d-flex flex-column-fluid">
          <div className="container">{props.children}</div>
        </div>
      </div>
    </>
  );
}

export default RestaurantsLayout;
