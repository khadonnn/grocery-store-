import { appPromoBannerData, assets } from "../assets/assets";
import { FaAppStoreIos } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
const AppPromoBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 my-14 bg-green-950 rounded-2xl">
      {/* left */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 xl:px-10">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl text-white mb-3">
            {appPromoBannerData.title}
          </h2>
          <p className="text-white/70 mb-6 max-w-md">
            {appPromoBannerData.description}
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {/* Nút App Store */}
            <button className="bg-white text-green-950 hover:bg-green-200 font-medium py-2 px-5 rounded-full transition-colors flex items-center justify-center whitespace-nowrap">
              <FaAppStoreIos className="mr-2 size-5 shrink-0" />
              <span>App Store</span>
            </button>

            {/* Nút Google Play */}
            <button className="bg-white text-green-950 hover:bg-green-200 font-medium py-2 px-5 rounded-full transition-colors flex items-center justify-center whitespace-nowrap">
              <FaGooglePlay className="mr-2 size-5 shrink-0" />
              <span>Google Play</span>
            </button>
          </div>
        </div>
        {/* right side */}
        <img
          src={assets.delivery_truck}
          alt="Delivery"
          className="max-w-60 sm:max-w-120 xl:pr-10"
        />
      </div>
    </section>
  );
};
export default AppPromoBanner;
