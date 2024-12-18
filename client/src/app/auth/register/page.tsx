"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false
  });
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateUsername = (username: string) => {
    if (!username) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (username.length > 20) return 'Username must not exceed 20 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, and underscores';
    return '';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (submitError) setSubmitError('');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    validateField(name as keyof typeof formData, formData[name as keyof typeof formData]);
  };

  const validateField = (name: keyof typeof formData, value: string) => {
    let error = '';
    if (name === 'username') {
      error = validateUsername(value);
    } else if (name === 'email') {
      error = validateEmail(value);
    } else if (name === 'password') {
      error = validatePassword(value);
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return error;
  };

  const isFormValid = () => {
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    return !usernameError && !emailError && !passwordError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const usernameError = validateField('username', formData.username);
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);

    setTouched({
      username: true,
      email: true,
      password: true
    });

    if (usernameError || emailError || passwordError) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:2000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      router.push('/auth/login');
    } catch (err) {
      setSubmitError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const InputError = ({ message }: { message: string }) => (
    message ? (
      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>{message}</span>
      </div>
    ) : null
  );


  return (
    <div className="bg-purple-900 absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-blue-600 leading-5 h-full w-full overflow-hidden">
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
          <div className="self-start hidden lg:flex flex-col text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">Create Account</h1>
            <p className="pr-3 text-sm opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic, print,
              and publishing industries for previewing layouts and visual mockups
            </p>
          </div>
        </div>

        <div className="flex justify-center self-center z-10 ">
          <div className="p-12  mx-auto rounded-3xl w-96 border boerder-1">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-white">Sign Up</h3>
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-sm text-blue-600 hover:text-blue-700">
                  Sign In
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
                    touched.username && errors.username
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-purple-400'
                  }`}
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Username"
                />
                <InputError message={touched.username ? errors.username : ''} />
              </div>

              <div>
                <input
                  className={`w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border rounded-lg focus:outline-none transition-colors duration-200 ${
                    touched.email && errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-purple-400'
                  }`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                />
                <InputError message={touched.email ? errors.email : ''} />
              </div>

              <div>
                <div className="relative">
                  <input
                    className={`w-full text-sm text-gray-800 px-4 py-3 rounded-lg bg-gray-200 focus:bg-gray-100 border focus:outline-none transition-colors duration-200 ${
                      touched.password && errors.password
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:border-purple-400'
                    }`}
                    type={showPassword ? 'text' : 'password'}
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
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <InputError message={touched.password ? errors.password : ''} />
              </div>

              <button
                type="submit"
                disabled={loading || !isFormValid()}
                className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-16 bg-gray-100"></span>
                <span className="text-gray-300 font-normal">or</span>
                <span className="h-px w-16 bg-gray-100"></span>
              </div>

              <div className="flex justify-center gap-5 w-full">
                <button
                  type="button"
                  className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500"
                >
                  <svg className="w-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 bg-blue-500 hover:bg-blue-600 text-sm text-white p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500"
                >
                  <svg className="w-4 mr-2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M50 2.5c-58.892 1.725-64.898 84.363-7.46 95h14.92c57.451-10.647 51.419-93.281-7.46-95z"
                      fill="#1877f2"
                    />
                    <path
                      d="M57.46 64.104h11.125l2.117-13.814H57.46v-8.965c0-3.779 1.85-7.463 7.781-7.463h6.021V22.101c-12.894-2.323-28.385-1.616-28.722 17.66V50.29H30.417v13.814H42.54V97.5h14.92V64.104z"
                      fill="#f1f1f1"
                    />
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>
            </form>

            <div className="mt-7 text-center text-gray-300 text-xs">
              <span>
                Copyright © 2021-2024{' '}
                <Link
                  href="https://codepen.io/uidesignhub"
                  target="_blank"
                  className="text-blue-500 hover:text-blue-600"
                >
                  AJI
                </Link>
              </span>
            </div>
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

export default RegisterPage;