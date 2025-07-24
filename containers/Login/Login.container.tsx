"use client";
import { signIn } from "next-auth/react";

export default function LoginContainer() {
  const handleLogin = async () => {
    await signIn("square", { callbackUrl: "/products" });
  };

  return (
    <div className="flex flex-row h-screen font-sans">
      <div className="relative basis-3/5 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="object-cover w-full h-full z-0"
          src="/promo.mp4"
        />

        <div className="absolute inset-0 z-10 bg-black opacity-50 pointer-events-none">
          <div className="w-full h-full bg-gradient-radial" />
        </div>
      </div>

      <div className="basis-2/5 bg-[#0d1117] flex items-center justify-center">
        <button
          onClick={handleLogin}
          className="px-8 py-4 w-1/2 text-lg font-semibold text-white border border-white rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-black cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
