import { ArrowRightIcon, LeafIcon } from "lucide-react";
import { heroSectionData } from "../../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[480px] sm:min-h-[540px] mb-10 rounded-3xl flex items-center shadow-xs">
      {/* Ảnh nền phủ kín */}
      <img
        src={heroSectionData.hero_image}
        alt="Fresh organic groceries background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Lớp phủ Gradient có chiều sâu (Đậm ở trái để nổi bật chữ, mờ dần sang phải) */}
      <div className="absolute left-0 top-0 h-full w-4/5 bg-gradient-to-r from-black/70 via-black/15 to-transparent z-10" />

      {/* Nội dung chính */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 w-full z-10">
        <div className="max-w-xl">
          {/* Subtitle - Tagline sạch sẽ */}
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <LeafIcon className="size-3.5 fill-emerald-400/10" /> Farm Fresh &
            Organic
          </span>

          {/* Tiêu đề chính sử dụng Font Serif sang trọng */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.15] mb-5">
            <span className="text-app-orange">Fresh</span> Groceries, <br />
            Delivered Fast
          </h1>

          {/* Đoạn mô tả ngắn gọn, dễ đọc */}
          <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-md font-sans">
            {heroSectionData.description}
          </p>

          {/* Cụm nút bấm cân đối */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Nút Primary */}
            <Link
              to="/products"
              className="px-8 py-3.5 bg-orange-400 text-white font-medium rounded-full hover:bg-app-orange-dark shadow-sm hover:shadow-md transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              Shop Now
              <ArrowRightIcon className="size-4" />
            </Link>

            {/* Nút Secondary (Dạng kính mờ tối giản) */}
            <Link
              to="/products"
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full transition-all border border-white/20 flex items-center gap-2 active:scale-[0.98]"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
