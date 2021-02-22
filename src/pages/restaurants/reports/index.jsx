import { useState } from "react";
import { useEffect } from "react";
import { getRequest } from "../../../utils/serviceRequest";
import RestaurantsLayout from "./../../../components/RestaurantLayout";
import Toastr from "../../../components/Toastr";

function OrderReports() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getAllCompletedOrders();
  }, []);

  async function getAllCompletedOrders() {
    try {
      const [allOrders, orderFetchErr] = await getRequest("orders");
      if (orderFetchErr) {
        Toastr.error("Couldn't fetch the order details");
        return;
      }
      setOrders(allOrders);
    } catch (err) {}
  }

  return (
    <RestaurantsLayout>
      <div className="card card-custom pb-5">
        <div className="card-header flex-wrap border-0 pt-6 pb-0">
          <div className="card-title">
            <h3 className="card-label">
              Orders
              <span className="d-block text-muted pt-2 font-size-sm">
                List of completed orders
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
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Branch</th>
                  <th>Total Items</th>
                  <th>Total Amount</th>
                  <th>Payment Mode</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  Array.isArray(orders) &&
                  orders.map((order, index) => (
                    <tr key={order?._id}>
                      <td>{index + 1}</td>
                      <td>
                        {order?.createdAt
                          ? new Intl.DateTimeFormat("en-IN", {
                              dateStyle: "short",
                              timeStyle: "short",
                            }).format(new Date(order?.createdAt))
                          : ""}
                      </td>
                      <td>{order?.sessionDetails?.customerName}</td>
                      <td>{order?.branchDetails?.name}</td>
                      <td>{order?.items?.length}</td>
                      <td>Rs. {order?.finalPrice}</td>
                      <td>{order?.paymentMode}</td>
                      <td></td>
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

export default OrderReports;
