import {
  ArrowUpRightIcon,
  Check,
  ChevronDown,
  FishSymbol,
  Languages,
  LogOut,
  MapPinIcon,
  MenuIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingCart,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// Các ngôn ngữ có sẵn cho dropdown chuyển ngôn ngữ
const LANGUAGE_OPTIONS = [
  { code: "en", label: "English", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "vi", label: "Tiếng Việt", flag: "\u{1F1FB}\u{1F1F3}" },
] as const;

const Navbar = () => {
  // const user: any = {
  //   name: "Kha don",
  //   email: "khadon@example.com",
  //   isAdmin: true,
  // };
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, setIsCartOpen } = useCart();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };
  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/login");
  };
  // Ngôn ngữ hiện tại (xử lý cả trường hợp "en-US", "vi-VN")
  const currentLang = i18n.language?.toLowerCase().startsWith("vi")
    ? "vi"
    : "en";
  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-app-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
        {/* 1. LOGO: Đứng độc lập bên trái */}
        <Link
          to="/"
          className="items-center gap-1 text-[22px] font-medium shrink-0 flex text-nowrap"
        >
          <FishSymbol size={30} /> GroceryStore
        </Link>

        {/* 2. CỤM PHẢI: Gộp cả Search và Menu vào đây để chúng dính sát nhau */}
        <div className="flex flex-1 items-center justify-end gap-6 sm:gap-8">
          {/* Cụm Menu Links nằm sát ngay sau ô Search */}
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-600 shrink-0">
            <Link to="/" className="hover:text-zinc-900 transition-colors">
              {t("navbar.home")}
            </Link>
            <Link
              to="/products"
              className="hover:text-zinc-900 transition-colors"
            >
              {t("navbar.products")}
            </Link>
            <Link to="/deals" className="text-app-orange font-medium">
              {t("navbar.deals")}
            </Link>
          </div>
          {/* Ô Search bên trong cụm phải */}
          <form
            className="hidden sm:block relative w-full max-w-xs text-sm"
            onSubmit={handleSearch}
          >
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 size-4" />
            <input
              type="text"
              placeholder={t("navbar.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-app-orange focus:border-transparent transition"
            />
          </form>

          {/* right actions */}
          {/* right actions */}
          <div className="flex items-center gap-3">
            {/* Nút chuyển ngôn ngữ (EN / VI) */}
            <div className="relative">
              <button
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors focus:outline-none"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                aria-label={t("navbar.language")}
              >
                <Languages className="size-4 text-zinc-500" />
                <span className="text-xs font-semibold uppercase text-zinc-700">
                  {currentLang}
                </span>
                <ChevronDown className="size-3.5 text-zinc-400" />
              </button>

              {langMenuOpen && (
                <>
                  {/* Lớp overlay trong suốt bấm ra ngoài để tự đóng */}
                  <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setLangMenuOpen(false)}
                  />

                  {/* Dropdown chọn ngôn ngữ */}
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-app-border py-1 z-50 animate-fade-in">
                    {LANGUAGE_OPTIONS.map((option) => (
                      <button
                        key={option.code}
                        onClick={() => handleLanguageChange(option.code)}
                        className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm transition-colors ${
                          currentLang === option.code
                            ? "text-app-green font-semibold"
                            : "text-zinc-700 hover:bg-app-cream/60"
                        }`}
                      >
                        <span className="text-base leading-none">{option.flag}</span>
                        <span className="flex-1 text-left">{option.label}</span>
                        {currentLang === option.code && (
                          <Check className="size-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thẻ Giỏ hàng */}
            <button
              className="relative p-2 rounded-xl"
              onClick={() => setIsCartOpen(true)}
              aria-label={t("navbar.viewCart")}
            >
              <ShoppingCart className="size-5 text-zinc-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-app-orange text-white rounded-full px-1.5 py-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Cụm User Profile & Mobile Menu */}
            <div className="relative">
              <div className="flex items-center gap-2">
                {user ? (
                  // Nếu ĐÃ ĐĂNG NHẬP -> Hiện Avatar điều khiển mở menu
                  <button
                    className="flex items-center gap-2 p-2 focus:outline-none"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <div className="size-7 rounded-full bg-green-950 text-white flex items-center justify-center font-medium text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown className="size-4 text-zinc-600 hidden md:block" />
                  </button>
                ) : (
                  // Nếu CHƯA ĐĂNG NHẬP -> Hiện nút Sign In
                  <Link
                    to="/login"
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-900 rounded-full hover:bg-green-950 transition-colors"
                  >
                    <UserIcon size={16} /> {t("navbar.signIn")}
                  </Link>
                )}

                {/* Nút Hamburger Menu dành riêng cho thiết bị Mobile (Ẩn trên PC) */}
                <button
                  className="block md:hidden p-1 text-zinc-600 focus:outline-none"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  {userMenuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
                </button>
              </div>

              {/* DROPDOWN MENU PANEL: Đưa ra ngoài độc lập, kích hoạt khi userMenuOpen === true */}
              {userMenuOpen && (
                <>
                  {/* Lớp overlay trong suốt bọc toàn màn hình để bấm ra ngoài tự đóng menu */}
                  <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setUserMenuOpen(false)}
                  />

                  {/* Hộp nội dung chi tiết Menu */}
                  <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                    {user && (
                      <div className="px-4 py-2 border-b border-app-border mb-1">
                        <p className="text-sm font-semibold text-zinc-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    )}

                    {/* Các điều hướng link dùng chung */}
                    {!user && (
                      <Link
                        to="/login"
                        className="dropdown-link"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <UserIcon size={16} /> {t("navbar.signIn")}
                      </Link>
                    )}
                    {user && (
                      <Link
                        to="/orders"
                        className="dropdown-link"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <UserIcon size={16} /> {t("navbar.myOrders")}
                      </Link>
                    )}
                    {user && (
                      <Link
                        to="/addresses"
                        className="dropdown-link"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <MapPinIcon size={16} /> {t("navbar.myAddress")}
                      </Link>
                    )}

                    {/* Các điều hướng chỉ hiển thị trên Mobile */}
                    <Link
                      to="/products"
                      className="dropdown-link "
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <ArrowUpRightIcon size={16} /> {t("navbar.products")}
                    </Link>
                    <Link
                      to="/deals"
                      className="dropdown-link "
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <ArrowUpRightIcon size={16} /> {t("navbar.deals")}
                    </Link>

                    {/* Quyền Admin */}
                    {user?.isAdmin && (
                      <Link
                        to="/admin/products"
                        className="dropdown-link"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <ShieldIcon
                          size={16}
                          className="text-app-orange-dark"
                        />
                        <span className="text-app-orange-dark font-medium">
                          {t("navbar.adminPanel")}
                        </span>
                      </Link>
                    )}

                    {/* Nút Đăng xuất */}
                    {user && (
                      <div className="border-t border-app-border mt-1.5 pt-1.5">
                        <button
                          className="flex items-center gap-3 px-4 py-2 text-app-error hover:bg-red-50 w-full transition-colors text-sm font-medium"
                          onClick={handleLogout}
                        >
                          <LogOut size={16} /> {t("navbar.logOut")}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
