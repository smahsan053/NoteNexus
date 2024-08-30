"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../NoteNexus-logo.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginHandler } from "../features/auth/AuthSlice";
import { useDispatch } from "react-redux";
import Profile from "./Profile";
const navigation = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
];

export default function Navbar() {
  const authState = useSelector((state) => state.auth.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(dispatch(loginHandler(authState)).payload);

  const handleLogout = () => {
    // setIsLoggedIn(false);
    dispatch(loginHandler(false));
    localStorage.removeItem("token");
  };
  useEffect(() => {
    dispatch(loginHandler(authState));
  }, [authState, dispatch]);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between ">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">NoteNexus</span>
            <img alt="" src={logo} className="h-24 w-auto pr-10 pl-6" />
          </Link>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md pr-14 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
          {dispatch(loginHandler(authState)).payload ? (
            <>
              <Profile />
              <div className="hidden lg:flex lg:flex-1 lg:justify-end pr-20 gap-10">
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Logout <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end pr-20 gap-10">
                {location.pathname === "/login" ? (
                  <Link
                    to="/createuser"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Signup <span aria-hidden="true">&rarr;</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => {
                      dispatch(loginHandler(authState));
                    }}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Login <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </>
          )}
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">NoteNexus</span>
                <img alt="" src={logo} className="h-24 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                {dispatch(loginHandler(authState)).payload ? (
                  <div className="py-6">
                    <Link
                      to="/login"
                      onClick={handleLogout}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Logout
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="py-6">
                      {location.pathname === "/login" ? (
                        <Link
                          to="/createuser"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Signup
                        </Link>
                      ) : (
                        <Link
                          to="/login"
                          onClick={() => {
                            dispatch(loginHandler(authState));
                          }}
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
