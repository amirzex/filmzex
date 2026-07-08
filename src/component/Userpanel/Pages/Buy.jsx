import { useState } from "react";
import {
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiCreditCard,
  FiMapPin,
  FiClock,
} from "react-icons/fi";

const Buy = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Inception",
      price: 24.99,
      quantity: 1,
      image: "🎬",
      category: "Movie",
      date: "2024-02-15",
    },
    {
      id: 2,
      title: "The Dark Knight Trilogy",
      price: 49.99,
      quantity: 1,
      image: "🎬",
      category: "Movie Collection",
      date: "2024-02-14",
    },
    {
      id: 3,
      title: "Premium Subscription",
      price: 99.99,
      quantity: 1,
      image: "⭐",
      category: "Membership",
      date: "2024-02-10",
    },
    {
      id: 4,
      title: "Movie Tickets - 5 Pack",
      price: 39.99,
      quantity: 2,
      image: "🎟️",
      category: "Tickets",
      date: "2024-02-08",
    },
  ]);

  const [purchaseHistory, setPurchaseHistory] = useState([
    {
      id: 101,
      title: "Interstellar",
      price: 19.99,
      date: "2024-02-01",
      status: "Delivered",
      image: "🎬",
    },
    {
      id: 102,
      title: "Annual Subscription",
      price: 199.99,
      date: "2024-01-15",
      status: "Active",
      image: "⭐",
    },
    {
      id: 103,
      title: "Movie Marathon Pass",
      price: 29.99,
      date: "2024-01-10",
      status: "Expired",
      image: "🎟️",
    },
  ]);

  const [activeTab, setActiveTab] = useState("cart"); // "cart" or "history"

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="w-full p-3 sm:p-5 bg-gray-800/40 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Shopping & Purchases</h1>
        <div className="flex items-center gap-2 text-blue-400">
          <FiShoppingCart className="text-2xl" />
          <span className="text-xl">{cartItems.length} Items</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 sm:gap-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("cart")}
          className={`px-3 sm:px-6 py-3 text-base sm:text-lg font-medium transition-all duration-300 relative ${
            activeTab === "cart"
              ? "text-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Shopping Cart
          {activeTab === "cart" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-3 sm:px-6 py-3 text-base sm:text-lg font-medium transition-all duration-300 relative ${
            activeTab === "history"
              ? "text-blue-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Purchase History
          {activeTab === "history" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"></div>
          )}
        </button>
      </div>

      {activeTab === "cart" ? (
        /* Shopping Cart View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4 sm:p-6">
              <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                Cart Items ({cartItems.length})
              </h2>

              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/40 transition-all"
                    >
                      {/* Top row: Image + Details + (mobile) Remove */}
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        {/* Image/Icon */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl sm:text-3xl">
                          {item.image}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold truncate">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-400 truncate">
                            {item.category}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-400">
                            Added: {item.date}
                          </p>
                        </div>

                        {/* Remove Button (mobile only) */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="sm:hidden shrink-0 text-gray-400 hover:text-red-500 transition-all"
                          aria-label="Remove item"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>

                      {/* Bottom row: Price + Quantity + (desktop) Remove */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                        {/* Price */}
                        <div className="text-white font-bold whitespace-nowrap">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 shrink-0 bg-gray-700 rounded-lg flex items-center justify-center text-white hover:bg-gray-600 transition-all"
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className="text-white w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 shrink-0 bg-gray-700 rounded-lg flex items-center justify-center text-white hover:bg-gray-600 transition-all"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>

                        {/* Remove Button (desktop only) */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="hidden sm:block shrink-0 text-gray-400 hover:text-red-500 transition-all"
                          aria-label="Remove item"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <FiShoppingCart className="text-5xl text-gray-600 mb-4" />
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                  <p className="text-gray-500 text-sm">
                    Start shopping to add items
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4 sm:p-6 lg:sticky lg:top-5">
              <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (10%)</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-gray-700">
                  <span>Total</span>
                  <span className="text-blue-400">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2">
                <FiCreditCard />
                <span>Proceed to Checkout</span>
              </button>

              {/* Payment Methods */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  We accept all major credit cards
                </p>
                <div className="flex justify-center gap-2 mt-2">
                  <span className="text-2xl">💳</span>
                  <span className="text-2xl">💵</span>
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Purchase History View */
        <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
            Purchase History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {purchaseHistory.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="hover:bg-gray-700/30 transition-all"
                  >
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
                        {purchase.image}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">
                        {purchase.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-300">
                        <FiClock size={14} />
                        <span>{purchase.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-bold">
                        ${purchase.price}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          purchase.status === "Delivered"
                            ? "bg-green-600/30 text-green-300"
                            : purchase.status === "Active"
                              ? "bg-blue-600/30 text-blue-300"
                              : "bg-gray-600/30 text-gray-300"
                        }`}
                      >
                        {purchase.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-blue-500 transition-all">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Total Spent</p>
              <p className="text-2xl font-bold text-white">$249.97</p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Active Items</p>
              <p className="text-2xl font-bold text-white">1</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
