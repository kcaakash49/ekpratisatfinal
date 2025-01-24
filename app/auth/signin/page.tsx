"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Header from "@/components/Header";

export default function SignIn() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const [isVisible, setVisible] = useState(false)
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Call the NextAuth signIn function with "credentials"
    setLoading(true)
    const result = await signIn("credentials", {
      redirect: false, // Prevent automatic redirection
      mobile,
      password,
    });
    setLoading(false)
    console.log("result in signin", result)
    if (result?.status == 401) {
      setError("Wrong username or password")
      return
    }
    router.push("/")

  };

  return (
    <div className="h-full">
      <Header/>
    <div
      className="flex justify-center items-center bg-gradient-to-r from-blue-900 to-purple-900 h-full"
    >
      <div className="p-8 bg-white bg-opacity-70 shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="98********"
            className="border p-3 rounded-lg"
            id="mobile"
            onChange={(e) => setMobile(e.target.value)}
          />
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Password"
              className="border p-3 rounded-lg w-full pr-10"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setVisible(!isVisible)}
            >
              {/* {!isVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.008.027-.017.053-.025.08m-1.222 2.285c-1.176 2.645-3.978 4.635-7.295 4.635-3.317 0-6.12-1.99-7.295-4.635-.008-.027-.017-.053-.025-.08"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825L12 20m0 0l-1.875-1.175m1.875 1.175V16m0 0a7.07 7.07 0 01-6.5-4m13 0a7.07 7.07 0 01-6.5 4m0-4a7.07 7.07 0 006.5-4m-13 0a7.07 7.07 0 006.5 4"
                  />
                </svg>
              )} */}
               {isVisible ? "🙈" : "👁️"}
            </button>
          </div>
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {
              loading ? (
                <Loading />
              ) : (
                "Sign In"
              )
            }
          </button>
        </form>

        <div className="flex justify-center mt-6 gap-2">
          <p className="text-gray-600">Don’t have an account?</p>
          <button
            type="button"
            onClick={() => router.push("/auth/signup")}
            className="text-blue-500 underline"
          >
            Sign Up
          </button>
        </div>

        
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>

    </div>
  );
}
