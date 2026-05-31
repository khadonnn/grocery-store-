import { MailIcon } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl mx-auto shadow-xs mt-32 mb-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="size-16 bg-white rounded-xl flex-center mx-auto mb-6 shadow-sm">
          <MailIcon className="size-8 text-app-green" strokeWidth={2} />
        </div>
        <h2 className="text-3xl  font-semibold text-app-green mb-4">
          {" "}
          Subscribe to Our Newsletter
        </h2>
        <p className="text-app-text-light mb-8 text-base">
          get weeekly updates on fresh produce and special offers
        </p>
      </div>

      <form
        className="flex flex-col sm:flex-row max-w-md mx-auto gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="flex flex-1 px-5 py-3.5 rounded-xl border border-app-border focus:border-app-green focus:ring bg-white text-sm transition-all"
        />
        <button
          type="submit"
          className="px-5 py-3.5 rounded-xl bg-app-green text-white text-sm font-medium hover:bg-app-green-dark transition-all"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};
export default Newsletter;
