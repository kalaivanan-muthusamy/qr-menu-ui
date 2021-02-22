import { useState } from "react";
import { useEffect } from "react";
import { getRequest } from "../../../utils/serviceRequest";
import RestaurantsLayout from "./../../../components/RestaurantLayout";
import WriteIcon from "./../../../components/icons/WriteIcon";
import AddFoodItem from "./AddFoodItem";
import DeleteIcon from "./../../../components/icons/DeleteIcon";
import Label from "./../../../components/Label";
import EditFoodItem from "./EditFoodItem";
import { deleteRequest } from "./../../../utils/serviceRequest";
import Toastr from "./../../../components/Toastr";
import ConfirmationModel from "./../../../components/ConfirmationModel";

function Foods() {
  const [foodItems, setFoodItems] = useState(null);
  const [addFoodModal, setAddFoodModal] = useState(false);
  const [editFoodModal, setEditFoodModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);

  useEffect(() => {
    getFoodItems();
  }, []);

  async function getFoodItems() {
    try {
      const [foodItems, foodFetchErr] = await getRequest("catalogue");
      if (foodFetchErr) {
        return;
      }
      setFoodItems(foodItems);
    } catch (err) {}
  }

  function onEditFoodModalClose(refresh) {
    setEditFoodModal(false);
    if (refresh) getFoodItems();
  }

  function onAddFoodModalClose(refresh) {
    setAddFoodModal(false);
    if (refresh) getFoodItems();
  }

  function getDeleteConfirmation({ message, onConfirmation }) {
    setConfirmModal({
      message,
      onConfirmation,
      onCancel: () => setConfirmModal(null),
    });
  }

  async function deleteCatalogue(catalogueId) {
    try {
      const [, catalogueErr] = await deleteRequest(`catalogue/${catalogueId}`);
      if (catalogueErr) {
        return;
      }
      Toastr.success("Catalogue deleted successfully");
      getFoodItems();
    } catch (err) {}
  }

  return (
    <RestaurantsLayout>
      <div className="card card-custom pb-5">
        <div className="card-header flex-wrap border-0 pt-6 pb-0">
          <div className="card-title">
            <h3 className="card-label">
              Foods
              <span className="d-block text-muted pt-2 font-size-sm">
                List of food items
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <button
              onClick={() => setAddFoodModal(true)}
              className="btn btn-primary font-weight-bolder"
            >
              New Food Item
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-head-custom table-vertical-center">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Original Price</th>
                  <th>Sale Price</th>
                  <th>Is Available</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {foodItems &&
                  Array.isArray(foodItems) &&
                  foodItems.map((foodItem, index) => (
                    <tr key={foodItem._id}>
                      <td>{index + 1}</td>
                      <td>{foodItem.name}</td>
                      <td>Rs. {foodItem.originalPrice}</td>
                      <td>Rs. {foodItem.salePrice}</td>
                      <td>
                        {foodItem.isAvailable ? (
                          <Label className="label-light-success" label="Yes" />
                        ) : (
                          <Label className="label-light-danger" label="No" />
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => setEditFoodModal(foodItem)}
                          className="btn btn-icon btn-light btn-hover-primary btn-sm"
                        >
                          <span className="svg-icon svg-icon-md svg-icon-primary">
                            <WriteIcon />
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            getDeleteConfirmation({
                              message:
                                "Are you sure you want to delete this food item?",
                              onConfirmation: () => {
                                setConfirmModal(null);
                                deleteCatalogue(foodItem._id);
                              },
                            })
                          }
                          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        >
                          <span className="svg-icon svg-icon-md svg-icon-primary">
                            <DeleteIcon />
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {addFoodModal && <AddFoodItem onClose={onAddFoodModalClose} />}
      {editFoodModal && (
        <EditFoodItem foodItem={editFoodModal} onClose={onEditFoodModalClose} />
      )}
      {confirmModal && <ConfirmationModel {...confirmModal} />}
    </RestaurantsLayout>
  );
}

export default Foods;
