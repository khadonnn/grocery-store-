import { useTranslation } from "react-i18next";
import { heroSectionData } from "../../assets/assets";

// Keys giữ đúng thứ tự của heroSectionData.hero_features trong assets.ts
const FEATURE_TRANSLATION_KEYS: Array<{
  titleKey: string;
  descriptionKey: string;
}> = [
  {
    titleKey: "home.hero.features.freeDelivery.title",
    descriptionKey: "home.hero.features.freeDelivery.description",
  },
  {
    titleKey: "home.hero.features.organic.title",
    descriptionKey: "home.hero.features.organic.description",
  },
  {
    titleKey: "home.hero.features.sameDay.title",
    descriptionKey: "home.hero.features.sameDay.description",
  },
  {
    titleKey: "home.hero.features.securePay.title",
    descriptionKey: "home.hero.features.securePay.description",
  },
];

const Features = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-5 border border-app-border/80 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {heroSectionData.hero_features.map((feature, i) => (
            <div
              key={i}
              /* Thay đổi ở đây: Chuyển sang hàng ngang (flex-row), đổi items-start thành items-center */
              className="group flex items-center gap-3.5 p-3 rounded-2xl border border-transparent hover:border-app-border/60 hover:bg-app-cream/40 transition-all duration-300"
            >
              {/* Icon thu nhỏ lại một chút (size-10) và thêm shrink-0 để không bị méo */}
              <div className="size-10 rounded-xl bg-app-cream flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <feature.icon className="size-5 text-app-green" />
              </div>

              {/* Text nằm ngang hàng với Icon */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-app-green text-sm leading-tight mb-0.5 truncate">
                  {t(FEATURE_TRANSLATION_KEYS[i].titleKey)}
                </p>
                <p className="text-xs text-app-text-light leading-tight line-clamp-2">
                  {t(FEATURE_TRANSLATION_KEYS[i].descriptionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
