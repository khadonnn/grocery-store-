import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const STORAGE_KEY = "i18n_lng";
const SUPPORTED_LANGS = ["en", "vi"];

// Gets the initial language (persisted in localStorage) or defaults to "en".
const getInitialLanguage = () => {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved && SUPPORTED_LANGS.includes(saved) ? saved : "en";
};

/**
 * Translation resources for the app UI.
 * `en` is the reference language; `vi` mirrors every key.
 * Product / order / user data is intentionally NOT part of these resources.
 */
const resources = {
  en: {
    translation: {
      home: {
        hero: {
          tagline: "Farm Fresh & Organic",
          title: {
            fresh: "Fresh",
            groceries: "Groceries,",
            deliveredFast: "Delivered Fast",
          },
          description:
            "Fresh, organic groceries delivered from local farms to your doorstep. Quality you can expect, convenience you deserve.",
          imageAlt: "Fresh organic groceries background",
          shopNow: "Shop Now",
          browseCategories: "Browse Categories",
          features: {
            freeDelivery: {
              title: "Free Delivery",
              description: "Orders over $20",
            },
            organic: {
              title: "100% Organic",
              description: "Certified products",
            },
            sameDay: {
              title: "Same Day",
              description: "Express delivery",
            },
            securePay: {
              title: "Secure Pay",
              description: "Safe checkout",
            },
          },
        },
        categories: {
          title: "Explore Categories",
          subtitle: "Browse our wide selection of fresh and quality products.",
        },
        popularProducts: {
          title: "Popular Products",
          subtitle: "Discover our most loved items.",
          viewAll: "View All",
        },
      },

      navbar: {
        home: "Home",
        products: "Products",
        deals: "Deals",
        searchPlaceholder: "Search products...",
        viewCart: "View cart",
        language: "Change language",
        signIn: "Sign In",
        myOrders: "My Orders",
        myAddress: "My Address",
        adminPanel: "Admin Panel",
        logOut: "Log Out",
      },

      categories: {
        fruitsVegetables: "Fruits & Vegetables",
        personalCare: "Personal Care",
        pantryStaples: "Pantry Staples",
        bakery: "Bakery",
        beverages: "Beverages",
        meatSeafood: "Meat & Seafood",
        snacks: "Snacks",
        frozenFoods: "Frozen Foods",
        babyCare: "Baby Care",
        dairyEggs: "Dairy & Eggs",
      },

      appPromo: {
        title: "Get fresh groceries in minutes",
        description:
          "Download the GroceryStore app for exclusive deals, real-time tracking, and the freshest selection delivered right to your door.",
        appStore: "App Store",
        googlePlay: "Google Play",
        imageAlt: "Delivery",
      },

      newsletter: {
        title: "Subscribe to Our Newsletter",
        description: "Get weekly updates on fresh produce and special offers.",
        emailPlaceholder: "Enter your email",
        subscribe: "Subscribe",
      },

      footer: {
        brand: {
          description:
            "Bringing fresh, organic groceries straight from local farms to your doorstep. Nourish your home with Earth's finest.",
        },
        quickLinks: {
          title: "Quick Links",
          allProducts: "All Products",
          flashDeals: "Flash Deals",
          trackOrder: "Track Order",
          deliveryPartner: "Delivery Partner",
        },
        customerService: {
          title: "Customer Service",
          myAccount: "My Account",
          orderHistory: "Order History",
          addresses: "Addresses",
          helpCenter: "Help Center",
        },
        contact: { title: "Contact Us" },
        bottom: {
          privacyPolicy: "Privacy Policy",
          termsOfService: "Terms of Service",
          copyright: "© 2026 Greatstack. All rights reserved.",
        },
      },
    },
  },

  vi: {
    translation: {
      home: {
        hero: {
          tagline: "Tươi từ Nông Trại & Hữu Cơ",
          title: {
            fresh: "Thực phẩm tươi",
            groceries: "sạch,",
            deliveredFast: "Giao siêu tốc",
          },
          description:
            "Thực phẩm tươi, hữu cơ được giao thẳng từ nông trại địa phương đến tận cửa nhà bạn. Chất lượng bạn có thể nhận thấy, tiện lợi bạn xứng đáng được hưởng.",
          imageAlt: "Hình nền thực phẩm tươi hữu cơ",
          shopNow: "Mua ngay",
          browseCategories: "Xem danh mục",
          features: {
            freeDelivery: {
              title: "Giao hàng miễn phí",
              description: "Đơn hàng trên $20",
            },
            organic: {
              title: "100% Hữu cơ",
              description: "Sản phẩm đạt chứng nhận",
            },
            sameDay: {
              title: "Giao trong ngày",
              description: "Giao hàng hỏa tốc",
            },
            securePay: {
              title: "Thanh toán an toàn",
              description: "Thanh toán bảo mật",
            },
          },
        },
        categories: {
          title: "Khám phá danh mục",
          subtitle:
            "Khám phá những loại sản phẩm tươi ngon và chất lượng của chúng tôi.",
        },
        popularProducts: {
          title: "Sản phẩm phổ biến",
          subtitle: "Khám phá những sản phẩm được yêu thích nhất.",
          viewAll: "Xem tất cả",
        },
      },

      navbar: {
        home: "Trang chủ",
        products: "Sản phẩm",
        deals: "Ưu đãi",
        searchPlaceholder: "Tìm kiếm sản phẩm...",
        viewCart: "Xem giỏ hàng",
        language: "Đổi ngôn ngữ",
        signIn: "Đăng nhập",
        myOrders: "Đơn hàng của tôi",
        myAddress: "Địa chỉ của tôi",
        adminPanel: "Bảng quản trị",
        logOut: "Đăng xuất",
      },

      categories: {
        fruitsVegetables: "Trái cây & Rau củ",
        personalCare: "Chăm sóc cá nhân",
        pantryStaples: "Nhu yếu phẩm",
        bakery: "Bánh nướng",
        beverages: "Đồ uống",
        meatSeafood: "Thịt & Hải sản",
        snacks: "Đồ ăn vặt",
        frozenFoods: "Thực phẩm đông lạnh",
        babyCare: "Chăm sóc trẻ sơ sinh",
        dairyEggs: "Sữa & Trứng",
      },

      appPromo: {
        title: "Nhận thực phẩm tươi chỉ trong vài phút",
        description:
          "Tải ứng dụng GroceryStore để nhận ưu đãi độc quyền, theo dõi giao hàng theo thời gian thực và lựa chọn sản phẩm tươi ngon nhất giao tận cửa.",
        appStore: "App Store",
        googlePlay: "Google Play",
        imageAlt: "Giao hàng",
      },

      newsletter: {
        title: "Đăng ký nhận bản tin của chúng tôi",
        description:
          "Nhận cập nhật hằng tuần về nông sản tươi và ưu đãi đặc biệt.",
        emailPlaceholder: "Nhập email của bạn",
        subscribe: "Đăng ký",
      },

      footer: {
        brand: {
          description:
            "Mang thực phẩm tươi, hữu cơ thẳng từ nông trại địa phương đến tận cửa nhà bạn. Nuôi dưỡng ngôi nhà bạn bằng những tinh túy nhất của Trái Đất.",
        },
        quickLinks: {
          title: "Liên kết nhanh",
          allProducts: "Tất cả sản phẩm",
          flashDeals: "Ưu đãi chớp nhoáng",
          trackOrder: "Theo dõi đơn hàng",
          deliveryPartner: "Đối tác giao hàng",
        },
        customerService: {
          title: "Chăm sóc khách hàng",
          myAccount: "Tài khoản của tôi",
          orderHistory: "Lịch sử đơn hàng",
          addresses: "Địa chỉ",
          helpCenter: "Trung tâm trợ giúp",
        },
        contact: { title: "Liên hệ với chúng tôi" },
        bottom: {
          privacyPolicy: "Chính sách bảo mật",
          termsOfService: "Điều khoản sử dụng",
          copyright: "© 2026 Greatstack. Bảo lưu mọi quyền.",
        },
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGS,
    nonExplicitSupportedLngs: true, // "vi-VN" also matches "vi"
    interpolation: {
      escapeValue: false, // react already safes from XSS
    },
  });

// Persist the selected language so switching survives page reloads.
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lng);
  }
});

export default i18n;
