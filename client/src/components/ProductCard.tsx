import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { Plus, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const { addToCart } = useCart();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-300 group animate-fade-in cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          className="w-full h-full object-cover p-4 group-hover:p-2 transition-all duration-300"
          src={product.image}
          alt={product.name}
        />
        {/* badge */}
        <div className="">
          {product.discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>
      {/* info */}
      <div className="p-3.5 text-zinc-700">
        <h3 className="text-sm leading-snug mb-1.5 line-clamp-2">
          {product.name}
        </h3>
        {/* rating   */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 text-yellow-500 mb-1">
            <Star className="size-3 text-app-warning fill-app-warning" />
            <span className="text-xs font-medium">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-app-text-light">
              ({product.reviewCount})
            </span>
          </div>
        )}
        {/* price +add */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 truncate">
            <span className="text-base font-medium ">
              {currency}
              {product.price.toFixed(1)}
            </span>
            <span className="text-xs text-app-text-light block">
              / {product.unit}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-app-text-light line-through ml-1.5">
                {currency}
                {product.originalPrice.toFixed(1)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="size-7 rounded-full bg-app-orange text-white flex-center shrink-0 hover:bg-app-orange-dark transition-colors active:scale-95"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
