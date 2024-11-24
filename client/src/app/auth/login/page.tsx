"use client";

import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useState, useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation rules
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitError) setSubmitError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    validateField(name, formData[name as keyof typeof formData]);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error;
  };

  const isFormValid = () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    return !emailError && !passwordError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);

    setTouched({
      email: true,
      password: true,
    });

    if (emailError || passwordError) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:2000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const verifyResponse = await fetch(
        "http://localhost:2000/users/checkauthentication",
        {
          credentials: "include",
        }
      );

      if (!verifyResponse.ok) {
        throw new Error("Token verification failed");
      }

      setCookie(
        null,
        "user",
        JSON.stringify({
          _id: data._id,
          username: data.username,
          email: data.email,
          isAdmin: data.isAdmin,
        }),
        {
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60,
        }
      );

      if (data.isAdmin === true) {
        router.push("/admin");
      } else if (data.isAdmin === false) {
        router.push("/home");
      }
    } catch (err: any) {
      setSubmitError(err.message || "An error occurred during login");
      setCookie(null, "user", "", { path: "/", maxAge: -1 });
    } finally {
      setLoading(false);
    }
  };

  const InputError = ({ message }: { message: string }) =>
    message ? (
      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>{message}</span>
      </div>
    ) : null;

  return (
    <div className="bg-blue-900 absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-blue-600 leading-5 h-full w-full overflow-hidden">
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
          <div className="self-start hidden lg:flex flex-col text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">Welcome back</h1>
            <p className="pr-3 text-sm opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>

        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-transparent border border-1 mx-auto rounded-3xl w-96">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-white">Sign In</h3>
              <p className="text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Sign Up
                </Link>
              </p>
            </div>

            {submitError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  className={`w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border rounded-lg focus:outline-none transition-colors duration-200 ${
                    touched.email && errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-purple-400"
                  }`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                />
                <InputError message={touched.email ? errors.email : ""} />
              </div>

              <div>
                <div className="relative">
                  <input
                    className={`w-full text-sm text-gray-800 px-4 py-3 rounded-lg bg-gray-200 focus:bg-gray-100 border focus:outline-none transition-colors duration-200 ${
                      touched.password && errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-purple-400"
                    }`}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <InputError message={touched.password ? errors.password : ""} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-500 hover:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading || !isFormValid()}
                className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="flex items-center justify-center space-x-2">
                <span className="h-px w-16 bg-gray-300"></span>
                <span className="text-gray-300 font-normal">
                  or continue with
                </span>
                <span className="h-px w-16 bg-gray-300"></span>
              </div>

              <div className="flex justify-center gap-5 w-full">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-lg hover:bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                    />
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-sm text-white p-2 rounded-lg hover:bg-[#1865F2] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <svg
        className="absolute bottom-0 left-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </svg>
    </div>
  );
};

export default LoginPage;
