import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if passwords match
    if (credentials.password !== credentials.cpassword) {
      setError("Your Password does not match with Confirm Password.");
      return; // Exit the function if passwords do not match
    }

    // Clear error if passwords match
    setError("");

    // Proceed with form submission
    try {
      const response = await fetch(`${apiUrl}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        // Check if it's a 400 error (e.g., email already registered)
        if (response.status === 400) {
          toast.error(
            "This email is already registered. Please try again with a different email."
          );
        } else {
          // Handle other types of errors (server issues, etc.)
          toast.error("An error occurred. Please try again later.");
        }
        return; // Exit if there's an error
      }

      const json = await response.json();
      if (json.success) {
        // localStorage.setItem("token", json.authToken);
        navigate("/login");
        toast.success("Your account has been created successfully!");
        toast.info("Now Login to continue using NoteNexus!");
        return;
      } else {
        toast.error("Invalid Credentials. Please try again.");
        return;
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <h2 className="mt-20 text-nowrap text-4xl font-bold leading-tight text-teal-600">
            Sign Up for NoteNexus
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={3}
                  value={credentials.name}
                  onChange={onChange}
                  autoComplete="name"
                  aria-label="Full name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={credentials.email}
                  onChange={onChange}
                  autoComplete="email"
                  aria-label="Email address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  maxLength={30}
                  onChange={onChange}
                  aria-label="Password"
                  autoComplete="new-password"
                  value={credentials.password}
                  pattern="^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,30}$"
                  title="Password must be 8-30 characters long and contain both letters and numbers"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="cpassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  required
                  minLength={8}
                  maxLength={30}
                  onChange={onChange}
                  autoComplete="new-password"
                  value={credentials.cpassword}
                  aria-label="Confirm Password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <span>
                <p>
                  Already have an account?{" "}
                  <span>
                    <Link to="/login" className="text-teal-600 font-bold">
                      Login
                    </Link>
                  </span>
                </p>
              </span>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
