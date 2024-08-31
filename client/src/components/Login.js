import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getLoggedIn, loginHandler } from "../features/auth/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Example() {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth.auth);

  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginAction = await dispatch(getLoggedIn(credentials));
    if (getLoggedIn.fulfilled.match(loginAction)) {
      navigate("/");
      toast.success("Login successful!")
    } else {
      console.error("Login failed");
    }
  };
  useEffect(() => {
    dispatch(loginHandler(authState));
  }, [dispatch, authState]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-full text-center">
          <h2 className="mt-20 text-2xl sm:text-3xl font-bold leading-tight text-teal-600">
            Login to NoteNexus to start adding and organizing your notes.
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
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
                  onChange={onChange}
                  autoComplete="email"
                  value={credentials.email}
                  aria-label="Email address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={onChange}
                  aria-label="Password"
                  value={credentials.password}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <span>
                <p>
                  Don't have an account?{" "}
                  <span>
                    <Link to="/createuser" className="text-teal-600 font-bold">
                      Signup
                    </Link>
                  </span>
                </p>
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
