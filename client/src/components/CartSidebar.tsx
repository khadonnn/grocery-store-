import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

const CartSidebar = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const {
    items,
    updateQuantity,
    removeFromCart,
    cartTotal,
    setIsCartOpen,
    isCartOpen,
  } = useCart();
  const navigate = useNavigate();

  // ❌ XÓA DÒNG: if (!isCartOpen) return null; (Để hiệu ứng đóng có thể chạy được)

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;

  return (
    <>
      {/* 1. Lớp nền mờ - Điều khiển bằng pointer-events và opacity để ẩn hiện mượt mà */}
      <div
        className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* 2. Thanh Sidebar - Dùng chuyển động từ dịch phải (translate-x-full) sang vị trí chuẩn (translate-x-0) */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[100] shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between gap-4 p-5 border-b border-app-border">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <span className="px-2 py-0.5 text-xs font-semibold bg-app-cream rounded-full">
              {items.length} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="ml-auto p-2 rounded-xl text-gray-500 hover:bg-app-cream transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* cart items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBagIcon className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold">Your cart is empty</h3>
            </div>
          ) : (
            items.map((item) => (
              <div
                className="flex gap-3 bg-app-cream/60 rounded-xl p-3"
                key={item.product.id}
              >
                <img
                  className="size-16 rounded-lg object-cover shrink-0"
                  src={item.product.image}
                  alt={item.product.name}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-app-green truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-lg font-bold">
                    {currency}
                    {item.product.price.toFixed(2)}/{item.product.unit}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-app-cream text-app-green hover:bg-app-green hover:text-white transition-colors"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-app-cream text-app-green hover:bg-app-green hover:text-white transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {currency}
                        {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-app-border space-y-3 bg-white">
            <div className="flex justify-between text-sm">
              <span className="text-app-text-light">Subtotal</span>
              <span className="font-medium">
                {currency}
                {cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-app-text-light">Delivery Fee</span>
              <span className="font-medium">
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-semibold">Free</span>
                ) : (
                  <span>
                    {currency}
                    {deliveryFee.toFixed(2)}
                  </span>
                )}
              </span>
            </div>
            {deliveryFee > 0 && (
              <p className="text-xs text-center text-gray-400">
                Free delivery for orders over {currency}20.00
              </p>
            )}
            <div className="flex justify-between text-base font-semibold border-t border-app-border pt-3">
              <span>Total</span>
              <span>
                {currency}
                {(cartTotal + deliveryFee).toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
                window.scrollTo(0, 0);
              }}
              className="w-full py-3 bg-app-orange text-white font-semibold rounded-xl hover:bg-app-orange-dark transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              Proceed to Checkout
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
