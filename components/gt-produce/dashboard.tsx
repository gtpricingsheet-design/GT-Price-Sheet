"use client";

import { useState } from "react";
import { useGTProduce } from "@/contexts/gt-produce-context";

type DashboardTab = "orders" | "settings";

export function Dashboard() {
  const {
    showDashboard,
    setShowDashboard,
    orders,
    deleteOrder,
    clearAllOrders,
    logout,
    showToast,
    setShowConfirm,
  } = useGTProduce();

  const [activeTab, setActiveTab] = useState<DashboardTab>("orders");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!showDashboard) return null;

  const handleDeleteOrder = (orderId: string) => {
    setShowConfirm({
      message: "Are you sure you want to delete this order?",
      onConfirm: () => {
        deleteOrder(orderId);
        showToast("Order deleted", "success");
      },
    });
  };

  const handleClearAllOrders = () => {
    setShowConfirm({
      message: "Are you sure you want to delete ALL orders? This cannot be undone.",
      onConfirm: () => {
        clearAllOrders();
        showToast("All orders cleared", "success");
      },
    });
  };

  const handleLogout = () => {
    logout();
    setShowDashboard(false);
    showToast("Logged out", "success");
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const sortedOrders = [...orders].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="overlay dashboard-overlay">
      <div className="dashboard-modal">
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <button className="close-btn" onClick={() => setShowDashboard(false)}>
            &times;
          </button>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === "orders" && (
            <div className="orders-tab">
              <div className="orders-header">
                <h3>Recent Orders ({orders.length})</h3>
                {orders.length > 0 && (
                  <button className="clear-all-btn" onClick={handleClearAllOrders}>
                    Clear All
                  </button>
                )}
              </div>

              {orders.length === 0 ? (
                <div className="no-orders">No orders yet</div>
              ) : (
                <div className="orders-list">
                  {sortedOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`order-card ${expandedOrder === order.id ? "expanded" : ""}`}
                    >
                      <div
                        className="order-summary"
                        onClick={() =>
                          setExpandedOrder(expandedOrder === order.id ? null : order.id)
                        }
                      >
                        <div className="order-info">
                          <span className="order-customer">{order.customerName}</span>
                          <span className="order-date">{formatDate(order.timestamp)}</span>
                        </div>
                        <div className="order-total">${order.total.toFixed(2)}</div>
                        <button
                          className="delete-order-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteOrder(order.id);
                          }}
                        >
                          &times;
                        </button>
                      </div>

                      {expandedOrder === order.id && (
                        <div className="order-details">
                          <table className="order-items-table">
                            <thead>
                              <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.name}</td>
                                  <td>{item.qty}</td>
                                  <td>${item.price.toFixed(2)}</td>
                                  <td>${(item.qty * item.price).toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="settings-tab">
              <div className="settings-section">
                <h3>Admin Actions</h3>
                <div className="settings-actions">
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>

              <div className="settings-section">
                <h3>Tips</h3>
                <ul className="tips-list">
                  <li>Click on item names or prices in the price sheet to edit them</li>
                  <li>Use the + button in category headers to add new items</li>
                  <li>Use the x button on items to delete them</li>
                  <li>Changes are saved automatically to Firebase</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
