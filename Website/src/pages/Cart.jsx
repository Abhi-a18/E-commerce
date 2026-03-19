import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { darkMode } = useOutletContext();

  const convertToINR = (usd) => {
    const rate = 83;
    return (usd * rate).toLocaleString("en-IN");
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Cart is Empty!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div
      className="min-h-screen px-3 sm:px-4 py-6"
      style={{ backgroundColor: darkMode ? "#222" : "#f5f7fa" }}
    >
      <div className="w-full max-w-[1100px] mx-auto">

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-6 text-center">
          Your Cart
        </h2>

        {/* Empty */}
        {items.length === 0 ? (
          <h3 className="text-center text-gray-500">Cart is Empty</h3>
        ) : (
          <>
            {/* Items */}
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex gap-4 p-3 sm:p-4 rounded-lg shadow mb-4 ${
                  darkMode ? "bg-[#2c2c2c] text-white" : "bg-white text-black"
                }`}
              >
                {/* ✅ IMAGE FIX */}
                <div className="w-[100px] h-[100px] flex items-center justify-center bg-gray-100 rounded">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="max-h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between w-full">

                  {/* Title */}
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Price: ₹{convertToINR(item.price)}
                    </p>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-wrap items-center justify-between gap-2 my-2">
                    
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Total */}
                  <p className="font-bold text-red-500 text-sm sm:text-base">
                    Total: ₹{convertToINR(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            <hr className="my-6 border-gray-400" />

            {/* Grand Total */}
            <h2
              className={`text-lg sm:text-xl font-bold text-center ${
                darkMode ? "text-white" : "text-red-600"
              }`}
            >
              Grand Total: ₹{convertToINR(totalPrice)}
            </h2>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => dispatch(clearCart())}
                className="w-full sm:w-auto px-6 py-2 bg-gray-700 text-white rounded"
              >
                Clear Cart
              </button>

              <button
                onClick={handleCheckout}
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;