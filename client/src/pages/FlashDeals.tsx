import { useEffect, useState } from "react";
import type { Product } from "../types";
import Loading from "../components/Loading";
import { Zap } from "lucide-react";
import ProductCard from "../components/ProductCard";
import api from "../config/api";
import toast from "react-hot-toast";

const FlashDeals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/products/flash-deals")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((error: any) => {
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch flash deals. Please try again.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ==================== HERO BANNER (SUPER GLOW) ==================== */}
      {/* Đổi sang gradient rực rỡ mang năng lượng mạnh mẽ, sáng sủa hơn */}
      <div className="relative overflow-hidden bg-gradient-to-tr from-orange-500 via-red-500 to-orange-800 text-white py-24 shadow-[inset_0_-20px_50px_rgba(0,0,0,0.2)]">
        {/* Cinematic Dust/Sparkle Particles Layer (Được làm sáng rực lên) */}
        <div className="absolute inset-0 pointer-events-none opacity-80">
          <div className="absolute top-12 left-[10%] w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse shadow-[0_0_12px_#fcd34d]" />
          <div className="absolute top-24 left-[30%] w-2 h-2 bg-white rounded-full animate-ping duration-1000 shadow-[0_0_15px_#fff]" />
          <div className="absolute top-8 left-[55%] w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse shadow-[0_0_10px_#fef08a]" />
          <div className="absolute top-28 left-[80%] w-2.5 h-2.5 bg-amber-300 rounded-full animate-pulse shadow-[0_0_14px_#fcd34d]" />
          <div className="absolute bottom-16 left-[18%] w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_12px_#facc15]" />
          <div className="absolute bottom-24 left-[45%] w-1.5 h-1.5 bg-white rounded-full animate-ping duration-750 shadow-[0_0_10px_#fff]" />
          <div className="absolute bottom-10 left-[75%] w-2 h-2 bg-amber-200 rounded-full animate-pulse shadow-[0_0_12px_#fef08a]" />
          <div className="absolute bottom-20 left-[92%] w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" />
        </div>

        {/* Ambient Overlay: Luồng sáng trắng/vàng quét ở giữa làm bừng sáng khung hình */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-400/20 blur-[160px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge phát sáng nhẹ */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/40 mb-6 shadow-[0_4px_15px_rgba(255,255,255,0.1)]">
            <Zap className="size-3.5 fill-yellow-300 text-yellow-300 animate-bounce" />
            <span className="text-xs font-bold tracking-widest text-white uppercase drop-shadow-md">
              Limited Time Only
            </span>
          </div>

          {/* Main Heading: Đổ bóng chữ glow cực mạnh bằng drop-shadow */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-white drop-shadow-[0_4px_20px_rgba(255,255,255,0.4)]">
            FLASH DEALS
          </h1>

          {/* Subtitle: Đổi sang màu trắng ngọc trai để dễ đọc trên nền sáng */}
          <p className="text-base md:text-xl text-amber-50 max-w-md mx-auto font-medium tracking-wide drop-shadow-sm opacity-90">
            Shocking discounts on top tier products. Claim yours before the
            countdown ends.
          </p>
        </div>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {products.length === 0 ? (
          /* Empty State */
          <div className="text-center py-24 bg-white border border-slate-100 rounded-2xl shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="size-8 text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              All Deals Claimed
            </h2>
            <p className="text-sm text-slate-400 mt-1.5 max-w-xs mx-auto">
              We're preparing the next batch of exclusive offers. Please check
              back later!
            </p>
          </div>
        ) : (
          /* Product Grid Section */
          <div>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase whitespace-nowrap">
                Live Offers Right Now
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-slate-200 via-transparent to-transparent" />
            </div>

            {/* Grid 5 Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.08)] rounded-xl"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashDeals;
