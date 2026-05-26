import { appPromoBannerData, assets } from "../assets/assets";

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
            <button className="bg-white text-green-950 hover:bg-green-200 font-medium py-2 px-4 rounded-full transition-colors">
              App Store
            </button>
            <button className="bg-white text-green-950 hover:bg-green-200 font-medium py-2 px-4 rounded-full transition-colors">
              Google Play
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
