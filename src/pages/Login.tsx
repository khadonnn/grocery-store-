import { useState } from "react";
import { heroSectionData } from "../assets/assets";
import {
  BadgeCheck,
  BikeIcon,
  Eye,
  EyeOff,
  Leaf,
  Loader2Icon,
  LockIcon,
  MailIcon,
  ShieldCheck,
  ShoppingBag,
  UserIcon,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLoginState, setIsLoginState] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <img
          src={heroSectionData.hero_image}
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Subtle texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:50px_50px] opacity-30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-12 xl:px-20 text-white">
          <div className="max-w-lg">
            {/* Brand / Logo Area */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center">
                  <span className="text-black text-2xl font-bold">S</span>
                </div>
                <span className="text-3xl font-semibold tracking-tight">
                  Grocery Store
                </span>
              </div>
            </div>

            <h1 className="text-5xl xl:text-6xl font-semibold leading-tight tracking-tight mb-6">
              Welcome back
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-md">
              Sign in to continue shopping, track your orders, and enjoy
              exclusive offers tailored just for you.
            </p>

            {/* Trust Cards */}
            <div className="flex items-center gap-4">
              {/* Item 1: Fast Delivery */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="shrink-0 w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Express Delivery
                  </p>
                  <p className="text-xs text-white/60">
                    Fresh groceries to your door in 2 hours
                  </p>
                </div>
              </div>

              {/* Item 2: Freshness Guaranteed */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className=" shrink-0 w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    100% Freshness
                  </p>
                  <p className="text-xs text-white/60">
                    Selected with care, money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom element */}
        <div className="absolute bottom-12 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex-center px-4 py-12 bg-app-cream">
        <div className="w-full max-w-md">
          {/* form */}
          <div className="text-center mb-8 ">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <BikeIcon className="size-8 text-app-green" />
              <span className="text-2xl font-semibold text-app-green">
                Grocery Store
              </span>
            </Link>
            <h1 className="text-3xl font-semibold text-app-green mb-2">
              {isLoginState ? "Login to your account" : "Create a new account"}
            </h1>
            <p className="text-sm text-app-light mt-2">
              {isLoginState
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLoginState(!isLoginState)}
                className="text-orange-500 ml-1 font-semibold hover:text-orange-600 transition-colors"
              >
                {isLoginState ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isLoginState && (
              <label className="text-sm flex flex-col gap-2">
                <span>Name</span>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                  />
                </div>
              </label>
            )}
            <label className="text-sm flex flex-col gap-2">
              <span>Email</span>
              <div className="relative">
                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                />
              </div>
            </label>
            <label className="text-sm flex flex-col gap-2">
              <span>Password</span>
              <div className="relative">
                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-app-text-light hover:text-gray-700 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="flex-center w-full py-3 bg-app-green text-white font-semibold rounded-xl hover:bg-app-green-hover transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? (
                <Loader2Icon className="animate-spin size-5 text-white" />
              ) : isLoginState ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
