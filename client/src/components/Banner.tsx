import { TruckIcon, XIcon } from "lucide-react";
import { useState } from "react";

const Banner = () => {
  const [bannerVisible, setBannerVisible] = useState(() => {
    return sessionStorage.getItem("banner_dismissed") !== "true";
  });

  const dismissBanner = () => {
    setBannerVisible(false);
    sessionStorage.setItem("banner_dismissed", "true");
  };

  if (!bannerVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 text-white text-xs sm:text-sm relative overflow-hidden border-b border-emerald-500/10 shadow-xs animate-fade-in">
      {/* Hiệu ứng ánh sáng ngầm phía sau (Glow Effect) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.15),transparent_45%)]" />

      <div className="max-w-7xl mx-auto px-9 py-1 flex items-center justify-center relative z-10">
        {/* Nội dung chính */}
        <div className="flex items-center gap-2.5 tracking-wide">
          {/* Badge điểm nhấn */}
          <span className="hidden sm:inline-flex items-center bg-emerald-400/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border border-emerald-400/30">
            Offer
          </span>

          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 shadow-inner">
            <TruckIcon className="size-4 text-emerald-300 animate-pulse" />
          </div>

          <p className="font-medium text-emerald-50/95">
            Free shipping on orders over{" "}
            <span className="font-bold text-emerald-300 bg-emerald-400/10 px-1 py-0.5 rounded">
              $20
            </span>
          </p>
        </div>

        {/* Khoảng trống giữ chỗ cho mobile để text không bị đè bởi nút close */}
        <div className="w-6 sm:hidden" />
      </div>

      {/* Nút Đóng (Tối ưu vùng bấm lớn hơn nhưng icon vẫn nhỏ gọn) */}
      <button
        onClick={dismissBanner}
        aria-label="Close banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/0 hover:bg-white/10 text-emerald-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
      >
        <XIcon className="size-4 opacity-75 hover:opacity-100" />
      </button>
    </div>
  );
};

export default Banner;
