import { useState } from "react";
import { useEffect } from "react";
import { getRequest } from "../../../utils/serviceRequest";
import RestaurantsLayout from "./../../../components/RestaurantLayout";
import { postRequest, getErrorMessage } from "./../../../utils/serviceRequest";
import Toastr from "../../../components/Toastr";
import DoubleCheckIcon from "./../../../components/icons/DoubeCheckIcon";
import CloseIcon from "./../../../components/icons/CloseIcon";

function Sessions() {
  const [pendingSessions, setPendingSessions] = useState(null);

  useEffect(() => {
    getAllPendingSessions();
  }, []);

  async function getAllPendingSessions() {
    try {
      const [pendingSessions, orderSessionFetchErr] = await getRequest(
        "orders/sessions/pending"
      );
      if (orderSessionFetchErr) {
        return;
      }
      setPendingSessions(pendingSessions);
    } catch (err) {}
  }

  async function approveSession(sessionId) {
    try {
      const [, approveErr] = await postRequest(
        `orders/sessions/approve/${sessionId}`
      );
      if (approveErr) {
        Toastr.error(getErrorMessage(approveErr));
        return;
      }
      Toastr.success("Session approved successfully");
      getAllPendingSessions();
    } catch (err) {}
  }

  async function rejectSession(sessionId) {
    try {
      const [, approveErr] = await postRequest(
        `orders/sessions/reject/${sessionId}`
      );
      if (approveErr) {
        Toastr.error(getErrorMessage(approveErr));
        return;
      }
      Toastr.success("Session rejected successfully");
      getAllPendingSessions();
    } catch (err) {}
  }

  return (
    <RestaurantsLayout>
      <div className="card card-custom pb-5">
        <div className="card-header flex-wrap border-0 pt-6 pb-0">
          <div className="card-title">
            <h3 className="card-label">
              Sessions
              <span className="d-block text-muted pt-2 font-size-sm">
                List of pending sessions
              </span>
            </h3>
          </div>
          <div className="card-toolbar"></div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-head-custom table-vertical-center">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Customer Name</th>
                  <th>Customer Email</th>
                  <th>Branch Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingSessions &&
                  Array.isArray(pendingSessions) &&
                  pendingSessions.map((session, index) => (
                    <tr key={session?._id}>
                      <td>{index + 1}</td>
                      <td>{session?.customerName}</td>
                      <td>{session?.customerEmail}</td>
                      <td>{session?.branchDetails?.name}</td>
                      <td>
                        <button
                          onClick={() => approveSession(session._id)}
                          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        >
                          <span className="svg-icon svg-icon-primary svg-icon-2x">
                            <DoubleCheckIcon />
                          </span>
                        </button>
                        <button
                          onClick={() => rejectSession(session._id)}
                          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        >
                          <span className="svg-icon svg-icon-primary svg-icon-2x">
                            <CloseIcon />
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
    </RestaurantsLayout>
  );
}

export default Sessions;
