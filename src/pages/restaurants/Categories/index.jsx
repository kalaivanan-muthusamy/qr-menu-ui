import { useState } from "react";
import { useEffect } from "react";
import { getRequest } from "../../../utils/serviceRequest";
import RestaurantsLayout from "./../../../components/RestaurantLayout";
import WriteIcon from "./../../../components/icons/WriteIcon";
import AddCategory from "./AddCategory";
import DeleteIcon from "./../../../components/icons/DeleteIcon";
import { deleteRequest } from "./../../../utils/serviceRequest";
import ConfirmationModel from "./../../../components/ConfirmationModel";
import Toastr from "../../../components/Toastr";

function Categories() {
  const [categories, setCategories] = useState(null);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const [categories, categoryFetchErr] = await getRequest("categories");
      if (categoryFetchErr) {
        return;
      }
      setCategories(categories);
    } catch (err) {}
  }

  function getDeleteConfirmation({ message, onConfirmation }) {
    setConfirmModal({
      message,
      onConfirmation,
      onCancel: () => setConfirmModal(null),
    });
  }

  async function deleteCategory(categoryId) {
    try {
      const [, categoryFetchErr] = await deleteRequest(
        `categories/${categoryId}`
      );
      if (categoryFetchErr) {
        return;
      }
      Toastr.success("Category deleted successfully");
      getCategories();
    } catch (err) {}
  }

  function onNewCategoryModalClose(refresh) {
    setAddCategoryModal(false);
    if (refresh) getCategories();
  }

  return (
    <RestaurantsLayout>
      <div className="card card-custom pb-5">
        <div className="card-header flex-wrap border-0 pt-6 pb-0">
          <div className="card-title">
            <h3 className="card-label">
              Categories
              <span className="d-block text-muted pt-2 font-size-sm">
                List of categories
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <button
              onClick={() => setAddCategoryModal(true)}
              className="btn btn-primary font-weight-bolder"
            >
              New Category
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
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  Array.isArray(categories) &&
                  categories.map((category, index) => (
                    <tr key={category._id}>
                      <td>{index + 1}</td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td>
                        <button
                          onClick={() =>
                            getDeleteConfirmation({
                              message:
                                "Are you sure you want to delete this category?",
                              onConfirmation: () => {
                                setConfirmModal(null);
                                deleteCategory(category._id);
                              },
                            })
                          }
                          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        >
                          <span className="svg-icon svg-icon-primary svg-icon-2x">
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
      {addCategoryModal && <AddCategory onClose={onNewCategoryModalClose} />}
      {confirmModal && <ConfirmationModel {...confirmModal} />}
    </RestaurantsLayout>
  );
}

export default Categories;
