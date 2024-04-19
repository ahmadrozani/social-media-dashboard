"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "admin",
    password: "password",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    if (formData.username === "admin" && formData.password === "password") {
      router.push("/users");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl mb-6 text-center font-bold text-blue-500">
          Login
        </h1>

        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={formData.username}
            onChange={handleInputChange}
            className="mt-1 p-3 w-full rounded-md border-2 border-blue-300 focus:border-blue-500 focus:outline-none"
            autoComplete="username"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={formData.password}
            onChange={handleInputChange}
            className="mt-1 p-3 w-full rounded-md border-2 border-blue-300 focus:border-blue-500 focus:outline-none"
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 w-full focus:outline-none"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
