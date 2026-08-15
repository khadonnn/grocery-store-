import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categoriesData } from "../../assets/assets";

// Map category slug -> translation key (slug không thay đổi)
const CATEGORY_NAME_KEYS: Record<string, string> = {
  "fruits-vegetables": "categories.fruitsVegetables",
  "personal-care": "categories.personalCare",
  "pantry-staples": "categories.pantryStaples",
  bakery: "categories.bakery",
  beverages: "categories.beverages",
  "meat-seafood": "categories.meatSeafood",
  snacks: "categories.snacks",
  "frozen-foods": "categories.frozenFoods",
  "baby-care": "categories.babyCare",
  "dairy-eggs": "categories.dairyEggs",
};

const HomeCategories = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="">
          <h2 className="text-2xl font-bold mb-4">{t("home.categories.title")}</h2>
          <p className="text-sm text-app-text-light mt-1">
            {t("home.categories.subtitle")}
          </p>
        </div>
      </div>
      <div className="flex items-center mt-8 overflow-x-scroll no-scrollbar">
        {categoriesData.map((cat) => {
          const categoryName = t(CATEGORY_NAME_KEYS[cat.slug], {
            defaultValue: cat.name,
          });

          return (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group flex flex-col items-center gap-3 p-4"
            >
              <div className="size-18 sm:size-26 sm:p-2 rounded-2xl overflow-hidden bg-orange-100 group-hover:ring-2 ring-orange-300/75 transition-all">
                <img
                  src={cat.image}
                  alt={categoryName}
                  className="w-full h-32 object-contain rounded-full transition-all"
                />
              </div>
              <span className="text-xs font-semibold mt-2 text-zinc-600 text-center leading-tight">
                {categoryName}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default HomeCategories;
