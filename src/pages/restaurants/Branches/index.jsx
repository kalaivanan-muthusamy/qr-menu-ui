import { useState } from "react";
import { useEffect } from "react";
import { getRequest } from "../../../utils/serviceRequest";
import RestaurantsLayout from "./../../../components/RestaurantLayout";
import WriteIcon from "./../../../components/icons/WriteIcon";
import DeleteIcon from "./../../../components/icons/DeleteIcon";
import { deleteRequest } from "./../../../utils/serviceRequest";
import ConfirmationModel from "./../../../components/ConfirmationModel";
import Toastr from "../../../components/Toastr";
import AddBranch from './AddBranch';

function Branches() {
  const [branches, setBranches] = useState(null);
  const [addBranchModal, setAddBranchModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);

  useEffect(() => {
    getBranches();
  }, []);

  async function getBranches() {
    try {
      const [branches, branchFetchErr] = await getRequest("branches");
      if (branchFetchErr) {
        return;
      }
      setBranches(branches);
    } catch (err) {}
  }

  function getDeleteConfirmation({ message, onConfirmation }) {
    setConfirmModal({
      message,
      onConfirmation,
      onCancel: () => setConfirmModal(null),
    });
  }

  async function deleteBranch(branchId) {
    try {
      const [, branchFetchErr] = await deleteRequest(`branches/${branchId}`);
      if (branchFetchErr) {
        return;
      }
      Toastr.success("Branch deleted successfully");
      getBranches();
    } catch (err) {}
  }

  function onNewBranchModalClose(refresh) {
    setAddBranchModal(false);
    Toastr.success("Branch added successfully");
    if (refresh) getBranches();
  }

  return (
    <RestaurantsLayout>
      <div className="card card-custom pb-5">
        <div className="card-header flex-wrap border-0 pt-6 pb-0">
          <div className="card-title">
            <h3 className="card-label">
              Branches
              <span className="d-block text-muted pt-2 font-size-sm">
                List of branches
              </span>
            </h3>
          </div>
          <div className="card-toolbar">
            <button
              onClick={() => setAddBranchModal(true)}
              className="btn btn-primary font-weight-bolder"
            >
              New Branch
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
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {branches &&
                  Array.isArray(branches) &&
                  branches.map((branch, index) => (
                    <tr key={branch._id}>
                      <td>{index + 1}</td>
                      <td>{branch.name}</td>
                      <td>{branch.description}</td>
                      <td>{branch.address}</td>
                      <td>
                        <button
                          onClick={() =>
                            getDeleteConfirmation({
                              message:
                                "Are you sure you want to delete this branch?",
                              onConfirmation: () => {
                                setConfirmModal(null);
                                deleteBranch(branch._id);
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
      {addBranchModal && <AddBranch onClose={onNewBranchModalClose} />}
      {confirmModal && <ConfirmationModel {...confirmModal} />}
    </RestaurantsLayout>
  );
}

export default Branches;
