import { useEffect, useState } from "react";
// import { dummyProducts } from "../../assets/assets";
import type { Product } from "../../types";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProductCard from "../ProductCard";
import api from "../../config/api";

const PopularProducts = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .get("/products?sort=rating")
      .then(({ data }) => {
        setProducts(data.products);
      })
      .catch((err) => {
        console.error("Failed to fetch popular products:", err);
      });
  }, []);

  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="">
            <h2 className="text-2xl font-semibold">{t("home.popularProducts.title")}</h2>
            <p className="text-sm text-app-text-light mt-1">
              {t("home.popularProducts.subtitle")}
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm font-medium text-app-orange hover:text-app-orange-dark transition-colors"
          >
            {t("home.popularProducts.viewAll")}
            <ArrowRightIcon className="size-4 inline-block ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8 ">
          {products.slice(0, 10).map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default PopularProducts;
