"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Call the NextAuth signIn function with "credentials"
    const result = await signIn("credentials", {
      redirect: false, // Prevent automatic redirection
      username,
      password,
    });

    if (result?.error) {
      setError(result.error); // Show error message if signIn fails
    } else {
      router.push("/"); // Redirect to the dashboard or another page
    }
  };

  return (
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
            placeholder="Username"
            className="border p-3 rounded-lg"
            id="email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Sign In
          </button>
          
        </form>

        <div className="flex justify-center mt-6 gap-2">
          <p className="text-gray-600">Don’t have an account?</p>
          <button
            type="button"
            
            className="text-blue-500 underline"
          >
            Sign Up
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
