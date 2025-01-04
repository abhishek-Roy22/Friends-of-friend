import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const newError = {};

    if (!formData.userName) {
      newError.userName = 'userName is required';
    }

    if (!formData.password) {
      newError.password = 'Password is required';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error while user typing
    if (error[name]) {
      setError((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Add required fields');
      return;
    }

    toast.success('Form submitted successful');
    navigate('/');
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[650px] bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
            Login
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                User Name
              </label>
              <input
                value={formData.userName}
                onChange={handleChange}
                id="userName"
                name="userName"
                type="userName"
                placeholder="Enter your userName"
                className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                  error.userName && 'ring-2 ring-rose-800'
                }`}
              />
              {error.userName && (
                <p className="text-xs text-rose-800 p-0 m-0">
                  {error.userName}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                value={formData.password}
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  ${error.password && 'ring-2 ring-rose-800'}`}
              />
              {error.password && (
                <p className="text-xs text-rose-800 p-0 m-0">
                  {error.password}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div className="text-center">
              <Link
                to="/signup"
                className="inline-block px-4 py-2 mt-4 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Don't have an accout ? Sign up
              </Link>
            </div>
          </form>
        </div>
        <ToastContainer theme="dark" />
      </div>
    </>
  );
};

export default Login;
