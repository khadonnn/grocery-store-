import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import type { Product } from "../types";
// Đã sửa: Xóa PlusIcon bị trùng và thêm ShoppingCartIcon vào danh sách import
import {
  ArrowLeftIcon,
  HomeIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
  ShoppingCartIcon,
  ArrowRightIcon,
} from "lucide-react";
import DummyReviewsSection from "../components/DummyReviewsSection";
import ProductCard from "../components/ProductCard";
import api from "../config/api";

const ProductPage = () => {
  const currency = import.meta.env.VITE_APP_CURRENCY || "$";
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [localquantity, setLocalquantity] = useState(1);

  console.log(updateQuantity, removeFromCart);

  useEffect(() => {
    setLoading(true);
    setLocalquantity(1);
    window.scrollTo(0, 0);

    api
      .get(`/products/${id}`)
      .then(({ data }) => {
        setProduct(data.product);
        return api.get(
          `/products?category=${data.product.category}&exclude=${data.product.id}`,
        );
      })
      .then(({ data }) => {
        setRelatedProducts(
          data.products.filter((p: Product) => p.id !== product?.id),
        );
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!product) return null;

  const cartItem = items.find((item) => item.product.id === product.id);
  const inCart = !!cartItem;
  const displayQuantity = inCart ? cartItem!.quantity : localquantity;
  const categoryLabel = product.category.replace(/-/g, " ");

  const handleMinus = () => {
    if (inCart) {
      if (cartItem!.quantity > 1) {
        updateQuantity(product.id, cartItem!.quantity - 1);
      } else {
        removeFromCart(product.id);
      }
    } else {
      setLocalquantity(Math.max(1, localquantity - 1));
    }
  };
  const handlePlus = () => {
    if (inCart) {
      updateQuantity(product.id, cartItem!.quantity + 1);
    } else {
      setLocalquantity(localquantity + 1);
    }
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link to="/" className="hover:text-app-green transition-colors">
            <HomeIcon className="size-4" />
          </Link>
          <span>/</span>
          <Link
            to="/products"
            className="hover:text-app-green transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-app-green transition-colors capitalize"
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium truncate max-w-50">
            {product.name}
          </span>
        </nav>

        {/* back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-1.5 text-sm text-app-text-light hover:text-app-green transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          <span>Back</span>
        </button>

        {/* product details */}
        <div className="bg-white/50 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Khối bên trái: Hình ảnh */}
            <div className="relative flex items-center justify-center p-8 md:p-12 max-h-90 md:min-h-120">
              <img
                className="object-contain max-h-90 w-auto"
                src={product.image}
                alt={product.name}
              />
              <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">
                {product.isOrganic && (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-green text-white rounded-full">
                    <LeafIcon className="size-4" /> Organic
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="px-2.5 py-1 text-xs font-semibold bg-app-orange text-white rounded-full">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
            {/* Khối bên phải: Thông tin chi tiết */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <span className="text-xs font-medium text-app-text-light tracking-wider mb-2 capitalize">
                {categoryLabel}
              </span>
              <h1 className="text-2xl md:text-3xl font-medium text-app-green mb-3">
                {product.name}
              </h1>

              {/* phần đánh giá ngôi sao */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(product.rating!)
                            ? "text-app-warning fill-app-warning"
                            : "text-app-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-app-text-light ml-1">
                    {product.rating}
                  </span>
                  <span className="text-sm text-app-text-light">
                    ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}

              {/* price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl font-bold text-slate-900">
                  {currency}
                  {product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-app-text-light line-through ml-2">
                    {currency}
                    {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* description */}
              <p className="text-sm text-app-text-light leading-relaxed mb-6">
                {product.description}
              </p>

              {/* stock status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-app-success text-sm font-medium">
                    ✔ In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-app-red text-sm font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* quantity + add to cart */}
              <div className="flex items-center gap-3">
                {/* quantity input toggle */}
                <div className="flex items-center border border-app-border rounded-xl overflow-hidden">
                  <button
                    onClick={handleMinus}
                    className="p-3 hover:bg-app-cream transition-colors"
                  >
                    <MinusIcon className="size-4" />
                  </button>
                  <span className="px-4 py-2 text-sm font-medium select-none">
                    {displayQuantity}
                  </span>
                  <button
                    onClick={handlePlus}
                    className="p-3 hover:bg-app-cream transition-colors"
                  >
                    <PlusIcon className="size-4" />
                  </button>
                </div>

                {/* Đã sửa: Bọc chuẩn đóng/mở thẻ button và icon giỏ hàng tự đóng /> */}
                <button
                  onClick={() => {
                    if (!inCart) addToCart(product, localquantity);
                  }}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${
                    inCart
                      ? "bg-app-cream text-app-green border border-app-green"
                      : "bg-app-orange text-white hover:bg-app-orange-dark"
                  }`}
                >
                  <ShoppingCartIcon className="size-4" />
                  <span>{inCart ? "In Cart" : "Add to Cart"}</span>
                </button>
              </div>
            </div>{" "}
            {/* Kết thúc Khối bên phải */}
          </div>
        </div>
        {/* customer reviews */}
        {product.reviewCount > 0 && <DummyReviewsSection product={product} />}

        {/* related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 mb-44">
            <div className="flex items-center justify-between mb-6">
              <div className="">
                <h2 className="text-2xl font-semibold text-app-green">
                  Related Products
                </h2>
                <p className="text-sm text-app-text-light mt-1">
                  More from {categoryLabel}
                </p>
              </div>
              <Link
                to={`/products?category=${product.category}`}
                className="text-sm text-app-green hover:underline flex items-center gap-1"
              >
                View All <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
              {relatedProducts.slice(0, 5).map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
